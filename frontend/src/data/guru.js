import foto_guru from "../assets/image/foto_guru.jpeg";
import foto_guru2 from "../assets/image/foto_guru2.jpeg";
import foto_guru3 from "../assets/image/foto_guru3.jpeg";

// Data sementara (dummy). Ganti nama, jabatan, dan foto dengan data asli.
// kategori: "guru" atau "karyawan"
const fotoDummy = [foto_guru, foto_guru2, foto_guru3];

export const kepalaSekolah = {
  nama: "Nama Kepala Madrasah, S.Pd.",
  jabatan: "Kepala Madrasah",
  foto: foto_guru,
};

const guru = [
  { nama: "Ahmad Fauzi, S.Pd.", jabatan: "Wakil Kepala Kurikulum" },
  { nama: "Siti Aisyah, S.Pd.", jabatan: "Wakil Kepala Kesiswaan" },
  { nama: "Muhammad Rizki, S.Ag.", jabatan: "Guru Akidah Akhlak" },
  { nama: "Nur Hidayah, S.Pd.", jabatan: "Guru Bahasa Indonesia" },
  { nama: "Budi Santoso, S.Pd.", jabatan: "Guru Matematika" },
  { nama: "Dewi Lestari, S.Pd.", jabatan: "Guru IPA" },
  { nama: "Yusuf Hakim, S.Pd.I.", jabatan: "Guru Fikih" },
  { nama: "Rina Marlina, S.Pd.", jabatan: "Guru Bahasa Inggris" },
].map((g, i) => ({ ...g, kategori: "guru", foto: fotoDummy[i % 3] }));

const karyawan = [
  { nama: "Hendra Wijaya", jabatan: "Kepala Tata Usaha" },
  { nama: "Lilis Suryani", jabatan: "Staf Tata Usaha" },
  { nama: "Agus Salim", jabatan: "Operator Sekolah" },
  { nama: "Dedi Kurniawan", jabatan: "Petugas Perpustakaan" },
].map((k, i) => ({ ...k, kategori: "karyawan", foto: fotoDummy[(i + 1) % 3] }));

export const semuaStaf = [...guru, ...karyawan];
