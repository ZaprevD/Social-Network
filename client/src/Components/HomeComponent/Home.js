import React, { Component } from "react";
import "./home.css";
import Post from "../PostComponent/Post";
import jwt_decode from "jwt-decode";
import { getAllPosts } from "../userFunctions";
import { postStatus } from "../userFunctions";
import { deletePost } from "../userFunctions";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            newPostText: "",
            userId: ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.newPost = this.newPost.bind(this);
    }

    async  componentDidMount() {
        let token = localStorage.token;
        let decoded = jwt_decode(token);
        let posts = await getAllPosts();
        this.setState({ posts: posts.reverse() })
        this.setState({ userId: decoded.currentUser.Id })

    }
    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    newPost = async () => {
        let txt = this.state.newPostText;
        let token = localStorage.token;
        let decoded = jwt_decode(token);
        if (txt.length > 2) {
            await postStatus(txt, decoded.currentUser.Id);
        } else {
            console.log("ERRROR");
        }
    }

    render() {
        let orderPosts = this.state.posts;
        if (localStorage.token) {
            if (orderPosts.length > 0) {
                return (
                    <div className="container">
                        <form onSubmit={this.newPost}>
                            <div className="new-post">
                                <p style={{ textAlign: "center" }}>What is on your mind?</p>
                                <input type="textarea" name="newPostText" onChange={this.onChangeHandler} />
                                <button type="submit">Post</button>
                            </div>
                        </form>
                        <div className="all-posts">
                            {orderPosts.map(element => {
                                return <Post key={element.postId} deleted={() => deletePost(element.postId)}
                                    btnName={element.userId === this.state.userId ? "Delete" : "Report"}
                                    fullName={element.First_Name + " " + element.Last_Name}
                                    imgUrl={element.imageUrl}
                                    likes={element.Likes} date={element.created_On} post={element.Text} />
                            })}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="container">
                        <h1>Not posts yet</h1>
                        <form onSubmit={this.newPost}>
                            <div className="new-post">
                                <p style={{ textAlign: "center" }}>What is in your mind?</p>
                                <input type="textarea" name="newPostText" onChange={this.onChangeHandler} />
                                <button type="submit">Post</button>
                            </div>
                        </form>
                    </div>
                )
            }
        } else {
            window.location.href = "/";
        }
    }
}

export default Home;