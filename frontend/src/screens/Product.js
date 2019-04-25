import React from "react";
import '../styles/util.css';
import { Button } from "@material-ui/core";
import InsertProductForm from "../components/InsertProductForm";

const Register = () => {
    return (
        <div className="Form">
        <div className="topBar">
            <Button className="centralContainer" variant="contained" href="/">Home</Button>
        </div>
          <div>
            <p><InsertProductForm /></p>
          </div>
        </div>
    );
};
export default Register;