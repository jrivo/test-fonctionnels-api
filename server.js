const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

var corsOptions = {
  origin: "http://localhost:5000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "test fonctionnels" });
});
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/post.routes")(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
