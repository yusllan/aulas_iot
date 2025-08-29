import { Router } from "express";
import UsuarioController from "../../controllers/user/userControllers.js";
import { authenticatte } from "../../middlewares/validacionRoles/authenticateMiddlewares.js";
import { authorize } from "../../middlewares/validacionRoles/rolesMiddlewares.js";
import { ROLES } from "../../middlewares/constants/roles.js";
import { PERMISOS } from "../../middlewares/constants/permissions.js";

const router = Router();

//Registrar usuario
router.post(
  "/",
  authenticatte,
  authorize({
    roles: [ROLES.INGENIERO, ROLES.DIRECTOR],
  }),
  UsuarioController.crearUsuario
);

//Actualizar datos personales
router.put(
  "/:id_usuario",
  authenticatte,
  authorize({ roles: [ROLES.INGENIERO, ROLES.DIRECTOR] })
);

//Eliminar usuario
router.delete(
  "/:id",
  authenticatte,
  authorize({
    roles: [ROLES.INGENIERO],
  }),
  UsuarioController.eliminarUsuario
);

//Cambiar contraseña (el propio usuario autenticado o un admin)
router.put(
  "/:id_usuario/password",
  authenticatte,
  UsuarioController.cambiarPassword
);

// Devuelve todos los usuarios
router.get(
  "/",
  authenticatte,
  authorize({
    roles: [ROLES.INGENIERO],
  }),
  UsuarioController.obtenerUsuarios
);

//Login
router.post("/login", UsuarioController.login);

export default router;
