import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import PageHeader from "../component/PageHeader";
import useFadeIn from "../utility/FadeIn";
import { kontak, sosmed } from "../data/kontak";

const ada = (v) => v && v !== "-";

const kartu =
  "rounded-xl border-2 border-black bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]";

export default function Kontak() {
  const [infoRef, infoVisible] = useFadeIn();
  const [petaRef, petaVisible] = useFadeIn();

  const info = [
    { label: "Alamat", nilai: kontak.alamat, ikon: MapPin },
    {
      label: "Telepon",
      nilai: kontak.telepon,
      ikon: Phone,
      href: ada(kontak.telepon) ? `tel:${kontak.telepon.replace(/[^\d+]/g, "")}` : null,
    },
    {
      label: "E-mail",
      nilai: kontak.email,
      ikon: Mail,
      href: ada(kontak.email) ? `mailto:${kontak.email}` : null,
    },
    { label: "Jam Layanan", nilai: `Hari: ${kontak.hari}\nJam: ${kontak.jam}`, ikon: Clock },
  ];

  return (
    <>
      <PageHeader
        judul="Kontak"
        deskripsi="Hubungi kami untuk informasi lebih lanjut."
      />

      <div className="mx-auto flex w-[90%] max-w-5xl flex-col gap-16 py-12 md:py-16">
        {/* Info kontak */}
        <section
          ref={infoRef}
          className={`fade-in-section ${infoVisible ? "visible" : ""}`}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {info.map(({ label, nilai, ikon: Ikon, href }) => (
              <div key={label} className={`${kartu} flex items-start gap-4 p-5`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Ikon size={22} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-sans text-xs text-gray-500">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="break-words font-sans text-sm font-semibold text-gray-800 hover:text-primary md:text-base"
                    >
                      {nilai}
                    </a>
                  ) : (
                   <p className="break-words whitespace-pre-line font-sans text-sm font-semibold text-gray-800 md:text-base">
                      {nilai}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {ada(kontak.whatsapp) && (
            <div className="mt-6 flex justify-center">
              <a
                href={`https://wa.me/${kontak.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-green-800"
              >
                <MessageCircle size={20} aria-hidden="true" />
                Hubungi via WhatsApp
              </a>
            </div>
          )}

          {/* Sosial media */}
          {sosmed.some((s) => s.url) && (
            <div className="mt-10 text-center">
              <p className="font-sans text-sm font-semibold text-gray-700">
                Ikuti kami
              </p>
              <ul className="mt-3 flex items-center justify-center gap-2">
                {sosmed
                  .filter((s) => s.url)
                  .map((s) => (
                    <li key={s.nama}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.nama}
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-300 hover:-translate-y-1 ${s.bg}`}
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                          <path d={s.path} />
                        </svg>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </section>

        {/* Peta */}
        <section
          ref={petaRef}
          className={`fade-in-section ${petaVisible ? "visible" : ""}`}
        >
          <h2 className="text-center font-sans text-2xl font-bold md:text-3xl">
            Lokasi Kami
          </h2>
          <div className={`${kartu} mt-8 overflow-hidden`}>
            <iframe
              title={`Peta ${kontak.nama}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(kontak.petaQuery)}&t=m&z=14&output=embed&iwloc=near`}
              className="h-80 w-full border-0 md:h-[28rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </>
  );
}
