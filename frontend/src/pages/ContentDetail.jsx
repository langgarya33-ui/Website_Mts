import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import PageHeader from "../component/PageHeader";
import { formatDate } from "../utility/formatDate";
import { useAdminSession } from "./admin/AdminSessionContext";
import ModalBerita from "../component/ModalBerita";
import ModalPrestasiKegiatan from "../component/ModalPrestasiKegiatan";

const labels = { berita: "Berita", kegiatan: "Kegiatan", prestasi: "Prestasi" };

export default function ContentDetail({ tipe }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [actionError, setActionError] = useState("");
  const { admin } = useAdminSession();
  const navigate = useNavigate();

  const loadItem = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:5000/api/content/${tipe}/${id}`, { credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Konten tidak ditemukan.");
      setItem(data);
    } catch (requestError) {
      setItem(null);
      setError(requestError.message || "Gagal memuat detail konten.");
    } finally {
      setLoading(false);
    }
  }, [id, tipe]);

  useEffect(() => {
    Promise.resolve().then(loadItem);
  }, [loadItem]);

  const listPath = `/${tipe}`;
  const title = item?.judul || item?.isi || `${labels[tipe]} tidak ditemukan`;
  const photos = (item?.gambar_list || []).filter(Boolean).map((filename) => `http://localhost:5000/uploads/${filename}`);

  async function deleteItem() {
    if (!window.confirm(`Hapus ${labels[tipe].toLowerCase()} ini? Tindakan ini tidak dapat dibatalkan.`)) return;
    setActionError("");
    try {
      const response = await fetch(`http://localhost:5000/api/content/${tipe}/${id}`, { method: "DELETE", credentials: "include" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Gagal menghapus konten.");
      navigate(listPath);
    } catch (deleteError) {
      setActionError(deleteError.message || "Tidak dapat menghapus konten.");
    }
  }

  async function handleItemSaved(_savedId, _status, warning) {
    setActionError(warning || "");
    await loadItem();
  }

  return <>
    <PageHeader judul={item ? `Detail ${labels[tipe]}` : `${labels[tipe]} tidak ditemukan`} deskripsi={`Informasi ${labels[tipe].toLowerCase()} MTs An-Nur Klapanunggal.`} />
    <main className="mx-auto w-[90%] max-w-3xl py-12 md:py-16">
      <Link to={listPath} className="mb-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary"><ArrowLeft size={18} />Kembali ke {labels[tipe]}</Link>
      {loading ? <p className="py-12 text-center text-gray-500">Memuat detail...</p> : !item ? <p role="status" className="py-12 text-center text-gray-500">{error || "Konten tidak ditemukan."}</p> : <article>
        <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">{item.status_publikasi === "Draft" ? "Draft" : "Sudah Publikasi"}</span>
        {admin && <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => setIsEditOpen(true)} className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:brightness-110">Edit konten</button>
          <button type="button" onClick={deleteItem} className="rounded-lg border border-red-600 px-4 py-2 font-semibold text-red-700 hover:bg-red-50">Hapus</button>
        </div>}
        {actionError && <p role="alert" className="mt-3 text-sm text-red-700">{actionError}</p>}
        <h1 className="mt-4 font-sans text-2xl font-bold leading-snug md:text-4xl">{title}</h1>
        <p className="mt-3 flex items-center gap-2 font-sans text-sm text-gray-600"><CalendarDays size={18} />{formatDate(item.tanggal) || "Tanggal belum tersedia"}</p>
        {tipe === "prestasi" && <p className="mt-4 font-semibold text-primary">{item.juara} · {item.tingkat}</p>}
        {photos.length > 0 && <div className={`mt-6 grid gap-3 ${photos.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}>{photos.map((src, index) => <img key={src} src={src} alt={`${title} ${index + 1}`} onError={(event) => { event.currentTarget.hidden = true; }} className="max-h-[28rem] w-full rounded-xl object-cover" />)}</div>}
        <div className="mt-8 flex flex-col gap-5 text-justify font-sans text-base leading-relaxed text-gray-700">
          {item.isi && <p className="whitespace-pre-wrap">{item.isi}</p>}
          {item.deskripsi && <p className="whitespace-pre-wrap">{item.deskripsi}</p>}
        </div>
      </article>
      }
    </main>
    {item && isEditOpen && tipe === "berita" && <ModalBerita isOpen onClose={() => setIsEditOpen(false)} initialData={item} onCreated={handleItemSaved} />}
    {item && isEditOpen && tipe !== "berita" && <ModalPrestasiKegiatan tipe={tipe} isOpen onClose={() => setIsEditOpen(false)} initialData={item} onCreated={handleItemSaved} />}
  </>;
}
