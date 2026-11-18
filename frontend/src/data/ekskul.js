import foto_guru from "../assets/image/foto_guru.jpeg";
import foto_guru2 from "../assets/image/foto_guru2.jpeg";
import foto_guru3 from "../assets/image/foto_guru3.jpeg";

// Data sementara (dummy). Ganti nama, deskripsi, jadwal, pembina, dan foto dengan data asli.
// kategori: "olahraga" | "seni" | "keagamaan" | "akademik"
const fotoDummy = [foto_guru, foto_guru2, foto_guru3];

export const kategoriEkskul = [
  { id: "semua", label: "Semua" },
  { id: "olahraga", label: "Olahraga" },
  { id: "seni", label: "Seni" },
  { id: "keagamaan", label: "Keagamaan" },
  { id: "akademik", label: "Akademik" },
];

export const ekskul = [
  {
    nama: "Pramuka",
    kategori: "akademik",
    deskripsi: "Melatih kemandirian, kepemimpinan, dan kerja sama melalui kegiatan kepramukaan.",
    jadwal: "Jumat, 14.00 WIB",
    pembina: "Nama Pembina",
  },
  {
    nama: "Futsal",
    kategori: "olahraga",
    deskripsi: "Mengembangkan kemampuan bermain futsal, sportivitas, dan kekompakan tim.",
    jadwal: "Selasa, 15.00 WIB",
    pembina: "Nama Pembina",
  },
  {
    nama: "Voli",
    kategori: "olahraga",
    deskripsi: "Latihan teknik dasar voli dan persiapan mengikuti pertandingan antar sekolah.",
    jadwal: "Kamis, 15.00 WIB",
    pembina: "Nama Pembina",
  },
  {
    nama: "Hadroh",
    kategori: "seni",
    deskripsi: "Seni musik Islami dengan alat rebana untuk mengiringi shalawat dan acara madrasah.",
    jadwal: "Rabu, 14.30 WIB",
    pembina: "Nama Pembina",
  },
  {
    nama: "Tahfidz Al-Qur'an",
    kategori: "keagamaan",
    deskripsi: "Membimbing siswa menghafal dan memperbaiki bacaan Al-Qur'an.",
    jadwal: "Senin & Kamis, 13.30 WIB",
    pembina: "Nama Pembina",
  },
  {
    nama: "Kaligrafi",
    kategori: "seni",
    deskripsi: "Belajar menulis indah huruf Arab dan mengasah kreativitas seni Islam.",
    jadwal: "Sabtu, 09.00 WIB",
    pembina: "Nama Pembina",
  },
  {
    nama: "Pidato 3 Bahasa",
    kategori: "akademik",
    deskripsi: "Melatih keberanian berbicara di depan umum dalam bahasa Indonesia, Arab, dan Inggris.",
    jadwal: "Rabu, 15.00 WIB",
    pembina: "Nama Pembina",
  },
  {
    nama: "Karate",
    kategori: "olahraga",
    deskripsi: "Bela diri yang membangun disiplin, ketangkasan, dan kepercayaan diri.",
    jadwal: "Sabtu, 08.00 WIB",
    pembina: "Nama Pembina",
  },
].map((e, i) => ({ ...e, foto: fotoDummy[i % fotoDummy.length] }));
