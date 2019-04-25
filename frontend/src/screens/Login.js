import React from "react";
import LoginForm from "../components/LoginForm";
import '../styles/util.css';

const Login = (props) => {
    return (
        <div className="Form">
            <LoginForm setLogginStatus={props.setLogginStatus} setToken={props.setToken} closeDialog={props.closeDialog} change={props.change}/>
        </div>
    );
};

export default Login;