import React, { Component } from "react";
import { Button, TextField, Checkbox, Typography} from "@material-ui/core";
import { registrationBuyer, registrationBusiness } from '../services/ApiCall.js';
import '../styles/util.css';

const question = [
  {
    value: 1,
    label: 'Name of your first animal',
  },
  {
    value: 2,
    label: 'Your favourite singer',
  },
  {
    value: 3,
    label: 'City where you live',
  },
];

class RegistrationForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      errorMessage: '',
      name:'',
      email:'',
      id:'',
      surname:'',
      birthday:'',
      password:'',
      name_business:'',
      email_business:'',
      password_business:'',
      address_business:'',
      piva_business:'',
      question:1,
    }
    this.showBusinessForm = this.showBusinessForm.bind(this);
    this.showBuyerForm = this.showBuyerForm.bind(this);
  }

  appendErrorMessage = (message) => {
    let newErrorMessage = this.state.errorMessage += ("<br/>" + message);
    this.setState({errorMessage: newErrorMessage});
  }

  displayErrorMessage = () => {
    document.getElementById("errorMessage").innerHTML = this.state.errorMessage;
  }

  nameIsValid = (name) => {
    return new RegExp(/^[a-z ]+$/i).test(name);
  }

  pIvaIsValid = (piva) => {
    return new RegExp(/^\d+$/).test(piva)
  }

  passwordIsValid = (password) => {
    return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})").test(password);
  }

  addressIsValid = (address) => {
    return new RegExp(/^[a-z 0-9]+$/i).test(address);
  }

  emailIsValid = (email) => {
    return new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
  }

  birthdayIsValid = (birthday) => {
    return ((new Date(birthday)).getTime() <= (new Date()).getTime());
  }
  
  questionChange(ev) {
    this.setState({
      question: ev.target.value
    })
  }
  onSubmitBusiness(e) {
    e.preventDefault();
    let email = this.state.email_business;
    let password = this.state.password_business;
    let piva = this.state.piva_business;
    let name = this.state.name_business;
    let address = this.state.address_business
    let isMerchant = document.getElementById("isMerchant").checked;
    let isProducer = document.getElementById("isProducer").checked;
    let isRestaurant = document.getElementById("isRestaurant").checked;
    let isBusiness = true;
    let question = this.state.question;
    let answer = this.state.answer;

    if (!(isMerchant || isProducer || isRestaurant)) {
      this.appendErrorMessage("You must select one checkbox");
    } 
    if (!this.nameIsValid(name)) {
      this.appendErrorMessage("Name is not valid");
    }
    if (!this.pIvaIsValid(piva)) {
      this.appendErrorMessage("P. Iva is not valid");
    }
    if (!this.passwordIsValid(password)) {
      this.appendErrorMessage("Password doesn't meet the complexity parameters");
    }
    if (!this.addressIsValid(address)) {
      this.appendErrorMessage("Address is not valid");
    }
    if (!this.emailIsValid(email)) {
      this.appendErrorMessage("Email is not valid");
    }
    
    if (this.state.errorMessage === "") {
      this.props.waitOpen();
      registrationBusiness(email, password, name, address, piva, isBusiness, isProducer, isMerchant, isRestaurant, question, answer, this.success, this.error);
    } else {
      this.displayErrorMessage();
      this.setState({errorMessage: ''});
    }
  }

  onSubmitBuyer(e) {
    e.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    let birthday = this.state.birthday;
    let name = this.state.name;
    let surname = this.state.surname;
    let question = this.state.question;
    let answer = this.state.answer;

    if (!this.nameIsValid(name)) {
      this.appendErrorMessage("Name is not valid");
    }
    if (!this.nameIsValid(surname)) {
      this.appendErrorMessage("Surname is not valid");
    }
    if (!this.passwordIsValid(password)) {
      this.appendErrorMessage("Password doesn't meet the complexity parameters");
    }
    if (!this.emailIsValid(email)) {
      this.appendErrorMessage("Email is not valid");
    }
    if (!this.birthdayIsValid(birthday)) {
      this.appendErrorMessage("Birthday is not valid");
    }

    if (this.state.errorMessage === "") {
      this.props.waitOpen();
      registrationBuyer(email, password, name, surname, birthday, question, answer, this.success, this.error);
    } else {
      this.displayErrorMessage();
      this.setState({errorMessage: ''});
    }    
  }   

  error = async (response) => {
    console.log("Errore nella login: " + response);
  };

  success = async (response) => {
    this.props.waitClose();
    if (response.status === 200){        
      this.setState({finish: true})
    }
    else if (response.status === 400){
      let res = await response.json();
        document.getElementById("errorMessage").innerHTML = document.getElementById("errorMessage").value + "<br/>" + res.message;
    }

  };

  errorTrue = (value) => {
    // if(value == "") {
    //   return true;
    // }
    //   return false;
  }

  showBuyerForm() {
    this.props.open="buyer";
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  helperText = (value, id) => {
    if (value === "") 
    {
      return id + " is required";
    }
      return "";
  }

    // ^ The password string will start this way
    // (?=.* [a - z])	The string must contain at least 1 lowercase alphabetical character
    // (?=.* [A - Z])	The string must contain at least 1 uppercase alphabetical character
    // (?=.* [0 - 9])	The string must contain at least 1 numeric character
    // (?=.[!@#\$ %\^&]) The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
    // (?=.{ 8, })	The string must be eight characters or longer

  helperTextPassword = (value) => {
    if(!this.passwordIsValid(value)){
      return <ul>Password did not meet the password complexity standard. The password must contains:<li>At least 1 lowercase alphabetical character</li><li>At least 1 uppercase alphabetical character</li><li>At least 1 numeric character</li><li>At least one special character [! @ # % &]</li><li>Eight characters or longer</li></ul>;
    }
    return "";
  }

  

  helperTextName = (value) => {
    if(!value.match(/[a-z]/i)){
      return "Only characters";
    }
    return "";
  }

  showBusinessForm() {
    this.props.open = "business";
  }

    render() {
      if (this.state.finish) {
        return(
          <div>
            <h6>Registration completed. We sent an email to {this.state.email} with instructions for confirming your account</h6>
            <Button variant="contained" onClick={this.props.closeDialog}>Close</Button>
          </div>
        )
      }

      if (this.props.open === "business") {
        return (
          <div id="formBusiness">
            <form onSubmit={this.onSubmitBusiness.bind(this)}>
            <br/>
            <TextField
              error={this.errorTrue(this.state.name_business)}
              required="true"
              id="name_business"
              className="TextField"
              label="Name"
              margin="dense"
              helperText={this.helperTextName(this.state.name_business)}
              variant="outlined"
              onChange={(event) => {
                this.setState({ name_business: event.target.value })
              }
              }
            /><br/>
            <TextField
              required="true"
              error={this.errorTrue(this.state.email_business)}
              id="email_business"
              className="TextField"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              helperText={this.helperText(this.state.email_business, 'E-mail')}
              margin="dense"
              variant="outlined"
              onChange={(event) => {
                this.setState({ email_business: event.target.value })
              }
              }
            /><br />
            <TextField
              required="true"
              error={this.errorTrue(this.state.password_business)}
              id="password_business"
              className="TextField"
              label="Password"
              type="password"
              helperText={this.helperTextPassword(this.state.password_business)}
              autoComplete="password"
              margin="dense"
              variant="outlined"
              onChange = {(event) => {
                this.setState({password_business: event.target.value})
              }
              }
            /><br />
              <TextField
              required="true"
              error={this.errorTrue(this.state.address_business)}
              id="address_business"
              className="TextField"
              label="Address"
              helperText={this.helperText(this.state.address_business, 'Address')}
              margin="dense"
              variant="outlined"
              onChange = {(event) => {
                this.setState({address_business: event.target.value})
              }
              }
            /><br/>
              <TextField
              required="true"
              id="piva_business"
              error={this.errorTrue(this.state.piva_business)}
              className="TextField"
              label="Partita Iva"
              helperText={this.helperText(this.state.piva_business, 'P. Iva')}
              margin="dense"
              variant="outlined"
              onChange = {(event) => {
                this.setState({piva_business: event.target.value})
              }
              }
            /><br/>
            <TextField
            id="outlined-select-question-native"
            select
            label="Secret Question"
            onChange={this.questionChange.bind(this)}
            SelectProps={{ native: true }}
            margin="normal"
            className="TextField"
            variant="outlined"
          >
          {question.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </TextField><br/>
          
            <TextField
            required="true"
            id="answer"
            className="TextField"
            label="Answer"
            margin="dense"
            variant="outlined"
            onChange = {(event) => {
              this.setState({answer: event.target.value})
            }
            }
          />
            
            <br/><br/>
            <Typography variant="subtitle2" gutterBottom>
              Select the checkboxes for which you want to register
            </Typography>

            <Checkbox
              checked={this.state.checkedB}
              value="isMerchant"
              id="isMerchant"
              color="primary"
            />Merchant
            <Checkbox
              checked={this.state.checkedB}
              value="isRestaurant"
              id="isRestaurant"
              color="primary"
            />Restaurant
            <Checkbox
              checked={this.state.checkedB}
              value="isProducer"
              id="isProducer"
              color="primary"
            />Producer

            <br/><h6 id="errorMessage"></h6><br/>
            <div id="btnID">
              <Button variant="contained" className="SubmitButton" type="submit">Register</Button>
            </div>

            </form>
            <div className="tinyLinkContainer">
              <a className="tinyLink" href="javascript:void(0)" onClick={this.props.changeForm}> Register as user</a>
            </div>
        </div>
        );
      }
      if (this.props.open === "buyer") {
      return (
        <div id="formUser">
        <form onSubmit={this.onSubmitBuyer.bind(this)}>
        <br/>
        <TextField
          error={this.errorTrue(this.state.name)}
          required="true"
          id="name"
          className="TextField"
          label="Name"
          margin="dense"
          variant="outlined"
          helperText={this.helperTextName(this.state.name)}
          value={this.state.name}
          onChange = {(event) => {
            this.setState({name: event.target.value})
          }
          }
        /><br/>
          <TextField
          error={this.errorTrue(this.state.surname)}
          required="true"
          id="surname"
          className="TextField"
          label="Surname"
          helperText={this.helperTextName(this.state.surname)}
          margin="dense"
          variant="outlined"
          onChange = {(event) => {
            this.setState({surname: event.target.value})
          }
          }
        /><br/>
          <TextField
          required="true"
          error={this.errorTrue(this.state.birthday)}
          id="birthday"
          type="date"
          label="Birthday"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            maxlength: 8,
            inputProps: { max: '2020-01-01' } 
          }}
          helperText={this.helperText(this.state.birthday, 'Birthday')}
          className="TextField"
          margin="dense"
          variant="outlined"
          onChange = {(event) => {
            this.setState({birthday: event.target.value})
          }
          }
        /><br/>
          <TextField
          required="true"
          error={this.errorTrue(this.state.email)}
          id="email"
          className="TextField"
          label="Email"
          type="email"
          helperText={this.helperText(this.state.email, 'E-mail')}
          name="email"
          autoComplete="email"
          margin="dense"
          variant="outlined"
          onChange = {(event) => {
            this.setState({email: event.target.value})
          }
          }
        /><br />
        <TextField
          required="true"
          error={this.errorTrue(this.state.password)}
          id="password"
          className="TextField"
          label="Password"
          type="password"
          helperText={this.helperTextPassword(this.state.password)}
          autoComplete="current-password"
          margin="dense"
          variant="outlined"
          onChange = {(event) => {
            this.setState({password: event.target.value})
          }
          }
        /><br />
         <TextField
          id="outlined-select-question-native"
          select
          label="Secret Question"
          onChange={this.questionChange.bind(this)}
          SelectProps={{ native: true }}
          margin="normal"
          className="TextField"
          variant="outlined"
        >
        {question.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </TextField>
        <br/>
          <TextField
          required="true"
          id="answer"
          className="TextField"
          label="Answer"
          margin="dense"
          variant="outlined"
          onChange = {(event) => {
            this.setState({answer: event.target.value})
          }
          }
        /><br/><br/>
        <h6 id="errorMessage"></h6>
        <br/>
        <div id="btnID">
        <Button variant="contained" className="SubmitButton" type="submit">Register</Button>
        </div>
        </form>
        <div className="tinyLinkContainer">
        <a className="tinyLink" href="javascript:void(0)" onClick={this.props.changeForm}> Register as business</a>
        </div>
        </div>
      );
      }
    }
  }

  export default RegistrationForm;
