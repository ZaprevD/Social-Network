import React from "react";
import { Link } from 'react-router-dom'
import "./header.css"
const Header = () => {

    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    const userLink = (
        <div className="flex-div">
            <ul className="main-nav">
                <li> <Link to="/profile" className="register-btn">My Profile</Link> </li>
                <li> <button onClick={logOut}>LogOut</button> </li>
            </ul>
        </div>
    )

    const registerLink = (
        <Link to="/register" className="register-btn">Sign Up</Link>
    )


    return (
        <div className="container-flex header">
            <div className="box-50">
                <Link to="/home"><i className="fa fa-home"></i></Link>
            </div>
            <div className="box-50">
                {localStorage.token ? userLink : registerLink}
            </div>
        </div>

    )
}
export default Header;
