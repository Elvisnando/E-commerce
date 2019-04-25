import React, { Component } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import '../styles/util.css';
import { recoveryPassword } from '../services/ApiCall.js';
import history from "../services/History";

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

export default class RecoveryPasswordForm extends Component{
    constructor(props) {
      super(props);

      this.state = {
        value: '',
        finish: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
  
    handleSubmit(event) {
      // alert('A name was submitted: ' + this.state.value);
      // event.preventDefault();
    };

    onSubmitRecoveryPassword(e) {
      e.preventDefault();
      let email = document.getElementById("outlined-email-input").value;
      let answer = document.getElementById("answer").value;
      this.setState({
        email: email,
        answer: answer
      })
      
      this.props.waitOpen();
      recoveryPassword(email, answer, this.success, this.error); 
    }

    error = async (response) => {
      console.log("Errore nel recupero password: " + response);
    }

    success = async (response) => {
      this.props.waitClose();
      if (response.status === 200){
        //Email mandata correttamente
        this.setState({finish: true});        
      }
      else if (response.status === 400) {
        let res = await response.json();
        document.getElementById("errorMessage").innerHTML = res.message;
      }
      history.push("/");
    };

    questionChange(ev) {
      this.setState({
        question: ev.target.value
      })
    }

    render() {

      if (this.state.finish) {
        return (
          <div><br/>
            <h6>An email was sent to {this.state.email}</h6>
            <Button variant="contained" onClick={this.props.closeDialog}>Close</Button>
          </div>
        )
      }

      return (
        <div>
          <form onSubmit={this.onSubmitRecoveryPassword.bind(this)}>
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
              onChange = {(event) => {
                this.setState({email: event.target.value})
              }}
             /><br />
            <TextField                            
              id="outlined-select-question-native"
              select
              required="true"
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
            />
          <br/><br/>
          <h6 id="errorMessage"></h6><br/>
          <div id="btnID">
              <Button variant="contained" className="SubmitButton" type="submit">Send Email</Button>
          <div className="tinyLinkContainer">
              <a className="tinyLink" href="javascript:void(0)" onClick={this.props.change}> Back to Login</a>
          </div>
          </div>
        </form>
      </div>
    );
  }    
}