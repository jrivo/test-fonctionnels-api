const controller = require("../controllers/post.controller");
const { authJwt } = require("../middleware");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/posts", controller.getAll);
  app.get("/posts/:id", controller.getById);
  app.post("/posts", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
  app.put(
    "/posts/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );
  app.delete(
    "/posts/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
