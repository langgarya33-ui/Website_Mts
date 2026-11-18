import { useState } from "react";
import PageHeader from "../component/PageHeader";
import EkskulCard from "../component/EkskulCard";
import useFadeIn from "../utility/FadeIn";
import { ekskul, kategoriEkskul } from "../data/ekskul";

export default function Ekstrakurikuler() {
  const [aktif, setAktif] = useState("semua");
  const [listRef, listVisible] = useFadeIn();

  const daftar =
    aktif === "semua" ? ekskul : ekskul.filter((e) => e.kategori === aktif);

  return (
    <>
      <PageHeader
        judul="Ekstrakurikuler"
        deskripsi="Wadah siswa mengembangkan minat, bakat, dan karakter di luar jam pelajaran."
      />

      <div className="mx-auto w-[90%] max-w-5xl py-12 md:py-16">
        <section
          ref={listRef}
          className={`fade-in-section ${listVisible ? "visible" : ""}`}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {kategoriEkskul.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setAktif(k.id)}
                aria-pressed={aktif === k.id}
                className={`rounded-full border px-5 py-2 font-sans text-sm font-semibold transition hover:cursor-pointer ${
                  aktif === k.id
                    ? "border-primary bg-primary text-white"
                    : "border-primary text-primary hover:bg-primary/10"
                }`}
              >
                {k.label}
              </button>
            ))}
          </div>

          {daftar.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {daftar.map((e) => (
                <EkskulCard key={e.nama} {...e} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center font-sans text-sm text-gray-500">
              Belum ada ekstrakurikuler di kategori ini.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
