import { Link } from "react-router-dom";
import BeritaCard from "../component/BeritaCard";
import foto_guru3 from "../assets/image/foto_guru3.jpeg";
import usePublishedContent from "../utility/usePublishedContent";

export default function BeritaCarousel() {
  const { items: berita, isLoading } = usePublishedContent("berita");
  const beritaTerbaru = berita.slice(0, 5);

  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center pt-20 bg-secondary">
      <h2 className="border-b-2 border-gray-900 px-2 pb-2 font-sans text-2xl font-extrabold md:text-4xl">Berita &amp; Pengumuman</h2>

      <div className="mt-10 w-[85%] h-[50vh]">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 h-full  scrollbar-none [&::-webkit-scrollbar]:hidden">
          {beritaTerbaru.map((item) => (
            <div key={item.id_berita} className="h-full w-[85%] flex-none snap-start sm:w-[320px] md:w-[360px] lg:w-[400px]">
              <BeritaCard
                id={`id/${item.id_berita}`}
                gambar={item.gambar ? `http://localhost:5000/uploads/${item.gambar}` : foto_guru3}
                judul={item.judul || item.isi}
                tanggal={item.tanggal}
                deskripsi={item.deskripsi}
                status_publikasi={item.status_publikasi}
                neo
              />
            </div>
          ))}
          {!isLoading && beritaTerbaru.length === 0 && <p className="flex h-full w-full items-center justify-center text-sm text-gray-500">Belum ada berita yang dipublikasikan.</p>}
        </div>
      </div>
      <Link
        to="/berita"
        className="mt-4 flex h-15 w-50 items-center justify-center rounded-lg border-[3px] border-gray-950 bg-white font-semibold text-primary shadow-[3px_7px_0_rgba(22,101,52,0.72)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[4px_10px_0_rgba(22,101,52,0.82)] active:translate-y-0 active:scale-95"
      >
        Lihat Semua Berita
      </Link>
    </section>
  );
}
