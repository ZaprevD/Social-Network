import React from "react";
import jwt_decode from "jwt-decode";
import Post from "../PostComponent/Post";
import ChangePictureWindow from "../ChangePictureComponent/ChangePictureWindow";
import { changePicture } from "../userFunctions";
import { getImageUrl } from "../userFunctions";
import { deletePost } from "../userFunctions";
import "./profile.css";
import { getPostsForCurrentUser } from '../userFunctions';
class ProfileInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                posts: [

                ]
            },
            imageUrl: "",
            changePictureWindowShow: false,
            newPictureUrl: ""
        }
    }

    async componentDidMount() {
        let token = localStorage.token;
        let decoded = jwt_decode(token);
       await getPostsForCurrentUser(decoded.currentUser.Id).then(res => {
            this.setState({
                currentUser: {
                    id: decoded.currentUser.Id,
                    firstName: decoded.currentUser.firstName,
                    lastName: decoded.currentUser.lastName,
                    email: decoded.currentUser.email,
                    posts: res.reverse()
                },
                imageUrl: "",
            })
        });
      await  getImageUrl(decoded.currentUser.Id).then(res => {
            this.setState({ imageUrl: res })
        });

    }

    changePictureWindowShow = () => {
        let show1 = this.state.changePictureWindowShow;
        this.setState({ changePictureWindowShow: !show1 })
    }

    setNewPictureUrl = (e) => {
        e.preventDefault();
        this.setState({ newPictureUrl: e.target.value })
    }

    changePictureEvent = () => {
        changePicture(this.state.newPictureUrl, this.state.currentUser.id)
            .then(res => {
                console.log(res)
            });
    }

    render() {
        const reversedPosts = this.state.currentUser.posts;
        const style = {
            backgroundImage: `url(${this.state.imageUrl})`
        }
        if (this.state.currentUser.posts.length > 0) {
            return (
                <div className="container">
                    <div className="profile-box">
                        <div className="image-holder" style={style}>

                        </div>
                        <h3>{this.state.currentUser.firstName + ` ` + this.state.currentUser.lastName} </h3>
                        <button onClick={this.changePictureWindowShow}>Change Picture</button>
                    </div>
                    {this.state.changePictureWindowShow ? <ChangePictureWindow
                        changedUrl={this.setNewPictureUrl} submitEvent={this.changePictureEvent} /> : null}
                    {reversedPosts.map(element => {
                        return <Post date={element.created_On} btnName={"Delete"}
                            imgUrl={this.state.imageUrl} deleted={() =>deletePost(element.postId)}
                            fullName={this.state.currentUser.firstName
                                + " " + this.state.currentUser.lastName}
                            likes={element.Likes} key={element.postId} post={element.Text} />
                    })}
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="container">
                        <div className="profile-box">
                            <div className="image-holder" style={style}>

                            </div>
                            <h3>{this.state.currentUser.firstName + ` ` + this.state.currentUser.lastName} </h3>
                            <button onClick={this.changePictureWindowShow}>Change Picture</button>
                        </div>
                        <h3 style={{ textAlign: "center", margin: "30px 0" }}>You dont have any posts</h3>
                    </div>
                    {this.state.changePictureWindowShow ? <ChangePictureWindow
                        changedUrl={this.setNewPictureUrl} submitEvent={this.changePictureEvent} /> : null}
                </div>
            )
        }


    }

}

export default ProfileInfo;