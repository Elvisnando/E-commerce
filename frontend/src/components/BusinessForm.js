import React, { Component } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import '../styles/util.css';
import { registrationBusiness } from '../services/ApiCall.js';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit
  }
});

class BusinessForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noError: true,
      value: '',
      name_has_error: false,
      helperTextName: '',
      fiscalCode_has_error: false,
      helperTextFiscalCode: '',
      address_has_error: false,
      helperTextAddress: '',
      email_has_error: false,
      helperTextEmail: '',
      password_has_error: false,
      helperTextPassword: '',
      password_confirm_has_error: false,
      helperText: '',
      empty_fields: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkPassword() {
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({
        noError: false,
        password_has_error: true,
        password_confirm_has_error: true,
        helperText: 'Password doesn\'t match!'
      });
    } else {
      this.setState({
        password_has_error: false,
        password_confirm_has_error: false,
        helperText: ''
      });
    }
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

  checkFields() {
    //debugger;
    if ((this.state.name === undefined)||(this.state.name === "")) {
      this.setState({
        noError: false,
        name_has_error: true,
        helperTextName: 'Insert your name!'
      });
    } else {
      this.setState({
        name_has_error: false,
        helperTextName: ''
      });
    }
    if ((this.state.fiscalCode === undefined)||(this.state.fiscalCode === "")) {
      this.setState({
        noError: false,
        fiscalCode_has_error: true,
        helperTextFiscalCode: 'Insert your fiscal code!'
      });
    } else {
      this.setState({
        fiscalCode_has_error: false,
        helperTextFiscalCode: ''
      });
    }
    if ((this.state.address === undefined)||(this.state.address === "")) {
      this.setState({
        noError: false,
        address_has_error: true,
        helperTextAddress: 'Insert your address!'
      });
    } else {
      this.setState({
        address_has_error: false,
        helperTextAddress: ''
      });
    }
    if ((this.state.email === undefined)||(this.state.email === "")) {
      this.setState({
        noError: false,
        email_has_error: true,
        helperTextEmail: 'Insert your e-mail address!'
      });
    } else {
      this.setState({
        email_has_error: false,
        helperTextMail: ''
      });
    }
    if ((this.state.password === undefined)||(this.state.password === "")) {
      this.setState({
        noError: false,
        password_has_error: true,
        helperTextPassword: 'Insert your password!'
      });
    }
    else {
      this.setState({
        //    password_has_error: false,
        helperTextPassword: ''
      });
    }
    if ((this.state.passwordConfirm === undefined)||(this.state.passwordConfirm === "")) {
      this.setState({
        noError: false,
        password_confirm_has_error: true,
        helperText: 'Confirm your password!'
      });
    }/*else {
      this.setState({
        passwordConfirm_has_error: false,
        helperText: ''
      });
  }*/
  }

  checkPasswordLength() {
    let pw = this.state.value;
    if (pw.length < 6) {
      this.setState({
        noError: false,
        password_has_error: true,
        helperTextPassword: 'Minimum 6 characters!'
      });
    }
  }

  async onSubmit(e) {
    
    e.preventDefault();
    await this.checkPassword();
    await this.checkFields();

    if (this.state.noError) {
      registrationBusiness(this.state.email, this.state.password, this.state.name, this.state.fiscalCode, this.state.address);
    }
    this.setState({noError:true});
  }

  error = async (response) => {
    console.log("errore server");
  }

  emailChange(ev) {
    this.setState({
      email: ev.target.value
    })
  }

  passwordChange(ev) {
    this.setState({
      password: ev.target.value
    })
  }

  passwordConfirmChange(ev) {
    this.setState({
      passwordConfirm: ev.target.value
    })
  }


  nameChange(ev) {
    this.setState({
      name: ev.target.value
    })
  }

  fiscalCodeChange(ev) {
    this.setState({
      fiscalCode: ev.target.value
    })
  }

  addressChange(ev) {
    this.setState({
      address: ev.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <Typography variant="h6" gutterBottom>
            Business Registration Form
        </Typography>
          <TextField
            required="true"
            id="name"
            className="TextField"
            label="Name"
            value={this.state.name}
            error={this.state.name_has_error}
            helperText={this.state.helperTextName}
            margin="normal"
            variant="outlined"
            onChange={this.nameChange.bind(this)}
          /><br />
          <TextField
            required="true"
            id="fiscalCode"
            className="TextField"
            label="Fiscal Code"
            value={this.state.fiscalCode}
            error={this.state.fiscalCode_has_error}
            helperText={this.state.helperTextFiscalCode}
            margin="normal"
            variant="outlined"
            onChange={this.fiscalCodeChange.bind(this)}
          /><br />
          <TextField
            required="true"
            id="address"
            className="TextField"
            label="Address"
            value={this.state.address}
            error={this.state.address_has_error}
            helperText={this.state.helperTextAddress}
            margin="normal"
            variant="outlined"
            onChange={this.addressChange.bind(this)}
          /><br />
          <TextField
            required="true"
            id="outlined-email-input"
            className="TextField"
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            error={this.state.email_has_error}
            helperText={this.state.helperTextEmail}
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
            value={this.state.password}
            error={this.state.password_has_error}
            helperText={this.state.helperTextPassword}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            onChange={this.passwordChange.bind(this)}
          /><br />
          <TextField
            required="true"
            id="outlined-password-confirm"
            className="TextField"
            label="Confirm password"
            type="password"
            value={this.state.passwordConfirm}
            error={this.state.password_confirm_has_error}
            helperText={this.state.helperText}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            onChange={this.passwordConfirmChange.bind(this)}
          /><br />
          <br /><br /><br />
          <Link to='/register'>
           <Button variant="contained" className="SubmitButton" type="submit">Back to Customer Registration</Button>
          </Link>
          <Button variant="contained" className="SubmitButton" type="submit" onClick={this.onSubmit.bind(this)}>Register</Button>
        </label>
      </form>
    );
  }
}

const BusinessRegistration = withStyles(styles)(BusinessForm);

export default BusinessRegistration;