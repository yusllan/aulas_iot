import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";

const Landing = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // cargar preferencia de tema
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "false";
    setDarkMode(savedDarkMode);
    document.body.setAttribute("data-theme", savedDarkMode ? "dark" : "");
  }, []);

  // guardar preferencia de tema
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.setAttribute("data-theme", darkMode ? "dark" : "");
  }, [darkMode]);

  const handleLoginRedirect = () => navigate("/login");
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`${styles.landingContainer} ${darkMode ? styles.dark : ""}`}
      id="inicio"
    >
      <Header
        onLoginClick={handleLoginRedirect}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <HeroSection darkMode={darkMode} onLoginClick={handleLoginRedirect} />
      <FeaturesSection darkMode={darkMode} />
      <CTASection onLoginClick={handleLoginRedirect} darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Landing;
