import React from "react";
import InsertProductForm from "../components/InsertProductForm";
import '../styles/util.css';

const InsertProduct = (props) => {
    return (
        <div className="InsertProductForm">
            <InsertProductForm setLogginStatus={props.setLogginStatus} setToken={props.setToken} closeDialog={props.closeDialog} change={props.change}/>
        </div>
    );
};

export default InsertProduct;