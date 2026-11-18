import { Trophy, User, CalendarDays } from "lucide-react";

const labelTingkat = {
  kecamatan: "Kecamatan",
  kabupaten: "Kabupaten",
  provinsi: "Provinsi",
  nasional: "Nasional",
};

export default function PrestasiCard({ foto, lomba, juara, tingkat, peraih, tahun }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border-2 border-black bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-black hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={foto}
          alt={`${juara} ${lomba}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 font-sans text-xs font-semibold text-white">
          {labelTingkat[tingkat] ?? tingkat}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="flex items-center gap-2 font-sans text-sm font-extrabold text-amber-600">
          <Trophy size={18} aria-hidden="true" />
          {juara}
        </p>
        <h3 className="font-sans text-base font-bold leading-snug text-gray-800 md:text-lg">
          {lomba}
        </h3>
        <ul className="mt-auto flex flex-col gap-1.5 border-t border-gray-100 pt-3 font-sans text-xs text-gray-600 md:text-sm">
          <li className="flex items-center gap-2">
            <User size={16} className="shrink-0 text-primary" aria-hidden="true" />
            {peraih}
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays size={16} className="shrink-0 text-primary" aria-hidden="true" />
            {tahun}
          </li>
        </ul>
      </div>
    </article>
  );
}
