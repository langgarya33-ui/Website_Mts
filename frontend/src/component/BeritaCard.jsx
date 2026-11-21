import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { formatDate } from "../utility/formatDate";

export default function BeritaCard({ id, gambar, judul, tanggal, deskripsi, status_publikasi, neo = false }) {
  return (
    <Link
      to={`/berita/${id}`}
      aria-label={`Baca berita: ${judul}`}
      className="block h-full w-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className={`group flex h-full w-full cursor-pointer flex-col gap-3 overflow-hidden rounded-xl border-2 bg-white transition-all duration-300 ease-out active:scale-[0.98] ${neo ? "border-[3px] border-gray-950 shadow-[3px_9px_0_rgba(22,101,52,0.72)] hover:-translate-y-1 hover:shadow-[4px_12px_0_rgba(22,101,52,0.82)]" : "border-primary shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] hover:-translate-y-2 hover:border-primary hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)]"}`}>
        <div className="h-[40%] w-full shrink-0">
          <img
            src={gambar}
            alt={judul}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden px-3 pb-3">
          {status_publikasi && <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">{status_publikasi === "Draft" ? "Draft" : "Sudah Publikasi"}</span>}
          <p className="line-clamp-2 w-full font-bold">{judul}</p>
          <div className="flex w-full items-center gap-2 text-sm text-gray-600">
            <CalendarDays size={18} aria-hidden="true" />
            <p>{formatDate(tanggal)}</p>
          </div>
          {deskripsi && <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">{deskripsi}</p>}
        </div>
      </div>
    </Link>
  );
}
