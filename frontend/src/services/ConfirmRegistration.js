
import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import history from '../services/History';

export default class ConfirmRegistration extends Component { 
    
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentWillMount () {
        this.setState({open: true});
        fetch(
            "/registration/confirm?token=" + this.props.match.params.token,
            {
                method: "GET",
                
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                }
            }
        )
        .then(this.success)
        .catch(this.error);
    }

    success = async (response) => {
        if (response.status === 200){          
            document.getElementById("messageContent").innerHTML = "Thanks for confirming your account. You can now login!";
        }
        else if (response.status === 400){
            document.getElementById("messageContent").innerHTML = "This account has already been activated. Please login.";
          
        }
        this.setState({open: true})
      };

    error = async (response) => {
        console.log("Errore nella login: " + response);
        // Gestire bad request
    }

    handleOnClick () {
        this.handleClose();
        history.push("/");
    }

    handleClose() {
        this.setState({open: false});
    }

    render () {
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Confirm Success</DialogTitle>
                        <DialogContent>
                            <h6 id="messageContent"></h6>
                            <Button variant="contained" onClick={this.handleOnClick}>Close</Button>
                        </DialogContent>                    
                </Dialog>
            </div>
        )
    }
}