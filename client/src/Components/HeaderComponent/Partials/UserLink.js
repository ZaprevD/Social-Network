import { NavLink } from 'react-router-dom'
import React from "react";

const UserLink = (props) => {
    return (
        <div className="flex-div">
            <ul className="main-nav">
                <li> <NavLink to="/profile" className="register-btn">My Profile</NavLink> </li>
                <li> <button className="log-out-btn" onClick={props.logOutEvent}>LogOut</button> </li>
            </ul>
        </div>
    )

}

export default UserLink;