
import { CalendarDays } from "lucide-react";

export default function KegiatanCard({ gambar, judul, tanggal, deskripsi }) {
  return (
    <div className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)]">
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
          <p className="font-sans text-primary">{tanggal}</p>
        </div>

        <p className="font-sans line-clamp-3 text-sm leading-relaxed text-gray-600">
          {deskripsi}
        </p>
      </div>
    </div>
  );
}
