import {
  School,
  MapPin,
  Phone,
  Mail,
  Award,
  BookOpen,
  Users,
  CalendarDays,
  Quote,
} from "lucide-react";
import PageHeader from "../component/PageHeader";
import useFadeIn from "../utility/FadeIn";
import { kepalaSekolah } from "../data/guru";
import brosur_img from "../assets/image/brosur_contoh.jpeg";

// ====== DATA SEKOLAH ======
// Isi/ganti sesuai data resmi madrasah. Tanda "-" akan tampil apa adanya.
const identitas = [
  { label: "Sekolah", nilai: "MTs An-Nur Klapanunggal", ikon: School },
  { label: "NPSN", nilai: "20277550", ikon: BookOpen },
  { label: "Status", nilai: "Swasta", ikon: School },
  { label: "Akreditasi", nilai: "B", ikon: Award },
  { label: "Tahun Berdiri", nilai: "2003", ikon: CalendarDays },
  { label: "Kurikulum", nilai: "-", ikon: BookOpen },
  { label: "Jumlah Siswa", nilai: "1.000+", ikon: Users },
  { label: "Alamat", nilai: "Klapanunggal, Kab. Bogor, Jawa Barat", ikon: MapPin },
  { label: "Telepon", nilai: "(021) 2956 1451", ikon: Phone },
  { label: "E-mail", nilai: "mtsannurklapanunggal@yahoo.com", ikon: Mail },
];

const tentang = [
  "MTs An-Nur Klapanunggal hadir sebagai institusi pendidikan Islami yang berkomitmen mendampingi setiap siswa untuk bertumbuh menjadi generasi yang berkarakter mulia dan berwawasan luas.",
  "Berlandaskan nilai BERDISKUSI, BERSIH, DISIPLIN, KUALITATIF, dan BERPRESTASI, madrasah ini mengedepankan lingkungan belajar yang interaktif, nyaman, dan teratur untuk membentuk kebiasaan positif pada setiap peserta didik.",
  "Melalui pendekatan yang seimbang antara ilmu pengetahuan dan nilai-nilai agama, madrasah mendorong siswa mengoptimalkan potensi diri agar siap menjadi lulusan unggul yang tangguh dan berprestasi.",
];

// Teks sambutan sementara (dummy). Ganti dengan sambutan asli kepala madrasah.
// Nama, jabatan, dan foto diambil dari kepalaSekolah di data/guru.js.
const sambutan = [
  "Puji syukur kita panjatkan kepada Allah SWT atas limpahan rahmat dan karunia-Nya. Selamat datang di website resmi MTs An-Nur Klapanunggal, sarana kami untuk berbagi informasi dengan siswa, orang tua, dan masyarakat.",
  "Kami berkomitmen menghadirkan pendidikan yang seimbang antara ilmu pengetahuan dan nilai-nilai keislaman, agar setiap siswa tumbuh menjadi pribadi yang berakhlak mulia, disiplin, dan berprestasi.",
  "Kami berharap website ini dapat memberikan informasi yang bermanfaat. Kritik dan saran dari semua pihak sangat kami harapkan demi kemajuan madrasah tercinta.",
];

const statistik = [
  { angka: "1.000+", teks: "Siswa Aktif" },
  { angka: "5.000+", teks: "Lulusan" },
  { angka: "12", teks: "Ekstrakurikuler" },
];

export default function ProfilSekolah() {
  const [tentangRef, tentangVisible] = useFadeIn();
  const [sambutanRef, sambutanVisible] = useFadeIn();
  const [identitasRef, identitasVisible] = useFadeIn();
  const [petaRef, petaVisible] = useFadeIn();

  return (
    <>
      <PageHeader
        judul="Profil Sekolah"
        deskripsi="Mengenal lebih dekat MTs An-Nur Klapanunggal."
      />

      <div className="mx-auto flex w-[90%] max-w-5xl flex-col gap-16 py-12 md:py-16">
        {/* Tentang */}
        <section
          ref={tentangRef}
          className={`fade-in-section grid items-start gap-8 rounded-2xl border-[3px] border-gray-950 bg-white p-5 shadow-[6px_7px_0_rgba(22,101,52,0.55)] md:grid-cols-[2fr_3fr] md:p-8 ${tentangVisible ? "visible" : ""}`}
        >
          <img
            src={brosur_img}
            alt="Brosur MTs An-Nur Klapanunggal"
            className="h-72 w-full rounded-xl border-[3px] border-gray-950 object-cover shadow-[5px_6px_0_rgba(22,101,52,0.55)] md:h-[32rem]"
          />
          <div className="flex flex-col gap-4">
            <p className="w-fit border-2 border-gray-950 bg-[#fef08a] px-3 py-1 font-sans text-sm font-extrabold text-gray-950 shadow-[3px_3px_0_rgba(22,101,52,0.5)]">
              TENTANG KAMI
            </p>
            <h2 className="w-fit border-b-[3px] border-gray-950 pb-1 font-sans text-2xl font-extrabold md:text-3xl">
              MTs An-Nur Klapanunggal
            </h2>
            {tentang.map((paragraf, i) => (
              <p
                key={i}
                className="text-justify font-sans text-sm leading-relaxed text-gray-700 md:text-base"
              >
                {paragraf}
              </p>
            ))}

            <div className="mt-2 grid grid-cols-3 gap-3">
              {statistik.map((item) => (
                <div
                  key={item.teks}
                  className="rounded-lg border-2 border-gray-950 bg-primary p-3 text-center text-white shadow-[3px_4px_0_rgba(17,24,39,0.75)] md:p-4"
                >
                  <p className="font-sans text-xl font-extrabold md:text-2xl">
                    {item.angka}
                  </p>
                  <p className="font-sans text-xs text-white/80 md:text-sm">
                    {item.teks}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          ref={sambutanRef}
          className={`fade-in-section grid items-center gap-8 rounded-2xl border-[3px] border-gray-950 bg-secondary p-6 shadow-[7px_8px_0_rgba(22,101,52,0.58)] md:grid-cols-[1fr_2fr] md:gap-10 md:p-10 ${sambutanVisible ? "visible" : ""}`}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <img
              src={kepalaSekolah.foto}
              alt={kepalaSekolah.nama}
              className="h-48 w-48 rounded-full border-[4px] border-gray-950 object-cover object-top shadow-[5px_6px_0_rgba(22,101,52,0.65)] md:h-56 md:w-56"
            />
            <div>
              <p className="font-sans text-base font-bold md:text-lg">
                {kepalaSekolah.nama}
              </p>
              <p className="font-sans text-sm font-semibold text-primary">
                {kepalaSekolah.jabatan}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Quote
              size={36}
              className="text-primary/30"
              aria-hidden="true"
            />
            <p className="w-fit border-2 border-gray-950 bg-[#fef08a] px-3 py-1 font-sans text-sm font-extrabold text-gray-950 shadow-[3px_3px_0_rgba(22,101,52,0.5)]">
              SAMBUTAN KEPALA MADRASAH
            </p>
            <p className="font-sans text-sm font-semibold md:text-base">
              Assalamu&apos;alaikum Warahmatullahi Wabarakatuh,
            </p>
            {sambutan.map((paragraf, i) => (
              <p
                key={i}
                className="text-justify font-sans text-sm leading-relaxed text-gray-700 md:text-base"
              >
                {paragraf}
              </p>
            ))}
            <p className="font-sans text-sm font-semibold md:text-base">
              Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh.
            </p>
          </div>
        </section>

        {/* Identitas */}
        <section
          ref={identitasRef}
          className={`fade-in-section ${identitasVisible ? "visible" : ""}`}
        >
          <h2 className="text-center font-sans text-2xl font-bold md:text-3xl">
            Identitas Sekolah
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {identitas.map(({ label, nilai, ikon: Ikon }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-xl border-[3px] border-gray-950 bg-white p-4 shadow-[4px_5px_0_rgba(22,101,52,0.52)] transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-gray-950 bg-[#fef08a] text-gray-950">
                  <Ikon size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-sans text-xs text-gray-500">{label}</p>
                  <p className="font-sans text-sm font-semibold text-gray-800 md:text-base">
                    {nilai}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Peta */}
        <section
          ref={petaRef}
          className={`fade-in-section ${petaVisible ? "visible" : ""}`}
        >
          <h2 className="text-center font-sans text-2xl font-bold md:text-3xl">
            Lokasi Sekolah
          </h2>
          <div className="mt-8 overflow-hidden rounded-xl border-[3px] border-gray-950 shadow-[6px_7px_0_rgba(22,101,52,0.58)]">
            <iframe
              title="Peta MTs An-Nur Klapanunggal"
              src="https://maps.google.com/maps?q=MTs%20An-Nur%20Klapanunggal&t=m&z=14&output=embed&iwloc=near"
              className="h-80 w-full border-0 md:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </>
  );
}
