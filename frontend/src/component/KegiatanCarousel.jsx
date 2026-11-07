
import KegiatanCard from "../component/KegiatanCard";
import foto_guru3 from "../assets/image/foto_guru3.jpeg";

const kegiatan = [
  {
    gambar: foto_guru3,
    judul: "Sidang Pengesahan Program Kerja MPK dan OSIS",
    tanggal: "10 Oktober 2026",
    deskripsi:
      "Kegiatan pengesahan program kerja MPK dan OSIS sebagai langkah awal pelaksanaan program organisasi siswa.",
  },
  {
    gambar: foto_guru3,
    judul: "Kegiatan Pembelajaran di Lingkungan Sekolah",
    tanggal: "12 Oktober 2026",
    deskripsi:
      "Kegiatan pembelajaran untuk meningkatkan pengetahuan, kreativitas, dan kemampuan siswa.",
  },
  {
    gambar: foto_guru3,
    judul: "Kegiatan Ekstrakurikuler Siswa",
    tanggal: "15 Oktober 2026",
    deskripsi:
      "Kegiatan pengembangan minat dan bakat siswa melalui program ekstrakurikuler sekolah.",
  },
  {
    gambar: foto_guru3,
    judul: "Peringatan Hari Besar Nasional",
    tanggal: "20 Oktober 2026",
    deskripsi:
      "Kegiatan sekolah untuk menumbuhkan rasa nasionalisme dan kebersamaan antarsiswa.",
  },
  {
    gambar: foto_guru3,
    judul: "Kegiatan Kebersihan Lingkungan Sekolah",
    tanggal: "22 Oktober 2026",
    deskripsi:
      "Kegiatan menjaga kebersihan lingkungan sekolah dan membangun kepedulian terhadap lingkungan.",
  },
];

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
      <button className="mt-4 h-15 w-50 rounded-full border border-primary font-semibold text-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-lg active:translate-y-0 active:scale-95 hover:cursor-pointer">Lihat Semua Kegiatan</button>
    </section>
  );
}
