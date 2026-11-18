import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-[90%] max-w-xl flex-col items-center justify-center gap-4 pt-28 text-center">
      <p className="font-sans text-7xl font-extrabold text-primary md:text-8xl">
        404
      </p>
      <h1 className="font-sans text-2xl font-bold md:text-3xl">
        Halaman Tidak Ditemukan
      </h1>
      <p className="font-sans text-sm text-gray-600 md:text-base">
        Alamat yang kamu buka tidak tersedia atau sudah dipindahkan. Silakan
        kembali ke beranda atau gunakan menu di atas.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-green-800"
        >
          <Home size={18} aria-hidden="true" />
          Ke Beranda
        </Link>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 font-sans text-sm font-semibold text-primary transition hover:bg-primary/10 hover:cursor-pointer"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Halaman Sebelumnya
        </button>
      </div>
    </section>
  );
}
