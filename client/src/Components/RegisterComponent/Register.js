import React, { Component } from "react";
import "./register.css"
import { register } from "../userFunctions";
import RegisterForm from  "./Partials/RegisterForm";
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
            <RegisterForm changeEvent={this.onChange} submitHandler={this.onSubmit} />
        )

    }
}

export default Register;