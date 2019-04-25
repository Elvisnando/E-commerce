import React from "react";
import "../styles/util.css"
import { Button, TextField } from "@material-ui/core";

const Error = () => {
    return (
        <div>
            <div className="topBar">
                <Button className="centralContainer" variant="contained" href="/Login">Login</Button>
                <Button className="centralContainer" variant="contained" href="/Register">Registrazione</Button>
                <Button className="centralContainer" variant="contained" href="/Product">Insert Product</Button>
            </div>
            <div className="mainDiv">
                <TextField
                    id="outlined-email-input"
                    className="TextField"
                    label="Search a Product.."
                    type="text"
                    autoComplete="text"
                    margin="normal"
                    variant="outlined"
                />
            </div>
        </div>
    );
};


export default Error;