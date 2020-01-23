let express = require("express");
let routes = express.Router();
let userRoutes = require("./users/routes");
let postRoutes  = require("./posts/routes");
routes.use(userRoutes);
routes.use(postRoutes);
module.exports = routes;