let express = require("express");
let routes = express.Router();
const action = require("./action");

routes.get("/posts/all", action.getAllPosts);
routes.get("/posts/user/:id", action.getPostsForSpecificUser);
routes.post("/post/new", action.postStatus);
routes.delete("/post/:postId", action.deletePost);

module.exports = routes;