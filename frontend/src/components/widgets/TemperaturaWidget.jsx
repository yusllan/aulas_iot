import React, { useEffect, useState } from "react";
import styles from "./TemperaturaWidget.module.css";
import { api } from "../../services/api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`${styles.tooltip} ${
          darkMode ? styles.darkTooltip : styles.lightTooltip
        }`}
      >
        <p>{`Fecha: ${label}`}</p>
        <p>{`Temperatura: ${payload[0].value}°C`}</p>
      </div>
    );
  }
  return null;
};

const TemperaturaWidget = ({ darkMode }) => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemperatura = async () => {
      try {
        const result = await api.temperatura.getAll();
        // Formatear datos para el gráfico
        const mapped = result.data.map((d) => {
          const fechaObj = new Date(d.fecha);
          return {
            fecha: fechaObj.toISOString(),
            valor: d.valor,
            fullDate: fechaObj,
          };
        });

        mapped.sort((a, b) => a.fullDate - b.fullDate);
        setDatos(mapped);
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemperatura();

    const interval = setInterval(fetchTemperatura, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`${styles.widget} ${darkMode ? styles.dark : styles.light}`}
    >
      <h3>
        <DeviceThermostatIcon color="primary" sx={{ fontSize: 40 }} />{" "}
        Temperatura (°C)
      </h3>

      {loading ? (
        <div className={styles.loading}>Cargando datos...</div>
      ) : datos.length === 0 ? (
        <div className={styles.noData}>No hay datos disponibles</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={datos}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#4a4a6a" : "#e2e8f0"}
            />
            <XAxis
              dataKey="fecha"
              tickFormatter={formatXAxis}
              stroke={darkMode ? "#00b4d8" : "#2d3748"}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke={darkMode ? "#00b4d8" : "#2d3748"}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="#00b4d8"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6, fill: "#00b4d8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TemperaturaWidget;
