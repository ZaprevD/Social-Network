import React from "react"
import { NavLink } from 'react-router-dom';

const RegisterLink = () => {
    return (
        <div>
            <NavLink to="/register" exact className="register-btn">Sign Up</NavLink>
            <NavLink to="/" exact className="register-btn">Login</NavLink>
        </div>
    )
}
export default RegisterLink;