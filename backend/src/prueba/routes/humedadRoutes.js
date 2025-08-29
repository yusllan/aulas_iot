import express from "express";
import HumedadController from "../controllers/humedadControllers.js";

const router = express.Router();
//obtener todos los datos de humedad
router.get("/", HumedadController.getHumedad);

//obtener datos de humedad por fecha
router.get("/fecha", HumedadController.getHumedadPorFecha);

//Obtener datos promedio de la fecha actual
router.get("/promedio-dia", HumedadController.getPromedioHoy);

export default router;
