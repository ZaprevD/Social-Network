import React, { useState } from "react";
import { login } from "../userFunctions";
import "./login.css";
const Login = (props) => {

    const [email, setNewEmail] = useState({
        Email: ""
    });
    const [password, setNewPassword] = useState({
        Password: ""
    });
    const onEmailChange = (e) => {
        setNewEmail({ Email: e.target.value })
    }
    const onPasswordChange = (e) => {
        setNewPassword({ Password: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            Email: email.Email,
            Password: password.Password
        }
        login(newUser);
    };

    if (localStorage.token) {
        window.location.href = "/profile"
    } else {

        return (
            <div>
                <div className="login-window">
                    <form onSubmit={onSubmit}>
                        <h3>Login</h3>
                        <div className="login-inputs">
                            <input type="text" name="Email" placeholder="Email" onChange={onEmailChange} />
                            <input type="password" name="Password" placeholder="Password" onChange={onPasswordChange} />
                            <button type="submit">Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;