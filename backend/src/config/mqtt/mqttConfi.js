import mqtt from "mqtt";
import dotenv from "dotenv";

dotenv.config();

export const mqttClient = mqtt.connect(process.env.MQTT_BROKER, {
  keepalive: 60,
  reconnectPeriod: 1000,
});

mqttClient.on("connect", () => console.log("MQTT conectado"));
mqttClient.on("reconnect", () => console.log("Reintentando conexión MQTT"));
mqttClient.on("error", (err) =>
  console.error("Error de conexión MQTT:", err.message)
);
