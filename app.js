const express = require("express");
require("dotenv").config();
const router = require("./router");
const bodyParser = require("body-parser");
const jwt = require("express-jwt");
const middlewares = require("./middlewares/common");
const app = express();

const publicPaths = ["/login", "/register"];
app.use(jwt({ secret: process.env.SECRET }).unless({ path: publicPaths }));
app.use(middlewares.logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(middlewares.wrongRoute);
app.use(middlewares.errorHandler);


let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serves is listening to port ${port}`);
})