import foto_guru from "../assets/image/foto_guru.jpeg";
import foto_guru2 from "../assets/image/foto_guru2.jpeg";
import foto_guru3 from "../assets/image/foto_guru3.jpeg";

// Data sementara (demo). Ganti dengan berita asli atau data dari backend.
// - id    : dipakai di alamat halaman detail (/berita/<id>), huruf kecil dan tanda hubung, harus unik
// - isi   : daftar paragraf; tiap string menjadi satu paragraf di halaman detail
const berita = [
  {
    id: "sidang-pengesahan-program-kerja-mpk-osis-2026-2027",
    gambar: foto_guru3,
    judul: "Sidang Pengesahan Program Kerja MPK dan OSIS Periode 2026/2027",
    tanggal: "10 Oct 2026",
    isi: [
      "MTs An-Nur Klapanunggal menggelar sidang pengesahan program kerja Majelis Perwakilan Kelas (MPK) dan Organisasi Siswa Intra Sekolah (OSIS) periode 2026/2027. Kegiatan ini dihadiri oleh kepala madrasah, para guru, dan seluruh pengurus.",
      "Dalam sidang tersebut, setiap bidang memaparkan rencana kegiatan yang akan dijalankan selama satu tahun ke depan, mulai dari kegiatan keagamaan, olahraga, hingga seni dan kreativitas.",
      "Kepala madrasah berpesan agar seluruh pengurus menjalankan amanah dengan penuh tanggung jawab dan menjadi teladan bagi teman-temannya.",
    ],
  },
  {
    id: "kegiatan-pembelajaran-dan-pengembangan-siswa",
    gambar: foto_guru3,
    judul: "Kegiatan Pembelajaran dan Pengembangan Siswa",
    tanggal: "12 Oct 2026",
    isi: [
      "Kegiatan belajar mengajar di MTs An-Nur Klapanunggal berjalan dengan suasana yang aktif dan menyenangkan. Para guru menerapkan metode pembelajaran yang beragam agar siswa lebih mudah memahami materi.",
      "Selain pembelajaran di kelas, madrasah juga mendorong pengembangan diri siswa melalui berbagai kegiatan penunjang yang sesuai dengan minat dan bakat masing-masing.",
    ],
  },
  {
    id: "informasi-dan-pengumuman-terbaru-sekolah",
    gambar: foto_guru3,
    judul: "Informasi dan Pengumuman Terbaru Sekolah",
    tanggal: "15 Oct 2026",
    isi: [
      "Madrasah menyampaikan sejumlah informasi dan pengumuman terbaru kepada seluruh siswa dan orang tua/wali murid terkait jadwal kegiatan dan agenda sekolah.",
      "Orang tua dan siswa diharapkan memantau informasi resmi melalui website ini serta media sosial madrasah agar tidak ketinggalan kabar terbaru.",
    ],
  },
  {
    id: "pelatihan-guru-pemanfaatan-teknologi-pembelajaran",
    gambar: foto_guru,
    judul: "Pelatihan Guru dalam Pemanfaatan Teknologi Pembelajaran",
    tanggal: "20 Oct 2026",
    isi: [
      "Para guru MTs An-Nur Klapanunggal mengikuti pelatihan pemanfaatan teknologi dalam pembelajaran. Pelatihan ini bertujuan meningkatkan kualitas penyampaian materi agar lebih menarik dan interaktif.",
      "Peserta mempelajari penggunaan berbagai aplikasi pendukung belajar serta cara menyusun materi digital yang mudah dipahami siswa.",
      "Diharapkan hasil pelatihan ini dapat langsung diterapkan di kelas sehingga proses belajar semakin efektif.",
    ],
  },
  {
    id: "peringatan-hari-santri-nasional-di-madrasah",
    gambar: foto_guru2,
    judul: "Peringatan Hari Santri Nasional di Lingkungan Madrasah",
    tanggal: "22 Oct 2026",
    isi: [
      "Seluruh warga MTs An-Nur Klapanunggal memperingati Hari Santri Nasional dengan upacara dan rangkaian kegiatan keagamaan. Siswa tampil mengenakan busana muslim dan sarung dengan penuh semangat.",
      "Peringatan ini menjadi momentum untuk meneladani semangat para santri dalam menuntut ilmu dan menjaga persatuan bangsa.",
    ],
  },
  {
    id: "pembukaan-pendaftaran-siswa-baru-2027-2028",
    gambar: foto_guru3,
    judul: "Pembukaan Pendaftaran Siswa Baru Tahun Ajaran 2027/2028",
    tanggal: "1 Nov 2026",
    isi: [
      "MTs An-Nur Klapanunggal membuka informasi penerimaan murid baru untuk tahun ajaran 2027/2028. Calon siswa dan orang tua dapat melihat jadwal, persyaratan, dan alur penerimaan pada halaman SPMB.",
      "Untuk pertanyaan lebih lanjut, silakan hubungi panitia melalui kontak yang tersedia atau datang langsung ke madrasah pada jam layanan.",
    ],
  },
];

export default berita;
