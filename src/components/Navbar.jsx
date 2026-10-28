import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const MENU_CATEGORIES = [
  {
    title: "Macroeconomía",
    items: [
      { path: "/inflacion", label: "Inflación (IPC INDEC)", desc: "Precios al consumidor y variaciones" },
      { path: "/actividad", label: "Actividad Económica (EMAE)", desc: "Indicador mensual de producción" },
      { path: "/ipim", label: "Precios Mayoristas (IPIM)", desc: "Índice de Precios Internos al Mayorista" },
      { path: "/consumo", label: "Consumo Masivo", desc: "Ventas en supermercados y comercio" },
      { path: "/estructura", label: "Estructura Productiva", desc: "Composición sectorial del PBI" },
    ],
  },
  {
    title: "Finanzas & Dólar",
    items: [
      { path: "/tipo-cambio", label: "Tipo de Cambio (Dólar)", desc: "Oficial, MEP, CCL, Blue y Brecha" },
      { path: "/monetaria", label: "Agregados Monetarios", desc: "Base monetaria, pasivos BCRA y tasas" },
    ],
  },
  {
    title: "Sector Externo",
    items: [
      { path: "/sector-externo", label: "Sector Externo & Reservas", desc: "Balanza de pagos y reservas BCRA" },
      { path: "/comercio-exterior", label: "Comercio Exterior", desc: "Exportaciones e importaciones (ICA)" },
    ],
  },
  {
    title: "Análisis & IA",
    items: [
      { path: "/ecomics", label: "Ecomics (IA Macro)", desc: "Análisis inteligente asistido por GPT" },
      { path: "/internacional", label: "Economía Internacional", desc: "Banco Mundial y contexto regional" },
      { path: "/ciclo-economico", label: "Ciclo Económico", desc: "Fases y punto del ciclo" },
    ],
  },
];

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MACRO <span className="navbar-logo-badge">PRO</span>
        </Link>

        <button
          type="button"
          className="navbar-menu-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="navbar-links"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            setActiveDropdown(null);
          }}
        >
          <span aria-hidden="true">{mobileMenuOpen ? "✕" : "☰"}</span>
          {mobileMenuOpen ? "Cerrar" : "Menú"}
        </button>

        <div id="navbar-links" className={`navbar-links${mobileMenuOpen ? " mobile-open" : ""}`}
          onClick={(e) => {
            if (e.target.closest("a")) {
              setMobileMenuOpen(false);
              setActiveDropdown(null);
            }
          }}
        >
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Inicio
          </NavLink>

          {MENU_CATEGORIES.map((cat, idx) => {
            const isOpen = activeDropdown === idx;
            return (
              <div
                key={cat.title}
                className={`nav-dropdown ${isOpen ? "open" : ""}`}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse" && window.matchMedia("(min-width: 1101px)").matches) setActiveDropdown(idx);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse" && window.matchMedia("(min-width: 1101px)").matches) setActiveDropdown(null);
                }}
              >
                <button
                  type="button"
                  className="nav-dropdown-btn"
                  aria-expanded={isOpen}
                  aria-controls={`nav-category-${idx}`}
                  onClick={() => setActiveDropdown(isOpen ? null : idx)}
                >
                  {cat.title} <span className="arrow">▾</span>
                </button>

                {isOpen && (
                  <div id={`nav-category-${idx}`} className="nav-dropdown-menu">
                    {cat.items.map((item) => (
                      <Link key={item.path} to={item.path} className="nav-dropdown-item">
                        <strong>{item.label}</strong>
                        <small>{item.desc}</small>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Sobre mí
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Contacto
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
