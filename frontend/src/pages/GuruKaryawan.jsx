import { useState } from "react";
import PageHeader from "../component/PageHeader";
import GuruCard from "../component/GuruCard";
import useFadeIn from "../utility/FadeIn";
import { kepalaSekolah, semuaStaf } from "../data/guru";

const tab = [
  { id: "semua", label: "Semua" },
  { id: "guru", label: "Guru" },
  { id: "karyawan", label: "Karyawan" },
];

export default function GuruKaryawan() {
  const [aktif, setAktif] = useState("semua");
  const [kepalaRef, kepalaVisible] = useFadeIn();
  const [listRef, listVisible] = useFadeIn();

  const daftar =
    aktif === "semua"
      ? semuaStaf
      : semuaStaf.filter((s) => s.kategori === aktif);

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
          className={`fade-in-section ${listVisible ? "visible" : ""}`}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {tab.map((t) => (
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

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {daftar.map((s) => (
              <GuruCard
                key={s.nama}
                foto={s.foto}
                nama={s.nama}
                jabatan={s.jabatan}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
