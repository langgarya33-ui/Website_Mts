import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import foto_guru3 from "../assets/image/foto_guru3.jpeg";

export default function PageHeader({ judul, deskripsi }) {
  return (
    <header className="relative isolate w-full overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36">
      <img
        src={foto_guru3}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-primary/85" />

      <div className="mx-auto w-[90%] max-w-5xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-3 flex items-center gap-1 font-sans text-sm text-white/80"
        >
          <Link to="/" className="transition-colors hover:text-white">
            Beranda
          </Link>
          <ChevronRight size={16} aria-hidden="true" />
          <span className="font-semibold text-white">{judul}</span>
        </nav>

        <h1 className="font-sans text-3xl font-bold text-white md:text-5xl">
          {judul}
        </h1>

        {deskripsi && (
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/90 md:text-lg">
            {deskripsi}
          </p>
        )}
      </div>
    </header>
  );
}
