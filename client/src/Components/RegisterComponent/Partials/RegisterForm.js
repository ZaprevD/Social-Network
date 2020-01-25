import React from "react";

const RegisterForm = (props) => {

    return (
        <div className="form-box">
            <form onSubmit={props.submitHandler}>
                <div className="register-inputs">
                    <h3>Register</h3>
                    <input onChange={props.changeEvent} type="text" placeholder="First Name" name="firstName" />
                    <input onChange={props.changeEvent} type="text" placeholder="Last Name" name="lastName" />
                    <input onChange={props.changeEvent} type="email" placeholder="Email" name="email" />
                    <input onChange={props.changeEvent} type="password" placeholder="Password" name="password" />
                    <button onChange={props.changeEvent} type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;