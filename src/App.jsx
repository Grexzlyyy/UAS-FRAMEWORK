import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PenumpangPage from "./pages/PenumpangPage";
import BusPage from "./pages/BusPage";
import JadwalPage from "./pages/JadwalPage";
import KategoriPage from "./pages/KategoriPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/penumpang" element={<PenumpangPage />} />
        <Route path="/bus" element={<BusPage />} />
        <Route path="/jadwal" element={<JadwalPage />} />
        <Route path="/kategori" element={<KategoriPage />} />
      </Routes>
    </Router>
  );
}

export default App;
