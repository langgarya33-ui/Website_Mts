
import { useEffect, useRef, useState } from "react"
import useFadeIn from "../utility/FadeIn";
import foto_guru3 from "../assets/image/foto_guru3.jpeg";
import Grad_img from "../assets/image/graduation-cap-svgrepo-com.svg";
import Stud_img from "../assets/image/student-svgrepo-com.svg";
import Sport_img from "../assets/image/sports-svgrepo-com.svg";
import brosur_img from "../assets/image/brosur_contoh.jpeg"
import BeritaCarousel from "../component/BeritaCarousel";
import KegiatanCard from "../component/KegiatanCard";
import KegiatanCarousel from "../component/KegiatanCarousel";
function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);


  // Jalankan animasi saat statistik terlihat
  useEffect(() => {
    const element = countRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Animasi angka
  useEffect(() => {
    if (!isVisible) return;

    let animationFrame;
    let startTime = null;

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      // Efek melambat menjelang angka target
      const easeOut = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={countRef}>
      {count.toLocaleString("id-ID")}+
    </span>
  );
}

export default function Home() {
   const [sectionRef, visible] = useFadeIn();
  return (
    <>
    <section className="relative isolate flex min-h-[95vh] w-full flex-col justify-between gap-10 overflow-hidden px-5  sm:px-8 sm:pb-10 sm:mt-10 md:px-12 lg:px-16" id='home'>
      <img
        src={foto_guru3}
        alt="Foto guru MTs An-Nur Klapanunggal"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />


      <div className="absolute inset-0 -z-10 bg-linear-to from-black/50 via-primary/20 to-transparent" />
      <div className="relative z-10 flex w-full flex-col items-start gap-5 sm:gap-6 md:mt-10 lg:mt-14">

        <div className="flex w-full max-w-4xl flex-col items-start gap-3">
          <h1 className="max-w-full text-3xl mt-25 font-bold tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl">
            MTS AN-NUR KLAPANUNGGAL
          </h1>

          <p className="max-w-2xl text-sm font-semibold leading-relaxed text-white/90 sm:text-base md:text-lg">
            Mewujudkan generasi cerdas berakhlak mulia,
            kompetitif, dan berlandaskan nilai-nilai Islam.
          </p>
        </div>

        <button
          type="button"
          className="min-h-12 w-full max-w-44 rounded-xl border border-black/20 bg-primary px-5 py-3 font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] active:translate-y-0 active:shadow-sm"
        >
          DAFTAR SPMB
        </button>
      </div>

      {/* Statistics glass card */}
      <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 divide-y divide-white/60 rounded-2xl border border-white/30 bg-primary p-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:p-4 md:p-5">

        {/* Siswa Aktif */}
        <div className="flex items-center justify-center gap-4 px-3 py-5 sm:gap-3 sm:px-2 md:gap-4 md:px-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30 bg-secondary sm:h-12 sm:w-12 md:h-14 md:w-14">
            <img
              src={Stud_img}
              alt=""
              className="h-9 w-9 sm:h-7 sm:w-7 md:h-9 md:w-9"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold text-white md:text-3xl">
              <CountUp end={1000} />
            </h2>
            <p className="text-sm font-medium text-white/80 md:text-base">
              Siswa Aktif
            </p>
          </div>
        </div>

        {/* Lulusan */}
        <div className="flex items-center justify-center gap-4 px-3 py-5 sm:gap-3 sm:px-2 md:gap-4 md:px-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30 bg-secondary sm:h-12 sm:w-12 md:h-14 md:w-14">
            <img
              src={Grad_img}
              alt=""
              className="h-9 w-9 sm:h-7 sm:w-7 md:h-9 md:w-9"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold text-white md:text-3xl">
              <CountUp end={5000} />
            </h2>
            <p className="text-sm font-medium text-white/80 md:text-base">
              Lulusan
            </p>
          </div>
        </div>

        {/* Ekstrakurikuler */}
        <div className="flex items-center justify-center gap-4 px-3 py-5 sm:gap-3 sm:px-2 md:gap-4 md:px-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30 bg-secondary sm:h-12 sm:w-12 md:h-14 md:w-14">
            <img
              src={Sport_img}
              alt=""
              className="h-9 w-9 sm:h-7 sm:w-7 md:h-9 md:w-9"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold text-white md:text-3xl">
              <CountUp end={12} />
            </h2>
            <p className="text-sm font-medium text-white/80 md:text-base">
              Ekstrakurikuler
            </p>
          </div>
        </div>
      </div>
    </section>
    <section ref = {sectionRef} className={`w-full min-h-[90vh] flex flex-col gap-5 justify-center items-center mt-20  md:flex-row fade-in-section ${visible ? "visible":""}`}>
    <div className="w-[90%]  h-full flex justify-center items-start   md:w-[35%] md:mt-0 ">
      <img
        src={brosur_img}
        alt="Brosur PPDB MTs An-Nur Klapanunggal"
        className="w-full h-full  rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1"
      />
    </div>
      <div className="flex flex-col items-start justify-start  w-[90%] h-[60%] pb-4  md:w-[30%] md:ml-6">
        <p className="font-bold text-md text-primary font-sans">MTS AN-NUR KLAPANUNGGAL</p>
        <p className="font-bold text-2md font-sans">BERDISKUSI, BERSIH, DISIPLIN, KUALITATIF, DAN BERPRESTASI</p>
        <p className="text-justify font-sans text-sm mt-3">MTs An-Nur Klapanunggal hadir sebagai institusi pendidikan Islami yang berkomitmen mendampingi setiap siswa untuk bertumbuh menjadi generasi yang berkarakter mulia dan berwawasan luas. Berlandaskan pada nilai utama BERDISKUSI, BERSIH, DISIPLIN, KUALITATIF, dan BERPRESTASI, madrasah ini mengedepankan lingkungan belajar yang interaktif, nyaman, dan teratur untuk membentuk kebiasaan positif pada setiap peserta didiknya. Melalui pendekatan pendidikan yang kualitatif dan seimbang antara ilmu pengetahuan serta nilai-nilai agama, MTs An-Nur terus mendorong siswanya untuk mengoptimalkan potensi diri sehingga siap mencetak lulusan unggul yang tangguh dan mampu meraih prestasi gemilang di masa depan.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-8">
          <div className="flex items-start gap-2">
            <span className="shrink-0 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#168653] text-xs font-bold text-white">✓</span>
            <p>Akreditasi</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="shrink-0 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#168653] text-xs font-bold text-white">✓</span>
            <p>Demo</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="shrink-0 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#168653] text-xs font-bold text-white">✓</span>
            <p>Demo</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="shrink-0 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#168653] text-xs font-bold text-white">✓</span>
            <p>Demo</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="shrink-0 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#168653] text-xs font-bold text-white">✓</span>
            <p>Demo</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="shrink-0 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#168653] text-xs font-bold text-white">✓</span>
            <p>Ekstrakurikuler Beragam</p>
          </div>
        </div>
      </div>  
    </section>
    <BeritaCarousel/>
    <KegiatanCarousel/>
    </>
  );
}
