import KegiatanCard from "../component/KegiatanCard";

import { Link } from "react-router-dom";
import kegiatanSemua from "../data/kegiatan";

// Beranda hanya menampilkan 5 kegiatan; selengkapnya ada di halaman Kegiatan Sekolah
const kegiatan = kegiatanSemua.slice(0, 5);

export default function KegiatanCarousel() {
  return (
    <section className="flex min-h-[90vh] w-full flex-col items-center px-4 py-20 md:px-8">
      <div className="flex w-full flex-col items-center text-center">
        <p className="font-sans text-2xl font-bold md:text-4xl"> Kegiatan Sekolah</p>
        <p className="font-sans mt-3 max-w-xl text-sm text-gray-500 md:text-base">
          Berbagai kegiatan dan aktivitas siswa dalam membangun lingkungan
          sekolah yang aktif, kreatif, dan berprestasi.
        </p>
      </div>
      <div className="mt-10 w-full max-w-7xl">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6">
          {kegiatan.map((item, index) => (
            <div key={index} className="h-[400px] w-[85%] flex-none snap-start sm:w-[320px] md:h-[430px] md:w-[350px] lg:w-[380px]">
              <KegiatanCard
                gambar={item.gambar}
                judul={item.judul}
                tanggal={item.tanggal}
                deskripsi={item.deskripsi}
              />
            </div>
          ))}
        </div>
      </div>
      <Link
        to="/kegiatan"
        className="mt-4 flex h-15 w-50 items-center justify-center rounded-full border border-primary font-semibold text-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-lg active:translate-y-0 active:scale-95"
      >
        Lihat Semua Kegiatan
      </Link>
    </section>
  );
}
