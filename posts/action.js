const query = require("./query");
const { Post } = require("../models");


getPostsForSpecificUser = async (req, res) => {
    try {
        console.log(req)
        let data = await query.getPostsFromSpecificUserQuery(req.params.id);
        let resolvedData = data.map(element => {
            return new Post(element.PostId, element.Text, element.Created_On,
                element.Likes, element.userId);
        })
        res.status(200).send(resolvedData);
    } catch (error) {
        res.status(500).send(error.message)
    }
}


getAllPosts = async (req, res) => {
    try {
        let posts = await query.getAllPostsQuery();
        let resolvedData = posts.map(element => {
            return new Post(element.PostId, element.Text, element.Created_On,
                element.Likes, element.userId, element.First_Name, element.Last_Name, element.Email, element.Image);
        })
        res.status(200).send(resolvedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


postStatus = async (req, res) => {
    try {
        await query.postStatusQuery(req.body);
        res.status(200).send("Status posted!");
    } catch (error) {
        res.status(500).send(error.message)
    }
}


deletePost = async(req, res) => {
    try {
        await query.deletePostQuery(req.params.postId);
        res.status(200).send("Post Deleted!");
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {deletePost,postStatus,getAllPosts, getPostsForSpecificUser }