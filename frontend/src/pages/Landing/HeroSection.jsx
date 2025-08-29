import React from "react";
import styles from "./Landing.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WifiIcon from "@mui/icons-material/Wifi";

const HeroSection = ({ darkMode, onLoginClick }) => (
  <main className={styles.heroMain}>
    <div className={styles.heroLeft}>
      <div className={`${styles.badge} ${darkMode ? styles.dark : ""}`}>
        <WifiIcon className={styles.badgeIcon} />
        Tecnología IoT Avanzada
      </div>
      <h1 className={styles.heroTitle}>
        Transforma tu
        <br />
        <span className={styles.heroHighlight}>Aula Inteligente</span>
      </h1>
      <p className={styles.heroDescription}>
        Sistema integral de monitoreo IoT que optimiza el ambiente educativo
        mediante el control automático de temperatura, humedad y análisis del
        comportamiento estudiantil en tiempo real.
      </p>
      <div className={styles.heroButtons}>
        <button className={styles.primaryButton} onClick={onLoginClick}>
          Comenzar Ahora <ArrowForwardIcon className={styles.buttonIcon} />
        </button>
        <button
          className={`${styles.secondaryButton} ${darkMode ? styles.dark : ""}`}
        >
          Ver Demo
        </button>
      </div>
      <div className={styles.metricsRow}>
        <div className={styles.metricItem}>
          <span className={styles.metricValue}>24/7</span>
          <div className={styles.metricLabel}>Monitoreo Continuo</div>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricValue}>98%</span>
          <div className={styles.metricLabel}>Precisión de Sensores</div>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricValue}>3s</span>
          <div className={styles.metricLabel}>Actualización</div>
        </div>
      </div>
    </div>

    <div className={styles.heroRight}>
      <div className={`${styles.tempBadge} ${darkMode ? styles.dark : ""}`}>
        <span className={styles.tempDot}></span>
        22.5°C - Condición Ideal
      </div>
      <div className={`${styles.statusCard} ${darkMode ? styles.dark : ""}`}>
        <div className={styles.statusIndicator}></div>
        Sistema Conectado
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.heroImg}
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80"
          alt="Aula moderna con tecnología IoT"
        />
        <div className={styles.imageOverlay}></div>
      </div>
    </div>
  </main>
);

export default HeroSection;
