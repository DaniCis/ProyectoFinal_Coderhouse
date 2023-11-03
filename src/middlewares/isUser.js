export const isUser =(req, res, next) =>{
    console.log(req.user);
    if (req.user?.role === "user") {
      console.log("Rol usuario");
      return next();
    }
    return res.status(401).render("error", {
      message:
        "Error de autorización. No tienes permiso para acceder al recurso solicitado",
    });
}