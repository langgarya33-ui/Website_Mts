import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import PageHeader from "../component/PageHeader";
import BeritaCard from "../component/BeritaCard";
import berita from "../data/berita";
import ContentDetail from "./ContentDetail";

export default function BeritaDetail() {
  const { id } = useParams();
  if (/^\d+$/.test(id)) return <ContentDetail tipe="berita" />;
  const item = berita.find((b) => b.id === id);

  if (!item) {
    return (
      <>
        <PageHeader
          judul="Berita Tidak Ditemukan"
          deskripsi="Berita yang kamu cari tidak tersedia atau sudah dihapus."
        />
        <div className="mx-auto w-[90%] max-w-3xl py-16 text-center">
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-green-800"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Kembali ke Berita
          </Link>
        </div>
      </>
    );
  }

  const lainnya = berita.filter((b) => b.id !== item.id).slice(0, 3);

  return (
    <>
      <PageHeader
        judul="Detail Berita"
        deskripsi="Informasi dan kabar terbaru dari MTs An-Nur Klapanunggal."
      />

      <div className="mx-auto w-[90%] max-w-3xl py-12 md:py-16">
        <Link
          to="/berita"
          className="mb-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary transition hover:text-green-800"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Kembali ke Berita
        </Link>

        <article>
          <h2 className="font-sans text-2xl font-bold leading-snug md:text-4xl">
            {item.judul}
          </h2>
          <p className="mt-3 flex items-center gap-2 font-sans text-sm text-gray-600">
            <CalendarDays size={18} aria-hidden="true" />
            {item.tanggal}
          </p>

          <img
            src={item.gambar}
            alt={item.judul}
            className="mt-6 max-h-[28rem] w-full rounded-xl border-2 border-black object-cover"
          />

          <div className="mt-8 flex flex-col gap-5">
            {item.isi.map((paragraf, i) => (
              <p
                key={i}
                className="text-justify font-sans text-base leading-relaxed text-gray-700"
              >
                {paragraf}
              </p>
            ))}
          </div>
        </article>
      </div>

      {lainnya.length > 0 && (
        <section className="mx-auto w-[90%] max-w-5xl pb-12 md:pb-16">
          <h2 className="mb-8 text-center font-sans text-2xl font-bold md:text-3xl">
            Berita Lainnya
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lainnya.map((b) => (
              <div key={b.id} className="h-80">
                <BeritaCard
                  id={b.id}
                  gambar={b.gambar}
                  judul={b.judul}
                  tanggal={b.tanggal}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
