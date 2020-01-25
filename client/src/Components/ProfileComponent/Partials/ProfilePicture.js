import React from "react";

const ProfilePicture = (props) => {
  

    return (
        <div className="profile-box">
            <div className="image-holder" style={props.style}>

            </div>
            <h3>{props.currentUser.firstName + ` ` + props.currentUser.lastName} </h3>
            <button onClick={props.changePictureWindowShow}>Change Picture</button>
        </div>
    )
}

export default ProfilePicture;