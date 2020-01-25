import { Link } from 'react-router-dom'
import React from "react";

const UserLink = (props) => {
    return (
        <div className="flex-div">
            <ul className="main-nav">
                <li> <Link to="/profile" className="register-btn">My Profile</Link> </li>
                <li> <button onClick={props.logOutEvent}>LogOut</button> </li>
            </ul>
        </div>
    )

}

export default UserLink;