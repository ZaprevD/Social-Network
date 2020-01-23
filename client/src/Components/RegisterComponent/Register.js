import React, { Component } from "react";
import "./register.css"
import { register } from "../userFunctions";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

            firstName: "",
            lastName: "",
            email: "",
            password: ""

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        register(newUser).then(res => {
            this.props.history.push("/");
        })
    }
    render() {
        return (
            <div className="form-box">
                <form onSubmit={this.onSubmit}>
                    <div className="register-inputs">
                    <h3>Register</h3>
                        <input onChange={this.onChange} type="text" placeholder="First Name" name="firstName" />
                        <input onChange={this.onChange} type="text" placeholder="Last Name" name="lastName" />
                        <input onChange={this.onChange} type="email" placeholder="Email" name="email" />
                        <input onChange={this.onChange} type="password" placeholder="Password" name="password" />
                        <button onChange={this.onChange} type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        )

    }
}

export default Register;