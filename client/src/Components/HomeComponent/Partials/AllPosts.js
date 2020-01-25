import React from "react";
import Post from "../../PostComponent/Post";
import { deletePost } from "../../userFunctions";
const AllPosts = (props) => {

    return (
        <div className="all-posts">
            {props.allposts.map(element => {
                return <Post key={element.postId} deleted={() => deletePost(element.postId)}
                    btnName={element.userId === props.loggedUserId ? "Delete" : "Report"}
                    fullName={element.First_Name + " " + element.Last_Name}
                    imgUrl={element.imageUrl}
                    likes={element.Likes} date={element.created_On} post={element.Text} />
            })}
        </div>
    )
    
}

export default AllPosts;