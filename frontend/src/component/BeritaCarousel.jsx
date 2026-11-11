import { Link } from "react-router-dom";
import BeritaCard from "../component/BeritaCard";
import berita from "../data/berita";

export default function BeritaCarousel() {
  // Tampilkan 5 berita terbaru saja di beranda
  const beritaTerbaru = berita.slice(0, 5);

  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center pt-20 bg-secondary">
      <p className="font-sans text-2xl font-bold md:text-4xl">Berita & Pengumuman</p>

      <div className="mt-10 w-[85%] h-[50vh]">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 h-full  scrollbar-none [&::-webkit-scrollbar]:hidden">
          {beritaTerbaru.map((item, index) => (
            <div key={index} className="h-full w-[85%] flex-none snap-start sm:w-[320px] md:w-[360px] lg:w-[400px]">
              <BeritaCard
                gambar={item.gambar}
                judul={item.judul}
                tanggal={item.tanggal}
              />
            </div>
          ))}
        </div>
      </div>
      <Link
        to="/berita"
        className="mt-4 flex h-15 w-50 items-center justify-center rounded-full border border-primary font-semibold text-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-lg active:translate-y-0 active:scale-95"
      >
        Lihat Semua Berita
      </Link>
    </section>
  );
}
