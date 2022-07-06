const controller = require("../controllers/category.controller");
const { authJwt } = require("../middleware");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/categories", controller.getAll);
  app.get("/categories/:id", controller.getById);
  app.post(
    "/categories",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );
  app.put(
    "/places/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );
  app.delete(
    "/places/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
