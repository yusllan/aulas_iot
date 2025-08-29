import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/user/userRouter.js";

import temperaturaRoutes from "./prueba/routes/temperaturaRoutes.js";
import humedadRoutes from "./prueba/routes/humedadRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);

app.use("/api/temperatura", temperaturaRoutes);
app.use("/api/humedad", humedadRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Algo salió mal en el servidor",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

export default app;
