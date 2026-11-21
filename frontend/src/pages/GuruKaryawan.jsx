import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "../component/PageHeader";
import StafCard from "../component/StafCard";
import useFadeIn from "../utility/FadeIn";
import { kepalaSekolah, semuaStaf } from "../data/guru";

const PER_HALAMAN = 14;

const tab = [
  { id: "semua", label: "Semua" },
  { id: "guru", label: "Guru" },
  { id: "karyawan", label: "Karyawan" },
];

export default function GuruKaryawan() {
  const [aktif, setAktif] = useState("semua");
  const [halaman, setHalaman] = useState(1);
  const [kepalaRef, kepalaVisible] = useFadeIn();
  const [listRef, listVisible] = useFadeIn();

  const daftar =
    aktif === "semua"
      ? semuaStaf
      : semuaStaf.filter((s) => s.kategori === aktif);

  const totalHalaman = Math.max(1, Math.ceil(daftar.length / PER_HALAMAN));
  const tampil = daftar.slice(
    (halaman - 1) * PER_HALAMAN,
    halaman * PER_HALAMAN,
  );

  const pilihTab = (id) => {
    setAktif(id);
    setHalaman(1); // kembali ke halaman 1 saat ganti tab
  };

  const pindahHalaman = (n) => {
    setHalaman(n);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHeader
        judul="Guru & Karyawan"
        deskripsi="Tenaga pendidik dan kependidikan MTs An-Nur Klapanunggal."
      />

      <div className="mx-auto flex w-[90%] max-w-5xl flex-col gap-16 py-12 md:py-16">
        {/* Kepala Madrasah */}
        <section
          ref={kepalaRef}
          className={`fade-in-section flex flex-col items-center gap-5 text-center ${kepalaVisible ? "visible" : ""}`}
        >
          <img
            src={kepalaSekolah.foto}
            alt={kepalaSekolah.nama}
            className="h-48 w-48 rounded-full border-4 border-primary object-cover object-top shadow-lg md:h-56 md:w-56"
          />
          <div>
            <h2 className="font-sans text-xl font-bold md:text-2xl">
              {kepalaSekolah.nama}
            </h2>
            <p className="font-sans text-sm font-semibold text-primary md:text-base">
              {kepalaSekolah.jabatan}
            </p>
          </div>
        </section>

        {/* Daftar guru & karyawan */}
        <section
          ref={listRef}
          className={`fade-in-section scroll-mt-24 ${listVisible ? "visible" : ""}`}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {tab.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => pilihTab(t.id)}
                aria-pressed={aktif === t.id}
                className={`rounded-full border px-5 py-2 font-sans text-sm font-semibold transition hover:cursor-pointer ${
                  aktif === t.id
                    ? "border-primary bg-primary text-white"
                    : "border-primary text-primary hover:bg-primary/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {tampil.map((s) => (
            <StafCard
              key={s.nama}
              foto={s.foto}
              nama={s.nama}
              jabatan={s.jabatan}
            />
          ))}
          </div>

          {/* Pembagian halaman */}
          {totalHalaman > 1 && (
            <nav
              aria-label="Halaman daftar guru dan karyawan"
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                onClick={() => pindahHalaman(halaman - 1)}
                disabled={halaman === 1}
                aria-label="Halaman sebelumnya"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>

              {Array.from({ length: totalHalaman }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => pindahHalaman(n)}
                  aria-label={`Halaman ${n}`}
                  aria-current={halaman === n ? "page" : undefined}
                  className={`h-10 w-10 rounded-full border font-sans text-sm font-semibold transition hover:cursor-pointer ${
                    halaman === n
                      ? "border-primary bg-primary text-white"
                      : "border-primary text-primary hover:bg-primary/10"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                type="button"
                onClick={() => pindahHalaman(halaman + 1)}
                disabled={halaman === totalHalaman}
                aria-label="Halaman berikutnya"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </nav>
          )}
        </section>
      </div>
    </>
  );
}