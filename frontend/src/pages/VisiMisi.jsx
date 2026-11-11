import {
  Eye,
  Target,
  MessagesSquare,
  Sparkles,
  Clock,
  Medal,
  Trophy,
} from "lucide-react";
import PageHeader from "../component/PageHeader";
import useFadeIn from "../utility/FadeIn";

// Draf berdasarkan teks di beranda. Ganti dengan visi & misi resmi madrasah.
const visi =
  "Mewujudkan generasi cerdas, berakhlak mulia, kompetitif, dan berlandaskan nilai-nilai Islam.";

const misi = [
  "Menyelenggarakan pembelajaran yang interaktif, nyaman, dan teratur melalui budaya berdiskusi.",
  "Menanamkan nilai-nilai Islam dan akhlak mulia dalam kehidupan sehari-hari siswa.",
  "Membiasakan hidup bersih dan disiplin di lingkungan madrasah.",
  "Mengembangkan mutu pendidikan yang seimbang antara ilmu pengetahuan dan nilai-nilai agama.",
  "Mendorong siswa mengoptimalkan potensi diri untuk meraih prestasi akademik maupun non-akademik.",
];

const nilai = [
  { nama: "Berdiskusi", ikon: MessagesSquare, teks: "Belajar aktif dengan saling bertukar pikiran." },
  { nama: "Bersih", ikon: Sparkles, teks: "Lingkungan dan pribadi yang bersih dan sehat." },
  { nama: "Disiplin", ikon: Clock, teks: "Tertib, tepat waktu, dan bertanggung jawab." },
  { nama: "Kualitatif", ikon: Medal, teks: "Mengutamakan mutu dalam setiap proses belajar." },
  { nama: "Berprestasi", ikon: Trophy, teks: "Berusaha meraih hasil terbaik di berbagai bidang." },
];

export default function VisiMisi() {
  const [visiRef, visiVisible] = useFadeIn();
  const [misiRef, misiVisible] = useFadeIn();
  const [nilaiRef, nilaiVisible] = useFadeIn();

  return (
    <>
      <PageHeader
        judul="Visi & Misi"
        deskripsi="Arah dan tujuan MTs An-Nur Klapanunggal dalam mendidik generasi masa depan."
      />

      <div className="mx-auto flex w-[90%] max-w-5xl flex-col gap-16 py-12 md:py-16">
        {/* Visi */}
        <section
          ref={visiRef}
          className={`fade-in-section rounded-2xl bg-secondary p-6 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] md:p-10 ${visiVisible ? "visible" : ""}`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <Eye size={24} aria-hidden="true" />
            </span>
            <h2 className="font-sans text-2xl font-bold md:text-3xl">Visi</h2>
          </div>
          <p className="mt-5 font-sans text-lg font-semibold leading-relaxed text-primary md:text-2xl">
            {visi}
          </p>
        </section>

        {/* Misi */}
        <section
          ref={misiRef}
          className={`fade-in-section ${misiVisible ? "visible" : ""}`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <Target size={24} aria-hidden="true" />
            </span>
            <h2 className="font-sans text-2xl font-bold md:text-3xl">Misi</h2>
          </div>

          <ol className="mt-6 flex flex-col gap-4">
            {misi.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 md:p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="pt-1 font-sans text-sm leading-relaxed text-gray-700 md:text-base">
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Tata nilai */}
        <section
          ref={nilaiRef}
          className={`fade-in-section ${nilaiVisible ? "visible" : ""}`}
        >
          <h2 className="text-center font-sans text-2xl font-bold md:text-3xl">
            Tata Nilai Madrasah
          </h2>
          <p className="mt-2 text-center font-sans text-sm text-gray-600 md:text-base">
            Berdiskusi, Bersih, Disiplin, Kualitatif, dan Berprestasi
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {nilai.map(({ nama, ikon: Ikon, teks }) => (
              <div
                key={nama}
                className="flex flex-col items-center gap-3 rounded-xl bg-white p-5 text-center shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Ikon size={24} aria-hidden="true" />
                </span>
                <h3 className="font-sans text-base font-bold">{nama}</h3>
                <p className="font-sans text-sm leading-relaxed text-gray-600">
                  {teks}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
