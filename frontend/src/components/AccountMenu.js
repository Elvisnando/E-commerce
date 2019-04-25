import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../styles/style.css';

class AccountMenu extends Component {
 
    
    render() {
        return (
            <div class="sidenav">
                <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
        );
    }
}


export default AccountMenu;