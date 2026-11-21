import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// foto: [{ src, judul }]
export default function FotoSlider({ foto }) {
  const [index, setIndex] = useState(0);
  const mulaiX = useRef(null);
  const total = foto.length;

  const ke = (n) => setIndex((n + total) % total);

  const onTouchStart = (e) => {
    mulaiX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (mulaiX.current === null) return;
    const selisih = e.changedTouches[0].clientX - mulaiX.current;
    if (Math.abs(selisih) > 50) ke(index + (selisih < 0 ? 1 : -1));
    mulaiX.current = null;
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") ke(index - 1);
    if (e.key === "ArrowRight") ke(index + 1);
  };

  const tombol =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition hover:bg-white hover:cursor-pointer md:h-12 md:w-12";

  return (
    <div
      className="mx-auto mb-8 w-full max-w-md"
      role="region"
      aria-roledescription="carousel"
      aria-label="Brosur penerimaan murid baru"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="relative">
        <div
          className="overflow-hidden rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {foto.map((f, i) => (
              <a
                key={f.src}
                href={f.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={i !== index}
                tabIndex={i === index ? 0 : -1}
                aria-label={`${f.judul}: lihat ukuran penuh`}
                className="block aspect-[9/17] w-full shrink-0 bg-white"
              >
                <img
                  src={f.src}
                  alt={f.judul}
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable="false"
                  className="h-full w-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => ke(index - 1)}
          aria-label="Foto sebelumnya"
          className={`${tombol} left-2`}
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => ke(index + 1)}
          aria-label="Foto berikutnya"
          className={`${tombol} right-2`}
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </div>

      <p className="mt-3 font-sans text-sm font-semibold text-gray-800">
        {foto[index].judul}
      </p>

      <div className="mt-2 flex items-center justify-center gap-2">
        {foto.map((f, i) => (
          <button
            key={f.src}
            type="button"
            onClick={() => ke(i)}
            aria-label={`Ke foto ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all duration-300 hover:cursor-pointer ${
              i === index ? "w-6 bg-primary" : "w-2.5 bg-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="mt-2 font-sans text-xs text-gray-500">
        {index + 1} / {total} · Klik gambar untuk melihat ukuran penuh
      </p>
    </div>
  );
}