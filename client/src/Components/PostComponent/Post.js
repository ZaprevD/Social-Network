import React from "react";
import "./post.css";
const Post = (props) => {

    const style = {
        backgroundImage: `url(${props.imgUrl})`
    }
    let button = null
        if (props.btnName === "Delete") {
            button = (
                <form onSubmit={props.deleted}>
                    <button type="submit">{props.btnName}</button>
                </form>
            )
        }else{
            button = (
                <button>{props.btnName}</button>
            )
        }

    return (
        <div className="post-holder">
            <div className="nameHolder">
                <div className="small-image" style={style}>
                </div>
                <h3>{props.fullName}</h3>
                <p>{props.date}</p>
            </div>
            <div className="text-holder">
                <p>{props.post}</p>
            </div>
            <div className="likes-holder">
                <p>Likes: {props.likes}</p>
            </div>
            <div className="button-holder">
                <button className="like-btn">Like</button>
                {button}
            </div>
        </div>
    )
}

export default Post;