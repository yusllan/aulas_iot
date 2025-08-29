import temperaturaDao from "../daos/temperaturaDao.js";
import dotenv from "dotenv";

dotenv.config();

export default class TemperaturaController {
  //Obtener todos los datos de temperatura
  static async getTemperaturas(req, res) {
    try {
      const temperatura = await temperaturaDao.showTemperatura();

      res.status(200).json(temperatura);
    } catch (err) {
      console.error("Error en obtener datos de temperatura: ", err);
      res.status(500).json({
        message: "Error al obtener datos de temperatura",
        error: err.message,
      });
    }
  }

  //Obtener los datos por fecha
  static async getTemperaturaPorFecha(req, res) {
    const { fechaInicio, fechaFin } = req.query;

    try {
      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ message: "Ambas fechas son requeridas" });
      }

      const inicio = new Date(`${fechaInicio}T00:00:00`);
      const fin = new Date(`${fechaFin}T23:59:59.999`);

      if (isNaN(inicio) || isNaN(fin)) {
        return res.status(400).json({ message: "Formato de fecha inválido" });
      }

      if (inicio > fin) {
        return res.status(400).json({
          message: "La fecha de inicio no puede ser mayor que la fecha de fin",
        });
      }

      const datos = await temperaturaDao.showTimeTemperatura(
        inicio.toISOString(),
        fin.toISOString()
      );

      res.status(200).json({
        success: true,
        data: datos,
      });
    } catch (err) {
      console.error("Error al obtener datos por fecha: ", err);
      res.status(500).json({
        message: "Error al obtener datos por rango de fecha",
        error: err.message,
      });
    }
  }

  // Obtener el promedio de temperatura del día actual
  static async getPromedioDia(req, res) {
    const { fecha } = req.query;
    try {
      if (!fecha) {
        return res.status(400).json({ message: "Ambas fechas son requeridas" });
      }

      const inicio = new Date(`${fecha}T00:00:00`);

      if (isNaN(inicio)) {
        return res.status(400).json({ message: "Formato de fecha inválido" });
      }

      const promedio = await temperaturaDao.getPromedioPorFecha(
        inicio.toISOString()
      );

      const valorSeguro =
        promedio !== null && !isNaN(promedio)
          ? parseFloat(promedio.toFixed(2))
          : 0;

      res.status(200).json({ success: true, data: valorSeguro });
    } catch (err) {
      console.error("Error al obtener promedio del día:", err);
      res.status(500).json({
        message: "Error al obtener el promedio de temperatura del día actual",
        error: err.message,
      });
    }
  }
}
