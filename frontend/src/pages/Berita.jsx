import { useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "../component/PageHeader";
import BeritaCard from "../component/BeritaCard";
import berita from "../data/berita";

export default function Berita() {
  const [kata, setKata] = useState("");

  const hasil = berita.filter((item) =>
    item.judul.toLowerCase().includes(kata.trim().toLowerCase())
  );

  return (
    <>
      <PageHeader
        judul="Berita & Pengumuman"
        deskripsi="Informasi dan kabar terbaru dari MTs An-Nur Klapanunggal."
      />

      <section className="mx-auto w-[90%] max-w-5xl py-12 md:py-16">
        <div className="relative mx-auto mb-10 max-w-md">
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

        {hasil.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hasil.map((item, index) => (
              <div key={index} className="h-80">
                <BeritaCard
                  gambar={item.gambar}
                  judul={item.judul}
                  tanggal={item.tanggal}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="py-10 text-center font-sans text-gray-500">
            Tidak ada berita yang cocok dengan pencarianmu.
          </p>
        )}
      </section>
    </>
  );
}
