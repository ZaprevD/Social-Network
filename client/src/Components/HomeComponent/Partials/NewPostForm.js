import React from "react";

const NewPostForm = (props) => {
    return (
        <form onSubmit={props.newPostEvent}>
            <div className="new-post">
                <p style={{ textAlign: "center" }}>What is on your mind?</p>
                <input type="textarea" name="newPostText" onChange={props.onChangeHandler} />
                <button type="submit">Post</button>
            </div>
        </form>
    )
}

export default NewPostForm;