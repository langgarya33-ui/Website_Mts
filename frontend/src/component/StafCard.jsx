export default function StafCard({ foto, nama, jabatan }) {
  return (
    <article className="group flex h-full flex-col items-center gap-4 rounded-2xl bg-white px-4 py-8 text-center shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)]">
      <img
        src={foto}
        alt={nama}
        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-[0_4px_12px_rgba(0,0,0,0.25)] sm:h-36 sm:w-36 md:h-40 md:w-40"
      />
      <div>
        <h3 className="font-sans text-sm font-bold text-gray-900 md:text-lg">
          {nama}
        </h3>
        <p className="mt-1 font-sans text-xs text-gray-500 md:text-sm">
          {jabatan}
        </p>
      </div>
    </article>
  );
}