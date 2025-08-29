import React from "react";
import styles from "./Dashboard.module.css";
import HumedadWidget from "../../components/widgets/HumedadWidget";
import TemperaturaWidget from "../../components/widgets/TemperaturaWidget";

const DashboardWidgets = ({ darkMode, activeView }) => {
  return (
    <div className={styles.widgetsContainer}>
      <HumedadWidget darkMode={darkMode} />
      <TemperaturaWidget darkMode={darkMode} />
    </div>
  );
};

export default DashboardWidgets;
