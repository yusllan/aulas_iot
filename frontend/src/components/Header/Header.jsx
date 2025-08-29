import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#caracteristicas", label: "Características" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

const Header = ({ darkMode, toggleDarkMode, onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleNavClick = (event) => {
    event.preventDefault();
    setMenuOpen(false);
    const sectionId = event.currentTarget.getAttribute("href").substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        darkMode ? styles.dark : ""
      }`}
    >
      <div className={styles.headerContent}>
        <div className={styles.left}>
          <span className={styles.iconBox}>
            <SchoolIcon style={{ fontSize: 32, color: "#fff" }} />
          </span>
          <div className={styles.titleGroup}>
            <span className={styles.title}>Sistema IoT Escolar</span>
            <span className={styles.subtitle}>Monitoreo Inteligente</span>
          </div>
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <ul className={styles.navList}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a href={href} onClick={handleNavClick}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.right}>
          <button
            className={styles.themeToggle}
            onClick={toggleDarkMode}
            aria-label="Cambiar tema"
          >
            {darkMode ? (
              <Brightness7Icon style={{ fontSize: 24 }} />
            ) : (
              <Brightness4Icon style={{ fontSize: 24 }} />
            )}
          </button>

          <button className={styles.accessButton} onClick={onLoginClick}>
            Acceder al Sistema{" "}
            <ArrowForwardIcon
              style={{ fontSize: 22, color: "#fff", marginLeft: 8 }}
            />
          </button>

          <button
            ref={buttonRef}
            className={styles.menuButton}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menú"
          >
            {menuOpen ? (
              <CloseIcon style={{ fontSize: 32 }} />
            ) : (
              <MenuIcon style={{ fontSize: 32 }} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div ref={menuRef} className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <ul className={styles.mobileNavList}>
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={handleNavClick}
                    className={styles.mobileNavLink}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              className={styles.mobileAccessButton}
              onClick={onLoginClick}
            >
              Acceder al Sistema{" "}
              <ArrowForwardIcon
                style={{ fontSize: 20, color: "#fff", marginLeft: 8 }}
              />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
