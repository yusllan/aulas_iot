import React from "react";
import styles from "./Landing.module.css";

const CTASection = ({ onLoginClick, darkMode }) => {
  return (
    <section
      className={`${styles.ctaSection} ${darkMode ? styles.dark : ""}`}
      id="contacto"
    >
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>¿Listo para transformar tu aula?</h2>
        <p className={styles.ctaDescription}>
          Únete a las instituciones que ya están revolucionando la educación con
          nuestro sistema IoT inteligente.
        </p>
        <button className={styles.ctaButton} onClick={onLoginClick}>
          Acceder al Sistema
        </button>
      </div>
    </section>
  );
};

export default CTASection;
