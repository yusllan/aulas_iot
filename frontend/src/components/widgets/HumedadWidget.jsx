import React, { useEffect, useState } from "react";
import styles from "./HumedadWidget.module.css";
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
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`${styles.tooltip} ${
          darkMode ? styles.darkTooltip : styles.lightTooltip
        }`}
      >
        <p>{`Fecha: ${label}`}</p>
        <p>{`Humedad: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const HumedadWidget = ({ darkMode }) => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHumedad = async () => {
      try {
        const result = await api.humedad.getAll();

        // Formatear datos para el gráfico
        const mapped = result.data.map((d) => {
          const fechaObj = new Date(d.fecha);
          return {
            fecha: fechaObj,
            valor: d.valor,
          };
        });

        mapped.sort((a, b) => a.fecha - b.fecha);
        setDatos(mapped);
      } catch (error) {
        console.error("Error fetching humidity data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHumedad();

    const interval = setInterval(fetchHumedad, 60000);
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
        <WaterDropIcon color="primary" fontSize="large" />
        Humedad Relativa (%)
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
              tickFormatter={(date) =>
                new Date(date).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              stroke={darkMode ? "#fca311" : "#2d3748"}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke={darkMode ? "#fca311" : "#2d3748"}
              tick={{ fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const fechaObj = new Date(label);
                  return (
                    <div
                      className={`${styles.tooltip} ${
                        darkMode ? styles.darkTooltip : styles.lightTooltip
                      }`}
                    >
                      <p>{`Fecha: ${fechaObj.toLocaleString("es-ES")}`}</p>
                      <p>{`Humedad: ${payload[0].value}%`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Line
              type="monotone"
              dataKey="valor"
              stroke="#fca311"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6, fill: "#fca311" }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HumedadWidget;
