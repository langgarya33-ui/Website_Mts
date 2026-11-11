export default function GuruCard({ foto, nama, jabatan }) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)]">
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
