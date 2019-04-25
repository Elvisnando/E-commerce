import React, { Component } from "react";
import { Button, TextField, Typography} from "@material-ui/core";
import { login } from '../services/ApiCall.js';
import '../styles/util.css';
import history from '../services/History';
import jwt_decode from "jwt-decode"

export default class LoginForm extends Component{

    onSubmit(e) {
      e.preventDefault();
      let email = document.getElementById("outlined-email-input").value;
      let password = document.getElementById("outlined-password-input").value;
      login(email, password, this.success, this.error);
    }

    error = async (response) => {
        console.log("Errore nella login: " + response);
    }

    success = async (response) => {
      let res = await response.json();
      if (response.status === 200){
        let token = await res.token;
        localStorage.setItem("jwt", token);
        this.props.setLogginStatus(token);
        console.log("Login effettuato", jwt_decode(token));
        debugger;
        this.props.closeDialog();
      } else {
        document.getElementById("errorMessage").innerHTML = res.message;
      }
      // if (res.code === 1001){
      //   console.log("Wrong credentials");
      //   document.getElementById("errorMessage").innerHTML = res.message;
      // }
      // if (res.code === 1002){
      //   console.log("Wrong credentials");
      //   document.getElementById("errorMessage").innerHTML = res.message;
    };

    render() {      
      return (
        <form onSubmit={this.onSubmit.bind(this)}>
        <br/>
          <TextField
          required="true"
          id="outlined-email-input"
          className="TextField"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          margin="dense"
          variant="outlined"
        /><br />
        <TextField
          required="true"
          id="outlined-password-input"
          className="TextField"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="dense"
          variant="outlined"
        /><br/><br/>
        <h6 id="errorMessage" variant="subtitle2"/>
      <div className="tinyLinkContainer">
         <a className="tinyLink" href="javascript:void(0)" onClick={this.props.change}>Forgot password?</a>
       </div>
      <br></br>
        <Button variant="contained" className="SubmitButton" type="submit">Login</Button>
        </form>
      );
    }    
  }
  
