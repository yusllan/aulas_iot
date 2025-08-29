import app from "./app.js";
import dotenv from "dotenv";
import "./prueba/mqtt/mqtt.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
