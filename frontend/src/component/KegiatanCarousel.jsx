import KegiatanCard from "../component/KegiatanCard";

import { Link } from "react-router-dom";
import foto_guru3 from "../assets/image/foto_guru3.jpeg";
import usePublishedContent from "../utility/usePublishedContent";

export default function KegiatanCarousel() {
  const { items, isLoading } = usePublishedContent("kegiatan");
  const kegiatan = items.slice(0, 5);

  return (
    <section className="flex min-h-[90vh] w-full flex-col items-center px-4 py-20 md:px-8">
      <div className="flex w-full flex-col items-center text-center">
        <h2 className="border-b-2 border-gray-900 px-2 pb-2 font-sans text-2xl font-extrabold md:text-4xl">Kegiatan Sekolah</h2>
        <p className="font-sans mt-3 max-w-xl text-sm text-gray-500 md:text-base">
          Berbagai kegiatan dan aktivitas siswa dalam membangun lingkungan
          sekolah yang aktif, kreatif, dan berprestasi.
        </p>
      </div>
      <div className="mt-10 w-full max-w-7xl">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6">
              {kegiatan.map((item) => (
            <div key={item.id_kegiatan} className="h-[400px] w-[85%] flex-none snap-start sm:w-[320px] md:h-[430px] md:w-[350px] lg:w-[380px]">
              <KegiatanCard
                id={item.id_kegiatan}
                status_publikasi={item.status_publikasi}
                gambar={item.gambar ? `http://localhost:5000/uploads/${item.gambar}` : foto_guru3}
                judul={item.judul || item.isi}
                tanggal={item.tanggal}
                deskripsi={item.deskripsi}
                neo
              />
            </div>
          ))}
          {!isLoading && kegiatan.length === 0 && <p className="flex w-full items-center justify-center py-12 text-sm text-gray-500">Belum ada kegiatan yang dipublikasikan.</p>}
        </div>
      </div>
      <Link
        to="/kegiatan"
        className="mt-4 flex h-15 w-50 items-center justify-center rounded-lg border-[3px] border-gray-950 bg-white font-semibold text-primary shadow-[3px_7px_0_rgba(22,101,52,0.72)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[4px_10px_0_rgba(22,101,52,0.82)] active:translate-y-0 active:scale-95"
      >
        Lihat Semua Kegiatan
      </Link>
    </section>
  );
}
