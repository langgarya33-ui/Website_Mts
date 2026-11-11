import {
  School,
  BookOpen,
  FlaskConical,
  MonitorSmartphone,
  Landmark,
  Dumbbell,
  Utensils,
  HeartPulse,
} from "lucide-react";
import PageHeader from "../component/PageHeader";
import useFadeIn from "../utility/FadeIn";

// Data sementara (demo). Ganti nama dan deskripsi sesuai fasilitas yang sebenarnya.
const fasilitas = [
  {
    nama: "Ruang Kelas",
    ikon: School,
    deskripsi: "Ruang belajar yang nyaman dan tertata untuk mendukung kegiatan belajar mengajar.",
  },
  {
    nama: "Perpustakaan",
    ikon: BookOpen,
    deskripsi: "Koleksi buku bacaan dan referensi untuk menumbuhkan minat baca siswa.",
  },
  {
    nama: "Laboratorium IPA",
    ikon: FlaskConical,
    deskripsi: "Tempat siswa melakukan praktikum dan percobaan sains secara langsung.",
  },
  {
    nama: "Laboratorium Komputer",
    ikon: MonitorSmartphone,
    deskripsi: "Sarana pembelajaran teknologi informasi dan keterampilan digital.",
  },
  {
    nama: "Masjid / Musala",
    ikon: Landmark,
    deskripsi: "Tempat ibadah dan pembiasaan kegiatan keagamaan di lingkungan madrasah.",
  },
  {
    nama: "Lapangan Olahraga",
    ikon: Dumbbell,
    deskripsi: "Area olahraga dan kegiatan upacara serta kegiatan ekstrakurikuler.",
  },
  {
    nama: "Kantin",
    ikon: Utensils,
    deskripsi: "Tempat siswa beristirahat dan menikmati makanan yang bersih dan sehat.",
  },
  {
    nama: "UKS",
    ikon: HeartPulse,
    deskripsi: "Unit kesehatan sekolah untuk pertolongan pertama dan pemeriksaan dasar.",
  },
];

export default function Fasilitas() {
  const [listRef, listVisible] = useFadeIn();

  return (
    <>
      <PageHeader
        judul="Fasilitas"
        deskripsi="Sarana dan prasarana yang mendukung kenyamanan belajar siswa MTs An-Nur Klapanunggal."
      />

      <section
        ref={listRef}
        className={`fade-in-section mx-auto w-[90%] max-w-5xl py-12 md:py-16 ${listVisible ? "visible" : ""}`}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fasilitas.map(({ nama, ikon: Ikon, deskripsi }) => (
            <article
              key={nama}
              className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Ikon size={24} aria-hidden="true" />
              </span>
              <h2 className="font-sans text-lg font-bold">{nama}</h2>
              <p className="font-sans text-sm leading-relaxed text-gray-600">
                {deskripsi}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
