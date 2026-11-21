import { useCallback, useEffect, useState } from "react";
import PageHeader from "../component/PageHeader";
import KegiatanCard from "../component/KegiatanCard";
import useFadeIn from "../utility/FadeIn";
import { useAdminSession } from "./admin/AdminSessionContext";
import ModalPrestasiKegiatan from "../component/ModalPrestasiKegiatan";

export default function Kegiatan() {
  const [listRef, listVisible] = useFadeIn();
  const [kegiatan, setKegiatan] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("semua");
  const { admin, isLoading } = useAdminSession();

  const loadKegiatan = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/content/kegiatan", { credentials: "include", cache: "no-store" });
      const items = response.ok ? await response.json() : [];
      setKegiatan(items.filter((item) => item.status_publikasi === "Sudah Publikasi" || admin));
    } catch {
      setKegiatan([]);
    }
  }, [admin]);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => { if (!cancelled) return loadKegiatan(); });
    return () => { cancelled = true; };
  }, [loadKegiatan]);
  const daftar = kegiatan.filter((item) => filterStatus === "semua" || item.status_publikasi === filterStatus);

  return (
    <>
      <PageHeader
        judul="Kegiatan Sekolah"
        deskripsi="Berbagai kegiatan dan aktivitas siswa di MTs An-Nur Klapanunggal."
      />

      <div className="mx-auto w-[90%] max-w-5xl py-12 md:py-16">
        {admin && !isLoading && (
          <div className="mb-6 flex flex-wrap justify-end gap-3">
            <label className="sr-only" htmlFor="filter-status-kegiatan">Filter status kegiatan</label>
            <select id="filter-status-kegiatan" value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-sans text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option value="semua">Semua status</option><option value="Draft">Draft</option><option value="Sudah Publikasi">Sudah Publikasi</option>
            </select>
            <button type="button" onClick={() => setIsModalOpen(true)} className="rounded-lg bg-primary px-5 py-2.5 font-sans font-semibold text-white transition hover:brightness-110">
              Tambah Kegiatan
            </button>
          </div>
        )}
        <section
          ref={listRef}
          className={`fade-in-section ${listVisible ? "visible" : ""}`}
        >
          {daftar.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {daftar.map((item) => (
                <div key={item.id_kegiatan || item.isi} className="relative h-[400px] md:h-[430px]">
                  {item.status_publikasi && <span className="absolute left-2 top-2 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">{item.status_publikasi === "Draft" ? "Draft" : "Sudah Publikasi"}</span>}
                  <KegiatanCard id={item.id_kegiatan} status_publikasi={item.status_publikasi} gambar={item.gambar ? `http://localhost:5000/uploads/${item.gambar}` : item.gambar} judul={item.judul || item.isi} tanggal={item.tanggal} deskripsi={item.deskripsi} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center font-sans text-sm text-gray-500">
              Belum ada kegiatan yang ditampilkan.
            </p>
          )}
        </section>
      </div>
      <ModalPrestasiKegiatan key={isModalOpen ? "open" : "closed"} tipe="kegiatan" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreated={async () => { setFilterStatus("semua"); await loadKegiatan(); }} />
    </>
  );
}
