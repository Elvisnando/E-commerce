import React, { Component } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import '../styles/util.css';
import { registration } from '../services/ApiCall.js';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  margin: {
      margin: theme.spacing.unit * 2,
  },
  padding: {
      padding: theme.spacing.unit
  }
});

class BusinessRegistrationForm extends Component{
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    };

    onSubmit(e) {
      e.preventDefault();
    }

    onRegistrationClick(e) {
      registration(this.state.email, this.state.password, this.state.name, this.state.surname, this.state.address);   
    }
    
    emailChange(ev) {
      debugger;
      if(ev.target.value === "" || ev.target.value === undefined) {
        this.setState({
          email: ev.target.value,
          error: "true",
          value: ev.target.value
        })
      }
    }

    passwordChange(ev) {
      if(ev.target.value === "" || ev.target.value === undefined) {
        this.setState({
          password: ev.target.value,
          error: "true",
          value: ev.target.value
        })
      }
    }

    nameChange(ev) {
      if(ev.target.value === "" || ev.target.value === undefined) {
        this.setState({
          name: ev.target.value,
          error: "true",
          value: ev.target.value
        })
      }
    }

    surnameChange(ev) {
      if(ev.target.value === "" || ev.target.value === undefined) {
        this.setState({
          surname: ev.target.value,
          error: "true",
          value: ev.target.value 
        })
      }
    }

    addressChange(ev) {
      if(ev.target.value === "" || ev.target.value === undefined) {
        this.setState({
          address: ev.target.value,
          error: "true",
          value:ev.target.value 
        })
      }
    }

    emailChange(ev) {
        if(ev.target.value === "" || ev.target.value === undefined) {
          this.setState({
            address: ev.target.value,
            error: "true",
            value:ev.target.value 
          })
        }
      }

    partitaIvaChange(ev) {
        if(ev.target.value === "" || ev.target.value === undefined) {
          this.setState({
            partitaIva: ev.target.value,
            error: "true",
            value:ev.target.value 
          })
        }
      }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <TextField
          required="true"
          id="name"
          className="TextField"
          label="Name"
          margin="normal"
          variant="outlined"
          onChange={this.nameChange.bind(this)} 
        /><br />
        <TextField
          required="true"
          id="surname"
          className="TextField"
          label="Surname"
          margin="normal"
          variant="outlined"
          onChange={this.surnameChange.bind(this)} 
        /><br />
        <TextField
          required="true"
          id="outlined-email-input"
          className="TextField"
          label="Partita Iva"
          name="partitaIva"
          autoComplete="partitaIva"
          margin="normal"
          variant="outlined"
          onChange={this.partitaIvaChange.bind(this)} 
        /><br />
        <TextField
        required="true"
        id="outlined-email-input"
        className="TextField"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        onChange={this.emailChange.bind(this)} 
      /><br />
        <TextField
          required="true"
          id="outlined-password-input"
          className="TextField"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          onChange={this.passwordChange.bind(this)} 
        />
        <br/>
        <br/>
        <div id="buttonID">
        <Button variant="contained" className="SubmitButton" type="submit" onClick={this.onRegistrationClick.bind(this)}>Register</Button>
        </div>
        </form>
      );
    }    
  }

  const Registration = withStyles(styles)(BusinessRegistrationForm);

  export default Registration;