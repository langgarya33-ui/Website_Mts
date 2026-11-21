
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../utility/formatDate";

export default function KegiatanCard({ id, gambar, judul, tanggal, deskripsi, status_publikasi, neo = false }) {
  return (
    <Link to={id ? `/kegiatan/${id}` : "/kegiatan"} className={`group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border-2 bg-white transition-all duration-300 ease-out ${neo ? "border-[3px] border-gray-950 shadow-[3px_9px_0_rgba(22,101,52,0.72)] hover:-translate-y-1 hover:shadow-[4px_12px_0_rgba(22,101,52,0.82)]" : "border-primary shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] hover:-translate-y-2 hover:border-primary hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)]"}`}>
      {status_publikasi && <span className="absolute left-2 top-2 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">{status_publikasi === "Draft" ? "Draft" : "Sudah Publikasi"}</span>}
      <div className="h-[50%] w-full shrink-0 overflow-hidden">
        <img
          src={gambar}
          alt={judul}
          className="h-full w-full rounded-t-xl object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-sans line-clamp-2 text-base font-bold text-gray-800 md:text-lg">
          {judul}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={17} className="shrink-0 text-primary" />
          <p className="font-sans text-primary">{formatDate(tanggal)}</p>
        </div>

        <p className="font-sans line-clamp-3 text-sm leading-relaxed text-gray-600">
          {deskripsi}
        </p>
      </div>
    </Link>
  );
}
