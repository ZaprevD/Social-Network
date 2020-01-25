import React from "react";
import jwt_decode from "jwt-decode";
import ChangePictureWindow from "../../ChangePictureComponent/ChangePictureWindow";
import ProfilePicture from "./ProfilePicture";
import CurrentUserPosts from "./CurrentUserPosts"
import { changePicture } from "../../userFunctions";
import { getImageUrl } from "../../userFunctions";
import "../profile.css";
import { getPostsForCurrentUser } from '../../userFunctions';
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
        await getImageUrl(decoded.currentUser.Id).then(res => {
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

    changePictureEvent = async () => {
        await changePicture(this.state.newPictureUrl, this.state.currentUser.id)
            .then(res => {
                console.log(res)
            });
    }

    render() {
        const allPosts = this.state.currentUser.posts;
        const style = {
            backgroundImage: `url(${this.state.imageUrl})`
        }
            return (
                <div className="container">
                    <ProfilePicture style={style} currentUser={this.state.currentUser}
                        changePictureWindowShow={this.changePictureWindowShow}
                    />
                    {this.state.changePictureWindowShow ? <ChangePictureWindow
                        changedUrl={this.setNewPictureUrl} submitEvent={this.changePictureEvent}
                    /> : null}
                    {this.state.currentUser.posts.length > 0 ? <CurrentUserPosts allposts={allPosts} currentUser={this.state.currentUser}
                        img={this.state.imageUrl}
                    /> : <h3 style={{ textAlign: "center", margin: "30px 0" }}>You dont have any posts</h3>}

                </div>
            )
    }
}

export default ProfileInfo;
