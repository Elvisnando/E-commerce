
import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, Button, TextField } from "@material-ui/core";
import history from '../services/History';
import { resetPassword } from "./ApiCall";

export default class RecoveryPassword extends Component { 
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
    }

    componentWillMount () {
        this.setState({open: true});
    }

    error = async (response) => {
        console.log("Errore nella login: " + response);
        // Gestire bad request
    }

    success = async (response) => {
        if (response.status === 200){
            this.setState({open: false, openSuccess: true});
          }
          // Manage other response.code
    }

    handleCloseSuccess() {
        this.setState({openSuccess: false});
        history.push("/");
    }

    handleClick() {
        let password = document.getElementById("password").value;
        let passwordConfirm = document.getElementById("passwordConfirm").value;
        if (password !== passwordConfirm) {
            document.getElementById("errorTitle").innerHTML= "Password doesn't mathces";
            return;
        }
        resetPassword(this.props.match.params.token, password, this.success, this.error);
    }

    render () {
        return (
            <div>
                <Dialog open={this.state.open}>
                    <DialogTitle>Recovery Password Form</DialogTitle>
                        <DialogContent>
                            <TextField
                            required="true"
                            // error={this.errorTrue(this.state.password_business)}
                            id="password"
                            className="TextField"
                            label="Password"
                            type="password"
                            // helperText={this.helperText(this.state.password_business, 'Password')}
                            // autoComplete="password"
                            margin="dense"
                            variant="outlined"
                            // onChange = {(event) => {
                            //     this.setState({password_business: event.target.value})
                            // }
                            // }
                            />
                            <TextField
                            required="true"
                            // error={this.errorTrue(this.state.password_business)}
                            id="passwordConfirm"
                            className="TextField"
                            label="Confirm Password"
                            type="password"
                            // helperText={this.helperText(this.state.password_business, 'Password')}
                            // autoComplete="password"
                            margin="dense"
                            variant="outlined"
                            // onChange = {(event) => {
                            //     this.setState({password_business: event.target.value})
                            // }
                            // }
                            /><br />
                            <h6 id="errorTitle"></h6>
                            <Button variant="contained" onClick={this.handleClick}>Save</Button>
                        </DialogContent>                    
                </Dialog>
                <Dialog open={this.state.openSuccess} aria-labelledby="form-dialog-title_Success">
                    <DialogTitle id="successDialog">Success</DialogTitle>
                    <DialogContent>
                        <h6>Password salvata correttamente</h6>
                        <Button variant="contained" onClick={this.handleCloseSuccess}>Close</Button>                    
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}