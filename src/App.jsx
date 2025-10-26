import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import CyberSecurity from "./pages/CyberSecurity.jsx";

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Neofound</h1>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/security">Cybersecurity</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/security" element={<CyberSecurity />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer>
        <small>© {new Date().getFullYear()} Neofound</small>
      </footer>
    </div>
  );
}
