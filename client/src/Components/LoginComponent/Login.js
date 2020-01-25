import React from "react";
import LoginForm from "./Partials/LoginForm"
import "./login.css";
const Login = (props) => {

    if (localStorage.token) {
        window.location.href = "/profile"
    } else {
        return (
            <LoginForm />
        )
    }
}

export default Login;