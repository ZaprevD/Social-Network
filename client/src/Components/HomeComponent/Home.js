import React, { Component } from "react";
import "./home.css";
import jwt_decode from "jwt-decode";
import NewPostForm from "./Partials/NewPostForm";
import AllPosts from "./Partials/AllPosts";
import SearchFilder from "./Partials/SearchFilter";
import { getAllPosts } from "../userFunctions";
import { postStatus } from "../userFunctions";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            newPostText: "",
            userId: "",
            searchFilter: "",
            firstName: ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.newPost = this.newPost.bind(this);
    }

    async  componentDidMount() {
        let token = localStorage.token;
        let decoded = jwt_decode(token);
        let posts = await getAllPosts();
        this.setState({ posts: posts })
        this.setState({ userId: decoded.currentUser.Id })
        this.setState({ firstName: decoded.currentUser.firstName })
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

        let allPostss = this.state.posts.filter(el => {
            return el.Text.toLowerCase().includes(this.state.searchFilter.toLowerCase()) ||
                el.First_Name.toLowerCase().includes(this.state.searchFilter.toLowerCase()) ||
                el.Last_Name.toLowerCase().includes(this.state.searchFilter.toLowerCase());
        });

        let checkPosts = null;
        if (allPostss.length > 0) {
            checkPosts = <AllPosts allposts={allPostss} loggedUserId={this.state.userId} />
        } else {
            checkPosts = <h1 style={{ textAlign: "center" }}>Not posts yet</h1>
        }
        if (localStorage.token) {
            return (
                <div className="container">
                    <h2>{this.state.firstName}</h2>
                    <SearchFilder changed={this.onChangeHandler} val={this.state.searchFilter} />
                    <NewPostForm newPostEvent={this.newPost} onChangeHandler={this.onChangeHandler} />
                    {checkPosts}
                </div>
            )
        } else {
            window.location.href = "/";
        }
    }
}

export default Home;