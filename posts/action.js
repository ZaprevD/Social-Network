
const { Post } = require("../models");
const post = require("../dbModels/post");
const user = require("../dbModels/user");


getPostsForSpecificUser = async (req, res) => {
    try {
        const posts = await post.findAll({
            where: {
                userId: req.params.id
            }
        })
        let clearPosts = posts.map(el => {
            return new Post(el.dataValues.PostId, el.dataValues.Text, el.dataValues.Created_On,
                el.dataValues.Likes, el.dataValues.userId);
        })
        res.status(200).json(clearPosts);
    } catch (error) {
        console.log(error);
    }
}


getAllPosts = async (req, res) => {
    try {
        let resolvedData;
        post.belongsTo(user)
        await post.findAll({
            include: [{ model: user, required: true }], order: [
                ['created_On', 'DESC']
            ]
        },
            { raw: true }).then(res => {
                let clearData = JSON.stringify(res)
                resolvedData = JSON.parse(clearData).map(element => {
                    return new Post(element.PostId, element.Text, element.Created_On,
                        element.Likes, element.userId, element.user.First_Name, element.user.Last_Name,
                        element.user.Email, element.user.Image);
                })
            }).error((error) => {
                console.log("error : " + error)
            });
        res.status(200).send(resolvedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

postStatus = async (req, res) => {
    try {
        let txt = req.body.Text;
        let id = req.body.userId;
        await post.create({
            Text: txt,
            userId: id
        }).then(result => {
            res.status(200).send("Posted!")
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

deletePost = async (req, res) => {
    try {
        const id = req.params.postId;
        post.destroy({
            where: {
                PostId: id
            }
        }).then(result => {
            res.status(200).send("Post Deleted!");
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { deletePost, postStatus, getAllPosts, getPostsForSpecificUser }