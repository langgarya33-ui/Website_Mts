import Logo from "../assets/image/logo_mts.png";
import { kontak, sosmed } from "../data/kontak";

const ada = (v) => v && v !== "-";

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
            {ada(kontak.telepon) && <p>Telp. {kontak.telepon}</p>}
            {ada(kontak.email) && <p>e-mail: {kontak.email}</p>}
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
