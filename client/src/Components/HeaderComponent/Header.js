import React from "react";
import { Link } from 'react-router-dom'
import  UserLink  from "./Partials/UserLink";
import RegisterLink from "./Partials/RegisterLink";
import "./header.css"
const Header = () => {

    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    return (
        <div className="container-flex header">
            <div className="box-50">
                <Link to="/home"><i className="fa fa-home"></i></Link>
            </div>
            <div className="box-50">
                {localStorage.token ? <UserLink logOutEvent={logOut} /> : <RegisterLink />}
            </div>
        </div>
    )
}
export default Header;
