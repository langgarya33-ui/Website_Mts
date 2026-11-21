export default function GuruCard({ foto, nama, jabatan, variant = "default" }) {
  if (variant === "carousel") {
    return (
      <article className="group flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white px-5 py-6 text-center shadow-[0_3px_14px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_16px_34px_rgba(15,23,42,0.16)]">
        <div className="mb-4 h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-[0_4px_18px_rgba(15,23,42,0.22)] transition-transform duration-300 group-hover:scale-105">
          <img src={foto} alt={nama} className="h-full w-full object-cover object-top" />
        </div>
        <h3 className="line-clamp-2 font-sans text-base font-bold text-gray-800 md:text-lg">{nama}</h3>
        <p className="mt-2 line-clamp-2 font-sans text-sm text-gray-500">{jabatan}</p>
      </article>
    );
  }

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-xl border-2 border-black bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)]">
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={foto}
          alt={nama}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4 text-center">
        <h3 className="font-sans text-sm font-bold text-gray-800 md:text-base">
          {nama}
        </h3>
        <p className="font-sans text-xs text-primary md:text-sm">{jabatan}</p>
      </div>
    </article>
  );
}
