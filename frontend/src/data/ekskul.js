import foto_guru from "../assets/image/foto_guru.jpeg";
import foto_guru2 from "../assets/image/foto_guru2.jpeg";
import foto_guru3 from "../assets/image/foto_guru3.jpeg";

// Daftar ekstrakurikuler diambil dari brosur MTs An-Nur Klapanunggal.
// Foto, jadwal, dan pembina masih sementara: ganti dengan data asli.
// kategori: "olahraga" | "seni" | "keagamaan" | "organisasi"
const fotoDummy = [foto_guru, foto_guru2, foto_guru3];

export const kategoriEkskul = [
  { id: "semua", label: "Semua" },
  { id: "olahraga", label: "Olahraga" },
  { id: "seni", label: "Seni" },
  { id: "keagamaan", label: "Keagamaan" },
  { id: "organisasi", label: "Organisasi" },
];

export const ekskul = [
  // Olahraga
  { nama: "Basket", kategori: "olahraga", deskripsi: "Latihan teknik dasar bola basket, kerja sama tim, dan sportivitas." },
  { nama: "Voli", kategori: "olahraga", deskripsi: "Latihan teknik dasar bola voli dan persiapan mengikuti pertandingan." },
  { nama: "Sepakbola", kategori: "olahraga", deskripsi: "Mengembangkan kemampuan bermain sepak bola, kekompakan, dan sportivitas." },
  { nama: "Futsal", kategori: "olahraga", deskripsi: "Mengembangkan kemampuan bermain futsal, kekompakan, dan sportivitas." },
  { nama: "Sepak Takraw", kategori: "olahraga", deskripsi: "Melatih ketangkasan dan kelincahan lewat permainan sepak takraw." },
  { nama: "Bulutangkis", kategori: "olahraga", deskripsi: "Latihan teknik dasar bulutangkis untuk melatih kecepatan dan ketepatan." },
  { nama: "Tenis Meja", kategori: "olahraga", deskripsi: "Latihan teknik dasar tenis meja untuk melatih refleks dan konsentrasi." },
  { nama: "Pencak Silat", kategori: "olahraga", deskripsi: "Seni bela diri yang melatih ketangkasan, disiplin, dan percaya diri." },
  { nama: "Karate", kategori: "olahraga", deskripsi: "Bela diri yang membangun disiplin, ketangkasan, dan kepercayaan diri." },
  { nama: "Drumband", kategori: "olahraga", deskripsi: "Melatih kekompakan dan kemampuan bermusik dalam barisan drumband." },

  // Organisasi
  { nama: "Pramuka", kategori: "organisasi", deskripsi: "Melatih kemandirian, kepemimpinan, dan kerja sama melalui kegiatan kepramukaan." },
  { nama: "PMR", kategori: "organisasi", deskripsi: "Palang Merah Remaja: belajar pertolongan pertama dan kepedulian sosial." },

  // Keagamaan
  { nama: "Tahfidz Qur'an", kategori: "keagamaan", deskripsi: "Membimbing siswa menghafal dan memperbaiki bacaan Al-Qur'an." },

  // Seni
  { nama: "Paduan Suara", kategori: "seni", deskripsi: "Melatih teknik vokal dan harmoni suara dalam kelompok." },
  { nama: "Marawis", kategori: "seni", deskripsi: "Seni musik Islami dengan alat pukul yang mengiringi lantunan shalawat." },
  { nama: "Qasidah", kategori: "seni", deskripsi: "Seni suara dan musik Islami yang melantunkan syair-syair islami." },
  { nama: "Hadroh", kategori: "seni", deskripsi: "Seni musik Islami dengan alat rebana untuk mengiringi shalawat." },
  { nama: "Kaligrafi", kategori: "seni", deskripsi: "Belajar menulis indah huruf Arab dan mengasah kreativitas seni Islam." },
].map((e, i) => ({
  ...e,
  jadwal: "-",
  pembina: "-",
  foto: fotoDummy[i % fotoDummy.length],
}));