import { useState } from "react";
import PageHeader from "../component/PageHeader";
import PrestasiCard from "../component/PrestasiCard";
import useFadeIn from "../utility/FadeIn";
import { prestasi, tingkatPrestasi } from "../data/prestasi";

export default function Prestasi() {
  const [aktif, setAktif] = useState("semua");
  const [statRef, statVisible] = useFadeIn();
  const [listRef, listVisible] = useFadeIn();

  const daftar =
    aktif === "semua" ? prestasi : prestasi.filter((p) => p.tingkat === aktif);

  // Ringkasan dihitung otomatis dari data
  const statistik = [
    { angka: prestasi.length, teks: "Total Prestasi" },
    {
      angka: prestasi.filter((p) => p.juara.toLowerCase().includes("juara 1")).length,
      teks: "Juara 1",
    },
    {
      angka: prestasi.filter((p) => ["provinsi", "nasional"].includes(p.tingkat)).length,
      teks: "Tingkat Provinsi & Nasional",
    },
  ];

  return (
    <>
      <PageHeader
        judul="Prestasi"
        deskripsi="Torehan prestasi siswa MTs An-Nur Klapanunggal."
      />

      <div className="mx-auto flex w-[90%] max-w-5xl flex-col gap-12 py-12 md:py-16">
        <section
          ref={statRef}
          className={`fade-in-section grid grid-cols-3 gap-3 md:gap-6 ${statVisible ? "visible" : ""}`}
        >
          {statistik.map((s) => (
            <div
              key={s.teks}
              className="rounded-xl bg-primary p-4 text-center text-white md:p-6"
            >
              <p className="font-sans text-2xl font-extrabold md:text-4xl">
                {s.angka}
              </p>
              <p className="mt-1 font-sans text-xs text-white/80 md:text-sm">
                {s.teks}
              </p>
            </div>
          ))}
        </section>

        <section
          ref={listRef}
          className={`fade-in-section ${listVisible ? "visible" : ""}`}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {tingkatPrestasi.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setAktif(t.id)}
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

          {daftar.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {daftar.map((p) => (
                <PrestasiCard key={`${p.lomba}-${p.tahun}`} {...p} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center font-sans text-sm text-gray-500">
              Belum ada prestasi di tingkat ini.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
