import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../../components/Sidebar/dashboardLogin/Sidebar";
import Navbar from "../../components/navar/Navbar";
import DashboardCards from "./DashboardCards";
import DashboardWidgets from "./DashboardWidgets";
import { api } from "../../services/api/api";
import { useAuth } from "../../context/AuthContext";
import SettingsMenu from "../../components/SettingsMenu/SettingsMenu";

import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import OpacityIcon from "@mui/icons-material/Opacity";
import SettingsIcon from "@mui/icons-material/Settings";
import SunnyIcon from "@mui/icons-material/Sunny";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const Dashboard = () => {
  const [promedioHumedad, setPromedioHumedad] = useState(null);
  const [promedioTemperatura, setPromedioTemperatura] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("dashboard"); // 👈 Vista activa
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  const titles = {
    dashboard: "Dashboard IoT de ",
    temp: "Temperatura",
    hum: "Humedad",
    cong: "Configuración",
    users: "Gestión de Usuarios",
  };

  const items = [
    { id: "dashboard", text: "Inicio", icon: <HomeIcon /> },
    { id: "temp", text: "Temperatura", icon: <ShowChartIcon /> },
    { id: "hum", text: "Humedad", icon: <OpacityIcon /> },
    { id: "cong", text: "Configuración", icon: <SettingsIcon /> },
  ];

  useEffect(() => {
    const fetchPromedios = async () => {
      try {
        setLoading(true);
        const today = new Date().toLocaleDateString("en-CA");

        const [tempResponse, humResponse] = await Promise.all([
          api.temperatura.getPromedioHoy(today),
          api.humedad.getPromedioHoy(today),
        ]);

        setPromedioTemperatura(tempResponse.data.data);
        setPromedioHumedad(humResponse.data.data);
      } catch (error) {
        console.error("Error al cargar promedios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromedios();

    const interval = setInterval(fetchPromedios, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <>
            <DashboardCards
              loading={loading}
              promedioHumedad={promedioHumedad}
              promedioTemperatura={promedioTemperatura}
              darkMode={darkMode}
            />
            <DashboardWidgets darkMode={darkMode} />
          </>
        );

      case "temp":
        return (
          <h2 className={styles.placeholder}>
            <SunnyIcon
              style={{ marginRight: "8px" }}
              sx={{ color: "rgb(193, 214, 11)" }}
              fontSize="large"
            />
            Vista de Temperatura
          </h2>
        );

      case "hum":
        return (
          <h2 className={styles.placeholder}>
            <WaterDropIcon
              fontSize="large"
              color="primary"
              style={{ marginRight: "8px" }}
            />
            Vista de Humedad
          </h2>
        );

      case "cong":
        return <SettingsMenu onViewChange={setActiveView} />;

      default:
        return (
          <h2 className={styles.placeholder}>Selecciona una opción del menú</h2>
        );
    }
  };

  return (
    <div
      className={`${styles.dashboardContainer} ${
        darkMode ? styles.dark : styles.light
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        title={
          <div>
            <div>{titles.dashboard}</div>
            <div>{user ? `${user.nombre} ${user.apellido}` : ""}</div>
          </div>
        }
        items={items}
        darkMode={darkMode}
        activeView={activeView}
        onViewChange={setActiveView}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={false} // 👈 de momento fijo
      />

      <div className={styles.mainContent}>
        <Navbar
          title={titles[activeView]}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
