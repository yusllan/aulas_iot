import React from "react";
import styles from "./Landing.module.css";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import OpacityIcon from "@mui/icons-material/Opacity";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import GroupsIcon from "@mui/icons-material/Groups";
import BarChartIcon from "@mui/icons-material/BarChart";

const FeaturesSection = ({ darkMode }) => {
  const features = [
    {
      icon: <ThermostatIcon className={styles.featureIcon} />,
      title: "Monitoreo de Temperatura",
      description:
        "Control automático de la temperatura del aula para mantener condiciones óptimas de aprendizaje.",
    },
    {
      icon: <AnalyticsIcon className={styles.featureIcon} />,
      title: "Análisis de Comportamiento",
      description:
        "Monitoreo de patrones de actividad y comportamiento estudiantil para mejorar el aprendizaje.",
    },
    {
      icon: <OpacityIcon className={styles.featureIcon} />,
      title: "Control de Humedad",
      description:
        "Seguimiento en tiempo real de los niveles de humedad para un ambiente saludable.",
    },
    {
      icon: <NotificationsActiveIcon className={styles.featureIcon} />,
      title: "Alertas Inteligentes",
      description:
        "Notificaciones automáticas cuando las condiciones salen de los rangos óptimos.",
    },
    {
      icon: <GroupsIcon className={styles.featureIcon} />,
      title: "Detección de Asistencia",
      description:
        "Registro automático de la presencia de estudiantes usando sensores IoT avanzados.",
    },
    {
      icon: <BarChartIcon className={styles.featureIcon} />,
      title: "Reportes y Analytics",
      description:
        "Análisis detallado de datos históricos para tomar decisiones informadas.",
    },
  ];

  return (
    <section
      className={`${styles.featuresSection} ${darkMode ? styles.dark : ""}`}
      id="caracteristicas"
    >
      <div className={styles.featuresContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Características Principales</h2>
          <p className={styles.sectionSubtitle}>
            Nuestro sistema IoT ofrece un conjunto completo de herramientas para
            optimizar el ambiente educativo y mejorar la experiencia de
            aprendizaje.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.featureCard} ${darkMode ? styles.dark : ""}`}
            >
              <div className={styles.featureIconContainer}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
