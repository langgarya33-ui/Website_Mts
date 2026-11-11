import {
  School,
  MapPin,
  Phone,
  Mail,
  Award,
  BookOpen,
  Users,
  CalendarDays,
} from "lucide-react";
import PageHeader from "../component/PageHeader";
import useFadeIn from "../utility/FadeIn";
import brosur_img from "../assets/image/brosur_contoh.jpeg";

// ====== DATA SEKOLAH ======
// Isi/ganti sesuai data resmi madrasah. Tanda "-" akan tampil apa adanya.
const identitas = [
  { label: "Nama Madrasah", nilai: "MTs An-Nur Klapanunggal", ikon: School },
  { label: "NPSN", nilai: "-", ikon: BookOpen },
  { label: "Status", nilai: "Swasta", ikon: School },
  { label: "Akreditasi", nilai: "-", ikon: Award },
  { label: "Tahun Berdiri", nilai: "-", ikon: CalendarDays },
  { label: "Kurikulum", nilai: "-", ikon: BookOpen },
  { label: "Jumlah Siswa", nilai: "1.000+", ikon: Users },
  { label: "Alamat", nilai: "Klapanunggal, Kab. Bogor, Jawa Barat", ikon: MapPin },
  { label: "Telepon", nilai: "-", ikon: Phone },
  { label: "E-mail", nilai: "-", ikon: Mail },
];

const tentang = [
  "MTs An-Nur Klapanunggal hadir sebagai institusi pendidikan Islami yang berkomitmen mendampingi setiap siswa untuk bertumbuh menjadi generasi yang berkarakter mulia dan berwawasan luas.",
  "Berlandaskan nilai BERDISKUSI, BERSIH, DISIPLIN, KUALITATIF, dan BERPRESTASI, madrasah ini mengedepankan lingkungan belajar yang interaktif, nyaman, dan teratur untuk membentuk kebiasaan positif pada setiap peserta didik.",
  "Melalui pendekatan yang seimbang antara ilmu pengetahuan dan nilai-nilai agama, madrasah mendorong siswa mengoptimalkan potensi diri agar siap menjadi lulusan unggul yang tangguh dan berprestasi.",
];

const statistik = [
  { angka: "1.000+", teks: "Siswa Aktif" },
  { angka: "5.000+", teks: "Lulusan" },
  { angka: "12", teks: "Ekstrakurikuler" },
];

export default function ProfilSekolah() {
  const [tentangRef, tentangVisible] = useFadeIn();
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
          className={`fade-in-section grid items-start gap-8 md:grid-cols-[2fr_3fr] ${tentangVisible ? "visible" : ""}`}
        >
          <img
            src={brosur_img}
            alt="Brosur MTs An-Nur Klapanunggal"
            className="w-full rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
          />
          <div className="flex flex-col gap-4">
            <p className="font-sans text-sm font-bold text-primary">
              TENTANG KAMI
            </p>
            <h2 className="font-sans text-2xl font-bold md:text-3xl">
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
                  className="rounded-xl bg-primary p-4 text-center text-white"
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

        {/* Identitas */}
        <section
          ref={identitasRef}
          className={`fade-in-section ${identitasVisible ? "visible" : ""}`}
        >
          <h2 className="text-center font-sans text-2xl font-bold md:text-3xl">
            Identitas Sekolah
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {identitas.map(({ label, nilai, ikon: Ikon }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
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
          <div className="mt-8 overflow-hidden rounded-xl shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
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
