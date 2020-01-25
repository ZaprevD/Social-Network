import React from "react";
import Post from "../../PostComponent/Post"
import { deletePost } from "../../userFunctions";
const CurrentUserPosts = (props) => {

    return (
        <div>
            {props.allposts.map(element => {
                    return <Post date={element.created_On} btnName={"Delete"}
                        imgUrl={props.img} deleted={() => deletePost(element.postId)}
                        fullName={props.currentUser.firstName
                            + " " + props.currentUser.lastName}
                        likes={element.Likes} key={element.postId} post={element.Text} />
                })}
        </div>
    )
}
export default CurrentUserPosts;