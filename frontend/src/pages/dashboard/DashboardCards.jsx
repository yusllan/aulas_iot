import React from "react";
import styles from "./Dashboard.module.css";
import Card from "../../components/Card/Card";

const DashboardCards = ({
  loading,
  promedioHumedad,
  promedioTemperatura,
  darkMode,
}) => {
  return (
    <div className={styles.cardsContainer}>
      <Card
        title="Humedad Promedio"
        value={
          loading
            ? "Cargando..."
            : promedioHumedad !== null
            ? `${promedioHumedad}%`
            : "--"
        }
        darkMode={darkMode}
      />
      <Card
        title="Temperatura Promedio"
        value={
          loading
            ? "Cargando..."
            : promedioTemperatura !== null
            ? `${promedioTemperatura}°C`
            : "--"
        }
        darkMode={darkMode}
      />
    </div>
  );
};

export default DashboardCards;
