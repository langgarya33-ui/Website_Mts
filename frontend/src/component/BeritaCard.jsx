import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

export default function BeritaCard({ id, gambar, judul, tanggal }) {
  return (
    <Link
      to={`/berita/${id}`}
      aria-label={`Baca berita: ${judul}`}
      className="block h-full w-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="group flex h-full w-full cursor-pointer flex-col gap-3 overflow-hidden rounded-xl border-2 border-black bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-black hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)] active:scale-[0.98]">
        <div className="h-[45%] w-full">
          <img
            src={gambar}
            alt={judul}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex h-full w-full flex-col gap-2 px-3 pb-3">
          <p className="text-md w-full font-bold">{judul}</p>
          <div className="flex w-full items-center gap-2 text-sm text-gray-600">
            <CalendarDays size={18} aria-hidden="true" />
            <p>{tanggal}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
