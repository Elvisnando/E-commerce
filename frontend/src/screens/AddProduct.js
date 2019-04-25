import React from "react";
import { Typography, Icon, Button, IconButton } from "@material-ui/core";
import "../styles/addProduct.css";
import AddProductPaper from "../components/AddProductPaper";

export default class AddProduct extends React.Component {

    render () {
        return (
            <div className="Container">
                <div className="TitleContainer">
                    <h1>Add new product</h1>                    
                </div>
                <div className="BodyContainer">
                    <AddProductPaper/>
                </div>
            </div>
        );
    }
}