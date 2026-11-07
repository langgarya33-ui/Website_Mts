
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from '../assets/image/logo_mts.png'
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `block rounded px-3 py-2 md:p-0 transition-colors ${
      isActive
        ? "text-primary font-semibold"
        : "text-gray-700 hover:text-primary"
    }`;

  return (
    <nav className="fixed top-0 z-20 w-full border-b border-gray-200 bg-white ">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-2">
        <Link to="/" className="flex items-center gap-3">
          <img
            src = {Logo}
            className="h-10"
            alt="Logo MTs"
          />
          <span className="self-center whitespace-nowrap text-xl font-bold text-primary font-sans">
            MTs An-Nur Klapanunggal
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          aria-label="Buka menu navigasi"
          aria-expanded={isMenuOpen}
        >
          <svg className="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m6 6 12 12M18 6 6 18"
              />
            ) : (
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            )}
          </svg>
        </button>

        {/* Menu navigasi */}
        <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="mt-4 flex flex-col gap-2 rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:items-center md:gap-8 md:border-0 md:bg-white md:p-0">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Beranda
              </NavLink>
            </li>
  {/* Dropdown */}
            <li className="relative">
              <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex w-full items-center justify-between gap-2 rounded px-3 py-2 text-gray-700 hover:text-green-700 hover:cursor-pointer md:w-auto md:p-0"aria-expanded={isDropdownOpen}>
                Profil
                <svg className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} aria-hidden="true" viewBox="0 0 20 20" fill="none">
                  <path
                    d="m5 7 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <ul className="mt-2 space-y-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg md:absolute md:left-0 md:top-full md:mt-3 md:w-48">
                  <li>
                    <Link
                      to="/guru"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-green-700"
                    >
                      Visi & Misi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/fasilitas"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-green-700"
                    >
                      Fasilitas
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/berita"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-green-700"
                    >
                      Berita
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/profil" className={navLinkClass}>
                Profil
              </NavLink>
            </li>

          
            <li>
              <NavLink to="/kontak" className={navLinkClass}>
                Kontak
              </NavLink>
            </li>

            <li>
              <Link
                to="/admin"
                className="block rounded-lg bg-primary px-4 py-2 text-center text-white font-semibold transition hover:bg-green-800"
              >
                SPMB
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
