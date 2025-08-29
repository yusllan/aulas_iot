import express from "express";
import TemperaturaController from "../controllers/temperaturaControllers.js";

const router = express.Router();

//Obtener todos los datos de temperatura
router.get("/", TemperaturaController.getTemperaturas);

//Obtener datos de temperatura por fecha
router.get("/fecha", TemperaturaController.getTemperaturaPorFecha);

//Obtener datos promedio de la fecha actual
router.get("/promedio-dia", TemperaturaController.getPromedioDia);

export default router;
