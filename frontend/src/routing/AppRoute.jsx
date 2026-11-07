import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PublicLayout from "../layout/PublicLayout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}