import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "../component/PageHeader";
import BeritaCard from "../component/BeritaCard";
import { useAdminSession } from "./admin/AdminSessionContext";
import ModalBerita from "../component/ModalBerita";

export default function Berita() {
  const [kata, setKata] = useState("");
  const [berita, setBerita] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("semua");
  const { admin, isLoading } = useAdminSession();

  const loadBerita = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/content/berita", { credentials: "include", cache: "no-store" });
      const items = response.ok ? await response.json() : [];
      setBerita(items.filter((item) => item.status_publikasi === "Sudah Publikasi" || admin));
    } catch {
      setBerita([]);
    }
  }, [admin]);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => { if (!cancelled) return loadBerita(); });
    return () => { cancelled = true; };
  }, [loadBerita]);

  const hasil = berita.filter((item) =>
    (filterStatus === "semua" || item.status_publikasi === filterStatus) &&
    `${item.judul || ""} ${item.isi || ""}`.toLowerCase().includes(kata.trim().toLowerCase())
  );

  return (
    <>
      <PageHeader
        judul="Berita & Pengumuman"
        deskripsi="Informasi dan kabar terbaru dari MTs An-Nur Klapanunggal."
      />

      <section className="mx-auto w-[90%] max-w-5xl py-12 md:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
         <div className="relative w-full max-w-md">
          <Search
            size={18}
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={kata}
            onChange={(e) => setKata(e.target.value)}
            placeholder="Cari berita..."
            aria-label="Cari berita"
            className="w-full rounded-full border border-gray-300 bg-white py-3 pl-11 pr-4 font-sans text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </div>
        {admin && !isLoading && (
          <div className="flex flex-wrap items-center justify-end gap-3">
            <label className="sr-only" htmlFor="filter-status-berita">Filter status berita</label>
            <select id="filter-status-berita" value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-sans text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option value="semua">Semua status</option><option value="Draft">Draft</option><option value="Sudah Publikasi">Sudah Publikasi</option>
            </select>
            <button type="button" onClick={() => setIsModalOpen(true)} className="rounded-lg bg-primary px-5 py-2.5 font-sans font-semibold text-white transition hover:brightness-110 hover:cursor-pointer">
              Tambah Berita
            </button>
          </div>
        )}
        </div>
        {hasil.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hasil.map((item) => (
              <div key={item.id_berita || item.id} className="h-80">
                <div className="relative h-full">
                  <BeritaCard id={item.id_berita ? `id/${item.id_berita}` : item.id} status_publikasi={item.status_publikasi} gambar={item.gambar ? `http://localhost:5000/uploads/${item.gambar}` : item.gambar} judul={item.judul || item.isi} tanggal={item.tanggal} deskripsi={item.deskripsi} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-10 text-center font-sans text-gray-500">{berita.length ? "Tidak ada berita yang cocok dengan pencarianmu." : "Belum ada berita yang dipublikasikan."}</p>
        )}
      </section>
      <ModalBerita key={isModalOpen ? "open" : "closed"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreated={async () => { setKata(""); setFilterStatus("semua"); await loadBerita(); }} />
    </>
  );
}
