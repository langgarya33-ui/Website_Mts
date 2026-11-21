import { useCallback, useEffect, useState } from "react";
import PageHeader from "../component/PageHeader";
import PrestasiCard from "../component/PrestasiCard";
import useFadeIn from "../utility/FadeIn";
import { tingkatPrestasi } from "../data/prestasi";
import { useAdminSession } from "./admin/AdminSessionContext";
import ModalPrestasiKegiatan from "../component/ModalPrestasiKegiatan";

export default function Prestasi() {
  const [aktif, setAktif] = useState("semua");
  const [statRef, statVisible] = useFadeIn();
  const [listRef, listVisible] = useFadeIn();
  const [prestasi, setPrestasi] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("semua");
  const { admin, isLoading } = useAdminSession();

  const loadPrestasi = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/content/prestasi", { credentials: "include", cache: "no-store" });
      const items = response.ok ? await response.json() : [];
      setPrestasi(items.filter((item) => item.status_publikasi === "Sudah Publikasi" || admin));
    } catch {
      setPrestasi([]);
    }
  }, [admin]);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => { if (!cancelled) return loadPrestasi(); });
    return () => { cancelled = true; };
  }, [loadPrestasi]);
  const sesuaiStatus = prestasi.filter((item) => filterStatus === "semua" || item.status_publikasi === filterStatus);

  const daftar = aktif === "semua" ? sesuaiStatus : sesuaiStatus.filter((p) => p.tingkat === aktif);
  const statistik = [
    { angka: sesuaiStatus.length, teks: "Total Prestasi" },
    { angka: sesuaiStatus.filter((p) => String(p.juara ?? "").toLowerCase().includes("juara 1") || Number(p.juara) === 1).length, teks: "Juara 1" },
    { angka: sesuaiStatus.filter((p) => ["provinsi", "nasional"].includes(p.tingkat)).length, teks: "Tingkat Provinsi & Nasional" },
  ];

  return (
    <>
      <PageHeader judul="Prestasi" deskripsi="Torehan prestasi siswa MTs An-Nur Klapanunggal." />
      <div className="mx-auto flex w-[90%] max-w-5xl flex-col gap-12 py-12 md:py-16">
        {admin && !isLoading && <div className="flex flex-wrap justify-end gap-3">
          <label className="sr-only" htmlFor="filter-status-prestasi">Filter status prestasi</label>
          <select id="filter-status-prestasi" value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-sans text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"><option value="semua">Semua status</option><option value="Draft">Draft</option><option value="Sudah Publikasi">Sudah Publikasi</option></select>
          <button type="button" onClick={() => setIsModalOpen(true)} className="rounded-lg bg-primary px-5 py-2.5 font-sans font-semibold text-white transition hover:brightness-110">Tambah Prestasi</button>
        </div>}
        <section ref={statRef} className={`fade-in-section grid grid-cols-3 gap-3 md:gap-6 ${statVisible ? "visible" : ""}`}>
          {statistik.map((s) => <div key={s.teks} className="rounded-xl bg-primary p-4 text-center text-white md:p-6"><p className="font-sans text-2xl font-extrabold md:text-4xl">{s.angka}</p><p className="mt-1 font-sans text-xs text-white/80 md:text-sm">{s.teks}</p></div>)}
        </section>
        <section ref={listRef} className={`fade-in-section ${listVisible ? "visible" : ""}`}>
          <div className="flex flex-wrap justify-center gap-2">
            {tingkatPrestasi.map((t) => <button key={t.id} type="button" onClick={() => setAktif(t.id)} aria-pressed={aktif === t.id} className={`rounded-full border px-5 py-2 font-sans text-sm font-semibold transition hover:cursor-pointer ${aktif === t.id ? "border-primary bg-primary text-white" : "border-primary text-primary hover:bg-primary/10"}`}>{t.label}</button>)}
          </div>
          {daftar.length > 0 ? <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {daftar.map((p) => <div key={p.id_prestasi || `${p.judul || p.isi}-${p.tanggal}`} className="h-[400px]"><PrestasiCard id={p.id_prestasi} status_publikasi={p.status_publikasi} foto={p.gambar ? `http://localhost:5000/uploads/${p.gambar}` : p.foto} lomba={p.judul || p.isi} juara={p.juara} tingkat={p.tingkat} peraih={p.deskripsi} tahun={p.tanggal} /></div>)}
          </div> : <p className="mt-10 text-center font-sans text-sm text-gray-500">Belum ada prestasi di tingkat ini.</p>}
        </section>
      </div>
      <ModalPrestasiKegiatan key={isModalOpen ? "open" : "closed"} tipe="prestasi" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreated={async () => { setFilterStatus("semua"); await loadPrestasi(); }} />
    </>
  );
}
