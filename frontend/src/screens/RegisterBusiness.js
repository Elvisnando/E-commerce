import React from "react";
import BusinessForm from "../components/BusinessForm";
import '../styles/util.css';
import { Button } from "@material-ui/core";

const RegisterBusiness = () => {
    return (
        <div className="Form">
        <div className="topBar">
            <Button className="centralContainer" variant="contained" href="/">Home</Button>
        </div>
          <div>
            <p><BusinessForm /></p>
          </div>
        </div>
    );
};
export default RegisterBusiness;