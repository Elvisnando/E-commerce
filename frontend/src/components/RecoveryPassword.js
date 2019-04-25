import React from "react";
import RecoveryPasswordForm from "./RecoveryPasswordForm";
import '../styles/util.css';

const RecoveryPassword = (props) => {
    return (
        <div className="Form">
            <RecoveryPasswordForm closeDialog={props.closeDialog} change={props.changeForm} waitOpen={props.waitOpen} waitClose={props.waitClose}/>
        </div>
    );
};

export default RecoveryPassword;