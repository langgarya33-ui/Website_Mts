import { CalendarDays, User } from "lucide-react";

const label = {
  olahraga: "Olahraga",
  seni: "Seni",
  keagamaan: "Keagamaan",
  akademik: "Akademik",
};

export default function EkskulCard({ foto, nama, kategori, deskripsi, jadwal, pembina }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border-2 border-black bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={foto}
          alt={`Ekstrakurikuler ${nama}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 font-sans text-xs font-semibold text-white">
          {label[kategori] ?? kategori}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-sans text-lg font-bold text-gray-800">{nama}</h3>
        <p className="font-sans text-sm leading-relaxed text-gray-600">
          {deskripsi}
        </p>
        <ul className="mt-auto flex flex-col gap-1.5 border-t border-gray-100 pt-3 font-sans text-xs text-gray-600 md:text-sm">
          <li className="flex items-center gap-2">
            <CalendarDays size={16} className="shrink-0 text-primary" aria-hidden="true" />
            {jadwal}
          </li>
          <li className="flex items-center gap-2">
            <User size={16} className="shrink-0 text-primary" aria-hidden="true" />
            {pembina}
          </li>
        </ul>
      </div>
    </article>
  );
}
