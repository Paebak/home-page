import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import Homelab from "./pages/Homelab.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/homelab" element={<Homelab />} />
      </Routes>
    </BrowserRouter>
  );
}
