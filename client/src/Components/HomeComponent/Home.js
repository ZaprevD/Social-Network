import React, { Component } from "react";
import "./home.css";
import jwt_decode from "jwt-decode";
import NewPostForm from "./Partials/NewPostForm";
import AllPosts from "./Partials/AllPosts";
import { getAllPosts } from "../userFunctions";
import { postStatus } from "../userFunctions";
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
        let allPostss = this.state.posts;
        if (localStorage.token) {
            if (allPostss.length > 0) {
                return (
                    <div className="container">
                        <NewPostForm newPostEvent={this.newPost} onChangeHandler={this.onChangeHandler} />
                        <AllPosts allposts={allPostss} loggedUserId={this.state.userId} />
                    </div>
                )
            } else {
                return (
                    <div className="container">
                        <h1 style={{textAlign:"center"}}>Not posts yet</h1>
                        <NewPostForm newPostEvent={this.newPost} onChangeHandler={this.onChangeHandler} />
                    </div>
                )
            }
        } else {
            window.location.href = "/";
        }
    }
}

export default Home;