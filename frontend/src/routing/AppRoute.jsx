import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import VisiMisi from "../pages/VisiMisi";
import Fasilitas from "../pages/Fasilitas";
import Berita from "../pages/Berita";
import BeritaDetail from "../pages/BeritaDetail";
import ProfilSekolah from "../pages/ProfilSekolah";
import GuruKaryawan from "../pages/GuruKaryawan";
import Spmb from "../pages/Spmb";
import Kontak from "../pages/Kontak";
import Ekstrakurikuler from "../pages/Ekstrakurikuler";
import Prestasi from "../pages/Prestasi";
import Kegiatan from "../pages/Kegiatan";
import NotFound from "../pages/NotFound";
import PublicLayout from "../layout/PublicLayout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<ProfilSekolah />} />
        <Route path="/guru-karyawan" element={<GuruKaryawan />} />
        <Route path="/spmb" element={<Spmb />} />
        <Route path="/ekstrakurikuler" element={<Ekstrakurikuler />} />
        <Route path="/prestasi" element={<Prestasi />} />
        <Route path="/kegiatan" element={<Kegiatan />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/fasilitas" element={<Fasilitas />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
