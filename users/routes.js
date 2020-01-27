let express = require("express");
let routes = express.Router();
const action = require("./action");
const helper = require("../helper");

routes.get("/users", action.getAllUsers);
routes.get("/user/:userId/image", action.getImageUrl);
routes.post("/register", helper.registerValidation, action.registerUser);
routes.post("/login", action.loginUser);
routes.patch("/change/picture" , action.changePicture);


module.exports = routes;