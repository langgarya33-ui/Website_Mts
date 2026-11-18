import foto_guru from "../assets/image/foto_guru.jpeg";
import foto_guru2 from "../assets/image/foto_guru2.jpeg";
import foto_guru3 from "../assets/image/foto_guru3.jpeg";

// Data sementara (dummy). Ganti dengan prestasi asli madrasah.
// tingkat : "kecamatan" | "kabupaten" | "provinsi" | "nasional"
// juara   : teks bebas, misalnya "Juara 1", "Juara 2", "Harapan 1"
const fotoDummy = [foto_guru, foto_guru2, foto_guru3];

export const tingkatPrestasi = [
  { id: "semua", label: "Semua" },
  { id: "kecamatan", label: "Kecamatan" },
  { id: "kabupaten", label: "Kabupaten" },
  { id: "provinsi", label: "Provinsi" },
  { id: "nasional", label: "Nasional" },
];

export const prestasi = [
  {
    lomba: "Lomba Pidato Bahasa Arab",
    juara: "Juara 1",
    tingkat: "kabupaten",
    peraih: "Nama Siswa",
    tahun: "2026",
  },
  {
    lomba: "Turnamen Futsal Antar Madrasah",
    juara: "Juara 2",
    tingkat: "kecamatan",
    peraih: "Tim Futsal Putra",
    tahun: "2026",
  },
  {
    lomba: "Musabaqah Tilawatil Qur'an (MTQ)",
    juara: "Juara 1",
    tingkat: "kecamatan",
    peraih: "Nama Siswi",
    tahun: "2026",
  },
  {
    lomba: "Olimpiade Sains Madrasah (OSM)",
    juara: "Juara 3",
    tingkat: "provinsi",
    peraih: "Nama Siswa",
    tahun: "2025",
  },
  {
    lomba: "Lomba Kaligrafi",
    juara: "Juara 2",
    tingkat: "kabupaten",
    peraih: "Nama Siswi",
    tahun: "2025",
  },
  {
    lomba: "Kejuaraan Karate",
    juara: "Juara 1",
    tingkat: "nasional",
    peraih: "Nama Siswa",
    tahun: "2025",
  },
  {
    lomba: "Lomba Hadroh",
    juara: "Juara 1",
    tingkat: "kabupaten",
    peraih: "Grup Hadroh Madrasah",
    tahun: "2024",
  },
  {
    lomba: "Lomba Cerdas Cermat Agama",
    juara: "Harapan 1",
    tingkat: "provinsi",
    peraih: "Tim Cerdas Cermat",
    tahun: "2024",
  },
].map((p, i) => ({ ...p, foto: fotoDummy[i % fotoDummy.length] }));
