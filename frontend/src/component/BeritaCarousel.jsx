
import BeritaCard from "../component/BeritaCard";
import foto_guru3 from "../assets/image/foto_guru3.jpeg"
const berita = [
  {
    gambar: foto_guru3,
    judul: "Sidang Pengesahan Program Kerja MPK dan OSIS Periode 2026/2027",
    tanggal: "10 Oct 2026",
  },
  {
    gambar: foto_guru3,
    judul: "Kegiatan Pembelajaran dan Pengembangan Siswa",
    tanggal: "12 Oct 2026",
  },
  {
    gambar: foto_guru3,
    judul: "Informasi dan Pengumuman Terbaru Sekolah",
    tanggal: "15 Oct 2026",
  },
  {
    gambar: foto_guru3,
    judul: "Informasi dan Pengumuman Terbaru Sekolah",
    tanggal: "15 Oct 2026",
  },  {
    gambar: foto_guru3,
    judul: "Informasi dan Pengumuman Terbaru Sekolah",
    tanggal: "15 Oct 2026",
  },
];
export default function BeritaCarousel() {
  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center pt-20 bg-secondary">
      <p className="font-sans text-2xl font-bold md:text-4xl">Berita & Pengumuman</p>

      <div className="mt-10 w-[85%] h-[50vh]">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 h-full  scrollbar-none [&::-webkit-scrollbar]:hidden">
          {berita.map((item, index) => (
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
      <button className="mt-4 h-15 w-50 rounded-full border border-primary font-semibold text-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-lg active:translate-y-0 active:scale-95 hover:cursor-pointer">Lihat Semua Berita</button>
    </section>
  );
}