import React from "react";
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <NavLink to="/">Home</NavLink><br />
            <NavLink to="/login">Login</NavLink><br />
            <NavLink to="/register">Register</NavLink>
        </div>
    );
};

export default Navigation;