import React from "react";
import ProfileInfo from "./ProfileInfo";
const Profile = () => {

    if (localStorage.token) {
        return (
            <ProfileInfo />
        )
    } else {
        window.location.href = "/";
    }
}

export default Profile;