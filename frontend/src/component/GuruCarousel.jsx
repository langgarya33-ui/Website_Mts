import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import GuruCard from "./GuruCard";
import { guru } from "../data/guru";

export default function GuruCarousel() {
  const listRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  function getScrollStep() {
    const list = listRef.current;
    const firstCard = list?.firstElementChild;
    if (!list || !firstCard) return 320;
    const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  }

  function scrollList(direction) {
    listRef.current?.scrollBy({ left: direction * getScrollStep(), behavior: "smooth" });
  }

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = window.setInterval(() => {
      const list = listRef.current;
      if (!list || list.scrollWidth <= list.clientWidth) return;
      const atEnd = list.scrollLeft + list.clientWidth >= list.scrollWidth - 8;
      if (atEnd) list.scrollTo({ left: 0, behavior: "smooth" });
      else list.scrollBy({ left: getScrollStep(), behavior: "smooth" });
    }, 10000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="w-full bg-secondary px-4 py-14 md:px-8 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-7 text-center">
          <p className="font-sans text-sm font-semibold uppercase tracking-wide text-primary">Tenaga Pendidik</p>
          <h2 className="mt-1 font-sans text-2xl font-bold text-gray-900 md:text-4xl">Guru MTs An-Nur</h2>
        </div>

        <div
          className="relative flex items-center gap-2 md:gap-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
          }}
        >
          <button type="button" onClick={() => scrollList(-1)} aria-label="Guru sebelumnya" className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-800 transition hover:bg-white hover:shadow-md">
            <ChevronLeft size={26} strokeWidth={1.8} />
          </button>

          <div ref={listRef} className="flex min-w-0 flex-1 snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6">
            {guru.map((item, index) => (
              <div key={`${item.nama}-${index}`} className="h-[240px] w-[82%] flex-none snap-start sm:w-[280px] md:w-[300px]">
                <GuruCard variant="carousel" foto={item.foto} nama={item.nama} jabatan={item.jabatan} />
              </div>
            ))}
          </div>

          <button type="button" onClick={() => scrollList(1)} aria-label="Guru berikutnya" className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-800 transition hover:bg-white hover:shadow-md">
            <ChevronRight size={26} strokeWidth={1.8} />
          </button>
        </div>

        <Link to="/guru-karyawan" className="mx-auto mt-5 flex h-11 w-fit items-center justify-center rounded-full border border-primary px-7 font-semibold text-primary transition hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-lg">
          Lihat Semua Guru & Karyawan
        </Link>
      </div>
    </section>
  );
}
