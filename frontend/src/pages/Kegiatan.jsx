import PageHeader from "../component/PageHeader";
import KegiatanCard from "../component/KegiatanCard";
import useFadeIn from "../utility/FadeIn";
import kegiatan from "../data/kegiatan";

export default function Kegiatan() {
  const [listRef, listVisible] = useFadeIn();

  return (
    <>
      <PageHeader
        judul="Kegiatan Sekolah"
        deskripsi="Berbagai kegiatan dan aktivitas siswa di MTs An-Nur Klapanunggal."
      />

      <div className="mx-auto w-[90%] max-w-5xl py-12 md:py-16">
        <section
          ref={listRef}
          className={`fade-in-section ${listVisible ? "visible" : ""}`}
        >
          {kegiatan.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {kegiatan.map((item) => (
                <div key={item.judul} className="h-[400px] md:h-[430px]">
                  <KegiatanCard
                    gambar={item.gambar}
                    judul={item.judul}
                    tanggal={item.tanggal}
                    deskripsi={item.deskripsi}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center font-sans text-sm text-gray-500">
              Belum ada kegiatan yang ditampilkan.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
