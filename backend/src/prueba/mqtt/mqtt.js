import { mqttClient } from "../../config/mqtt/mqttConfi.js";
import dotenv from "dotenv";
import TemperaturaDao from "../daos/temperaturaDao.js";
import HumedadDao from "../daos/humedadDao.js";
import DispositivoDao from "../daos/dispositivoDao.js";

dotenv.config();

const TOPIC_DHT11 = process.env.MQTT_TOPIC_RECEIVE_TEMPERATURE_HUMIDITY;

// Lista de topics
const TOPICS = [TOPIC_DHT11];

// Mapeo de campo DAO
const campoDaoMap = {
  temperatura: TemperaturaDao,
  humedad: HumedadDao,
};

// Suscribirse a topics
mqttClient.on("connect", () => {
  mqttClient.subscribe(TOPICS, (err) => {
    if (err) {
      console.error("Error al suscribirse: ", err.message);
    } else {
      console.log(`Suscrito al topic: ${TOPICS.join(", ")}`);
    }
  });
});

mqttClient.on("message", async (topic, message) => {
  if (!TOPICS.includes(topic)) return;

  try {
    const payload = JSON.parse(message.toString());
    const { device, location, campo, value } = payload;

    // Validación del payload
    if (!device || !campo || typeof value !== "number") {
      console.warn("Payload inválido:", payload);
      return;
    }

    //Guardar según el campo
    // Obtener o crear dispositivo
    const dispositivoId = await DispositivoDao.getOrCreate({
      nombre: device,
      ubicacion: location || null,
    });

    //Convertir value a número
    const valueNumber = Number(value);

    // Validación del payload
    if (!device || !campo || isNaN(valueNumber)) {
      console.warn("Payload inválido:", payload);
      return;
    }

    const data = {
      dispositivo: dispositivoId,
      valor: valueNumber,
    };

    const dao = campoDaoMap[campo];
    if (!dao) {
      console.warn(`Campo no manejado: "${campo}"`);
      return;
    }

    await dao.create(data);
    console.log(`${campo} guardado desde ${topic}:`, data);
  } catch (err) {
    console.error("Error procesando mensaje MQTT: ", err.message);
  }
});
