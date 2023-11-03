export const isAdmin =(req, res, next) => {
    console.log(req.user);
    if (req.user?.role === "admin") {
      console.log("Rol administrador");
      return next();
    }
    return res.status(401).render("error", {
      errorMessage:
        "Error de autorización. No tienes permiso para acceder al recurso solicitado",
    });
  }