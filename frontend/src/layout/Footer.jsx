import Logo from "../assets/image/logo_mts.png";

// ====== DATA KONTAK ======
// Ganti dengan data resmi madrasah. Kosongkan "url" untuk menyembunyikan ikon sosial media.
const kontak = {
  nama: "MTs AN-NUR KLAPANUNGGAL",
  alamat: "Klapanunggal, Kab. Bogor, Jawa Barat",
  telepon: "-",
  email: "-",
};

const sosmed = [
  {
    nama: "Threads",
    url: "https://www.threads.net/@mts.annurklapanunggal",
    bg:"bg-black",
    path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z",
  },
  {
    nama: "YouTube",
    url: "https://www.youtube.com/@mtsannurklapanunggal",
    bg: "bg-[#cd201f]",
    path: "M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.19C2 8.76 2 12 2 12s0 3.24.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81ZM10 15V9l5.2 3-5.2 3Z",
  },
  {
    nama: "Instagram",
    url: "https://www.instagram.com/mts.annurklapanunggal/",
    bg: "bg-[#e100ff]",
    path: "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  },
  {
    nama: "TikTok",
    url: "https://www.tiktok.com/@mts.annurklapanunggal",
    bg: "bg-black",
    path: "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1 0-5.2c.27 0 .53.04.77.12V9.66a5.7 5.7 0 0 0-.77-.05 5.69 5.69 0 1 0 5.69 5.69V8.99a7.36 7.36 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48Z",
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 w-full border-t-4 border-primary/40 bg-primary/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-12 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-center">
          <img
            src={Logo}
            alt="Logo MTs An-Nur Klapanunggal"
            className="h-24 w-auto md:h-28"
          />
          <div className="font-sans text-sm text-gray-700 md:text-base">
            <p className="mb-3 font-bold text-primary">{kontak.nama}</p>
            <p>{kontak.alamat}</p>
            <p>Telp. {kontak.telepon}</p>
            <p>e-mail: {kontak.email}</p>
          </div>
        </div>

        <ul className="flex items-center gap-2">
          {sosmed
            .filter((s) => s.url)
            .map((s) => (
              <li key={s.nama}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.nama}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-300 hover:-translate-y-1 ${s.bg}`}
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
        </ul>
      </div>

      <div className="border-t border-primary/20 py-4 text-center font-sans text-xs text-gray-600">
        © {new Date().getFullYear()} {kontak.nama}. Hak cipta dilindungi.
      </div>
    </footer>
  );
}
