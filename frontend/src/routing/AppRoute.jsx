import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import VisiMisi from "../pages/VisiMisi";
import Fasilitas from "../pages/Fasilitas";
import Berita from "../pages/Berita";
import ProfilSekolah from "../pages/ProfilSekolah";
import GuruKaryawan from "../pages/GuruKaryawan";
import PublicLayout from "../layout/PublicLayout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<ProfilSekolah />} />
        <Route path="/guru-karyawan" element={<GuruKaryawan />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/fasilitas" element={<Fasilitas />} />
        <Route path="/berita" element={<Berita />} />
      </Route>
    </Routes>
  );
}
