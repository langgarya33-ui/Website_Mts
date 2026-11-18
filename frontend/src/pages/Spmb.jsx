import { useState } from "react";
import {
  CalendarDays,
  ClipboardList,
  FileText,
  ChevronDown,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import PageHeader from "../component/PageHeader";
import useFadeIn from "../utility/FadeIn";
import { kontak } from "../data/kontak";
// Foto formulir sementara memakai aset yang ada. Ganti dengan foto formulir asli.
import fotoFormulir from "../assets/image/brosur_contoh.jpeg";

// ====== DATA SPMB (DUMMY) ======
// Ganti semua isi di bawah dengan informasi resmi madrasah.
const tahunAjaran = "2027/2028";

const intro =
  "Sistem Penerimaan Murid Baru (SPMB) MTs An-Nur Klapanunggal dibuka bagi calon siswa yang ingin bergabung dan berkembang bersama kami. Halaman ini berisi informasi seputar jadwal, persyaratan, dan alur penerimaan.";

const jadwal = [
  { tahap: "Pengumuman & Sosialisasi", tanggal: "1 – 31 Januari 2027" },
  { tahap: "Pendaftaran Gelombang 1", tanggal: "1 Februari – 31 Maret 2027" },
  { tahap: "Seleksi Gelombang 1", tanggal: "5 April 2027" },
  { tahap: "Pendaftaran Gelombang 2", tanggal: "10 April – 31 Mei 2027" },
  { tahap: "Seleksi Gelombang 2", tanggal: "5 Juni 2027" },
  { tahap: "Pengumuman Hasil", tanggal: "12 Juni 2027" },
  { tahap: "Daftar Ulang", tanggal: "14 – 25 Juni 2027" },
];

const persyaratan = [
  "Lulusan SD/MI atau sederajat",
  "Usia maksimal 15 tahun pada 1 Juli tahun ajaran berjalan",
  "Fotokopi ijazah atau surat keterangan lulus (SKL)",
  "Fotokopi Kartu Keluarga dan akta kelahiran",
  "Fotokopi KTP orang tua/wali",
  "Pas foto berwarna ukuran 3x4 sebanyak 4 lembar",
  "Fotokopi kartu bantuan (KIP/PKH) bagi yang memiliki",
];

const alur = [
  { judul: "Cari Informasi", isi: "Baca informasi SPMB di halaman ini atau datang langsung ke madrasah." },
  { judul: "Siapkan Berkas", isi: "Lengkapi seluruh berkas persyaratan yang dibutuhkan." },
  { judul: "Pendaftaran", isi: "Serahkan berkas ke panitia SPMB sesuai jadwal yang ditentukan." },
  { judul: "Seleksi", isi: "Ikuti tes seleksi dan wawancara sesuai tanggal yang telah dijadwalkan." },
  { judul: "Pengumuman", isi: "Hasil seleksi diumumkan melalui papan pengumuman dan media resmi madrasah." },
  { judul: "Daftar Ulang", isi: "Calon siswa yang diterima melakukan daftar ulang dan melengkapi administrasi." },
];

const faq = [
  {
    tanya: "Apakah pendaftaran bisa dilakukan secara online?",
    jawab: "Informasi mengenai metode pendaftaran akan diumumkan oleh panitia. Silakan hubungi kontak panitia atau pantau media resmi madrasah.",
  },
  {
    tanya: "Berapa biaya pendaftaran dan biaya masuk?",
    jawab: "Rincian biaya dapat ditanyakan langsung kepada panitia SPMB atau diumumkan saat sosialisasi.",
  },
  {
    tanya: "Apakah ada keringanan biaya?",
    jawab: "Calon siswa yang memiliki kartu bantuan (KIP/PKH) dapat melampirkan salinannya untuk dipertimbangkan oleh panitia.",
  },
  {
    tanya: "Kapan bisa datang untuk bertanya langsung?",
    jawab: "Panitia melayani pada jam kerja madrasah, Senin – Sabtu pukul 08.00 – 14.00 WIB.",
  },
];

function Judul({ ikon: Ikon, children }) {
  return (
    <div className="mb-8 flex flex-col items-center gap-2 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Ikon size={24} aria-hidden="true" />
      </span>
      <h2 className="font-sans text-2xl font-bold md:text-3xl">{children}</h2>
    </div>
  );
}

const kartu =
  "rounded-xl border-2 border-black bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]";

export default function Spmb() {
  const [buka, setBuka] = useState(0);
  const [introRef, introVisible] = useFadeIn();
  const [jadwalRef, jadwalVisible] = useFadeIn();
  const [syaratRef, syaratVisible] = useFadeIn();
  const [alurRef, alurVisible] = useFadeIn();
  const [faqRef, faqVisible] = useFadeIn();

  return (
    <>
      <PageHeader
        judul="Informasi SPMB"
        deskripsi={`Penerimaan murid baru tahun ajaran ${tahunAjaran}.`}
      />

      <div className="mx-auto flex w-[90%] max-w-5xl flex-col gap-16 py-12 md:py-16">
        {/* Pengantar */}
        <section
          ref={introRef}
          className={`fade-in-section text-center ${introVisible ? "visible" : ""}`}
        >
          <a
            href={fotoFormulir}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mb-8 block w-full max-w-md"
            aria-label="Lihat foto formulir ukuran penuh"
          >
            <img
              src={fotoFormulir}
              alt="Formulir SPMB MTs An-Nur Klapanunggal"
              className="w-full rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-[1.02]"
            />
            <span className="mt-2 block font-sans text-xs text-gray-500">
              Klik gambar untuk melihat ukuran penuh
            </span>
          </a>
          <p className="mx-auto max-w-3xl font-sans text-sm leading-relaxed text-gray-700 md:text-base">
            {intro}
          </p>
        </section>

        {/* Jadwal */}
        <section
          ref={jadwalRef}
          className={`fade-in-section ${jadwalVisible ? "visible" : ""}`}
        >
          <Judul ikon={CalendarDays}>Jadwal Penting</Judul>
          <ol className="relative mx-auto max-w-2xl border-l-2 border-primary/30 pl-6">
            {jadwal.map((item) => (
              <li key={item.tahap} className="relative pb-6 last:pb-0">
                <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-4 border-white bg-primary" />
                <p className="font-sans text-sm font-bold text-gray-800 md:text-base">
                  {item.tahap}
                </p>
                <p className="font-sans text-sm text-primary">{item.tanggal}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Persyaratan */}
        <section
          ref={syaratRef}
          className={`fade-in-section ${syaratVisible ? "visible" : ""}`}
        >
          <Judul ikon={FileText}>Persyaratan</Judul>
          <ul className="grid gap-3 sm:grid-cols-2">
            {persyaratan.map((p, i) => (
              <li key={p} className={`${kartu} flex items-start gap-3 p-4`}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="font-sans text-sm text-gray-700 md:text-base">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Alur */}
        <section
          ref={alurRef}
          className={`fade-in-section ${alurVisible ? "visible" : ""}`}
        >
          <Judul ikon={ClipboardList}>Alur Penerimaan</Judul>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alur.map((a, i) => (
              <div key={a.judul} className={`${kartu} p-5`}>
                <p className="font-sans text-3xl font-extrabold text-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-sans text-base font-bold text-gray-800">
                  {a.judul}
                </h3>
                <p className="mt-1 font-sans text-sm text-gray-600">{a.isi}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section
          ref={faqRef}
          className={`fade-in-section mx-auto w-full max-w-3xl ${faqVisible ? "visible" : ""}`}
        >
          <h2 className="mb-8 text-center font-sans text-2xl font-bold md:text-3xl">
            Pertanyaan Umum
          </h2>
          <div className="flex flex-col gap-3">
            {faq.map((f, i) => {
              const terbuka = buka === i;
              return (
                <div key={f.tanya} className={kartu}>
                  <button
                    type="button"
                    onClick={() => setBuka(terbuka ? -1 : i)}
                    aria-expanded={terbuka}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left font-sans text-sm font-semibold text-gray-800 hover:cursor-pointer md:text-base"
                  >
                    {f.tanya}
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`shrink-0 text-primary transition-transform duration-300 ${terbuka ? "rotate-180" : ""}`}
                    />
                  </button>
                  {terbuka && (
                    <p className="px-4 pb-4 font-sans text-sm text-gray-600">
                      {f.jawab}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Kontak panitia */}
        <section className="rounded-xl bg-primary p-6 text-white md:p-8">
          <h2 className="font-sans text-xl font-bold md:text-2xl">
            Informasi Lebih Lanjut
          </h2>
          <p className="mt-1 font-sans text-sm text-white/80">
            Hubungi panitia SPMB atau datang langsung ke madrasah.
          </p>
          <ul className="mt-5 grid gap-3 font-sans text-sm md:grid-cols-3 md:text-base">
            <li className="flex items-start gap-2">
              <Phone size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              {kontak.telepon}
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              {kontak.alamat}
            </li>
            <li className="flex items-start gap-2">
              <Clock size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
             Hari: {kontak.hari}
             <br />
              Jam: {kontak.jam}
              </span>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
