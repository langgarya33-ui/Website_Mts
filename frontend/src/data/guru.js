import foto_guru from "../assets/image/foto_guru.jpeg";
import foto_guru2 from "../assets/image/foto_guru2.jpeg";
import foto_guru3 from "../assets/image/foto_guru3.jpeg";

// Data sementara (dummy). Ganti nama, jabatan, dan foto dengan data asli.
// kategori: "guru" atau "karyawan"
const fotoDummy = [foto_guru, foto_guru2, foto_guru3];

export const kepalaSekolah = {
  nama: "H. A.Samsudi,S.Pd,M.M",
  jabatan: "Kepala Madrasah",
  foto: foto_guru,
};

export const guru = [
  { nama: "M. Nur Zubaidi, S.Pd.I.", jabatan: "Wakil Kepala Bidang Kurikulum" },
  { nama: "Endih Andriansyah, S.Pd.I.", jabatan: "Wakil Kepala Bidang Kesiswaan" },
  { nama: "Erfa Rayadiyatno, S.Pd.", jabatan: "Wakil Kepala Bidang BP/BK" },
  { nama: "Rini Hastuti, S.Pd.", jabatan: "Wakil Kepala Bidang Humas" },
  { nama: "Aryuningsih, S.Pd.", jabatan: "Wakil Kepala Bidang Sarpras" },
  { nama: "Endang Suhida, S.Sos.", jabatan: "Guru" },
  { nama: "Nety Pujiastuti, S.Pd.", jabatan: "Guru" },
  { nama: "Tri Sadkuntala, S.Pd.", jabatan: "Guru" },
  { nama: "Nian Lilianti, S.Pd.", jabatan: "Guru" },
  { nama: "Winardi, S.Pd.", jabatan: "Guru" },
  { nama: "Lu'luil Maknun, S.Pd.I.", jabatan: "Guru" },
  { nama: "Robet Iswadi, S.Pd.", jabatan: "Guru" },
  { nama: "Alan Nursandy M, S.Kom.", jabatan: "Guru" },
  { nama: "Abd. Rohman Efendi, S.Pd.I.", jabatan: "Guru" },
  { nama: "Diat Ahdiansyah, M.Pd.", jabatan: "Guru" },
  { nama: "Nikmatur Rohmah S, S.Pd.", jabatan: "Guru" },
  { nama: "Lita Yulistiyani, S.Pd.", jabatan: "Guru" },
  { nama: "Rois Farida, S.Pd.", jabatan: "Guru" },
  { nama: "Rita Mahliana, S.Pd.", jabatan: "Guru" },
  { nama: "Jamaludin Fatul B, S.Pd.I.", jabatan: "Guru" },
  { nama: "Moh. Chaidar Arifin, M.Pd.", jabatan: "Guru" },
  { nama: "Muhammad Misbah, S.Pd.I.", jabatan: "Guru" },
  { nama: "Peni Marliana, S.Pd.", jabatan: "Guru" },
  { nama: "Aris Sugiarto, S.Pd.", jabatan: "Guru" },
  { nama: "Nurussaadah, S.Pd.", jabatan: "Guru" },
  { nama: "Riko Saputra, M.Pd.", jabatan: "Guru" },
  { nama: "Indra Lies Meidyani, S.Pd.I.", jabatan: "Guru" },
  { nama: "Lia Dwi Arindra, S.Pd.", jabatan: "Guru" },
  { nama: "Annisa Nurfitriani R., S.Pd.", jabatan: "Guru" },
  { nama: "Tria Agustina, S.Pd.", jabatan: "Guru" },
  { nama: "Desti Kusniawati, S.Pd.", jabatan: "Guru" },
  { nama: "Emim Suryadi, S.Pd.", jabatan: "Guru" },
  { nama: "Bintang Omega S. D., S.Pd.", jabatan: "Guru" },
  { nama: "Labibah, S.Pd.", jabatan: "Guru" },
  { nama: "Kartika Agustina, S.Pd.", jabatan: "Guru" },
  { nama: "Abdul Manaf, M.Pd.", jabatan: "Guru" },
  { nama: "Muhamad Aldiansyah, S.Pd.", jabatan: "Guru" },
  { nama: "Rosmawati, S.S.", jabatan: "Guru" },
  { nama: "Karis, S.Pd.", jabatan: "Guru" },
  { nama: "Siti Mardhiyah, S.Pd.", jabatan: "Guru" },
  { nama: "Muhammad Azam Fariz, S.Pd.", jabatan: "Guru" },
  { nama: "Agung Kurniawan Pradana, S.Pd.", jabatan: "Guru" },
  { nama: "Warja Hardiyanto, S.Pd.", jabatan: "Guru" },
  { nama: "Najzuwa Haqahana, S.Pd.", jabatan: "Guru" },
  { nama: "Abdul Azis, S.Pd.I.", jabatan: "Guru / Staf T.U." },
].map((g, i) => ({ ...g, kategori: "guru", foto: fotoDummy[i % 3] }));

const karyawan = [
  { nama: "Dra. Hj. Fitri Wahyuni", jabatan: "Kepala Tata Usaha" },
  { nama: "Iwan Didik Toni Efendi", jabatan: "Staf T.U." },
  { nama: "Endra Setiawan", jabatan: "Staf T.U." },
  { nama: "Saepul Bahri", jabatan: "Pegawai" },
  { nama: "Misnan", jabatan: "Pegawai" },
  { nama: "Yogi Ramadhan", jabatan: "Pegawai" },
  { nama: "Ace", jabatan: "Satpam" },
].map((k, i) => ({ ...k, kategori: "karyawan", foto: fotoDummy[(i + 1) % 3] }));

export const semuaStaf = [...guru, ...karyawan];
