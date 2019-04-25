import React from "react";
import NewRegistrationForm from "../components/NewRegistrationForm";
import '../styles/util.css';

const Register = (props) => {
    return (
        <div className="Form">
            <NewRegistrationForm open={props.open} closeDialog={props.closeDialog} changeForm={props.changeForm} waitOpen={props.waitOpen} waitClose={props.waitClose}/>
        </div>
    );
};

export default Register;