export const authorize =
  ({ roles = [], permisos = [] } = {}) =>
  (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "No autenticado" });

    // Normalizar roles del usuario: si es objeto, tomar nombre_role
    const userRoles = new Set(
      (req.user.roles || []).map((r) =>
        typeof r === "string" ? r : r.nombre_role
      )
    );

    // Normalizar permisos del usuario: si es objeto, tomar nombre_permiso
    const userPerms = new Set(
      (req.user.permisos || []).map((p) =>
        typeof p === "string" ? p : p.nombre_permiso
      )
    );

    // Validar roles
    if (roles.length > 0) {
      const okRol = roles.some((r) => userRoles.has(r));
      if (!okRol) return res.status(403).json({ message: "Rol insuficiente" });
    }

    // Validar permisos
    if (permisos.length > 0) {
      const okPerms = permisos.every((p) => userPerms.has(p));
      if (!okPerms)
        return res.status(403).json({ message: "Permiso insuficiente" });
    }

    next();
  };
