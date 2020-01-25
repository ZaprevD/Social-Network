import React from "react"
import { Link } from 'react-router-dom';

const RegisterLink = () => {
    return (
        <div>
            <Link to="/register" className="register-btn">Sign Up</Link>
            <Link to="/" className="register-btn">Login</Link>
        </div>
    )
}
export default RegisterLink;