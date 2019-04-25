import React, { Component } from "react";
import { Paper, TextField, Typography, Card, CardContent, CardActionArea, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Fab, Icon, IconButton} from "@material-ui/core";
import "../styles/paper.css";
import jwt_decode from "jwt-decode";
import { getUser, updateUser, getUserPaymentInfo, getUserShippingInfo } from "../services/ApiCall";
import { SnackbarProvider, withSnackbar } from 'notistack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import ProfileCard from "../components/ProfileCard";
import ProfilePaper from "../components/ProfilePaper";
import AccountSection, { AccountList } from "../components/AccountSection";
import BillingSection, { PanelComponent } from "../components/BillingSection";
import ShippingSection from "../components/ShippingSection";


const userList = ["name", "surname", "birthday", "email", "password"];

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: false,
            billing: false,
            shipping: false,
            open : 'null',
            fieldStates: [true, true, true, true, true],
            fieldChanges: [false, false, false, false, false],
            changes: false,
            shippingAddresses: [],
            paymentAddresses: [],
            paymentInfo: []
        }
        
    }

    error = async (response) => {
        console.log("Errore nella login: " + response);
    };
  
    successUser = async (response) => {
        if (response.status === 200){
            let res = await response.json();
            this.setState({user: res});
            console.log(res);
            debugger;
        }
    };

    successPayment = async (response) => {
        if (response.status === 200){         
            let res = await response.json();
            if (res.length > 0) {
                this.setState({paymentInfo: res, paymentAddresses: res.map(elem => elem.address.split(":"))});
            }
        }
    }

    successShipping = async (response) => {
        if (response.status === 200){           
            let res = await response.json();
            if (res.length > 0) {
                this.setState({shippingAddresses: res.map(elem => elem.address.split(":"))});
            }
        }
    }

    componentWillMount () {
        let user = jwt_decode(localStorage.getItem("jwt"));
        getUser(user.email, this.successUser, this.error);
        getUserPaymentInfo(user.email, this.successPayment, this.error);
        getUserShippingInfo(user.email, this.successShipping, this.error);
    }

    openInfo = (value) => {
        this.setState({open: value});
    }

    checkFieldChanges = () => {
        if (this.state.fieldChanges[0] || this.state.fieldChanges[1] || this.state.fieldChanges[2] || this.state.fieldChanges[3] ||this.state.fieldChanges[4]) {
            this.setState({changes: true});
        } else {
            this.setState({changes: false});
        }
    }

    handleTextFieldChange = (field) => {              
        if (this.state.user[userList[field]] !== document.getElementById(userList[field]).value) {
            let newState = this.state.fieldChanges;
            newState[field] = true;        
            this.setState({fieldChanges: newState});
        } else {
            let newState = this.state.fieldChanges;
            newState[field] = false;        
            this.setState({fieldChanges: newState});            
        }
        this.checkFieldChanges();
    } 

    handleChange = (field) => {
        let newState = this.state.fieldStates;
        newState[field] = false;
        
        this.setState({fieldStates: newState})
    }

    handleUndo = (field) => {
        let newFieldChanges = this.state.fieldChanges;
        let newFieldState = this.state.fieldStates;
        newFieldState[field] = true;        
        newFieldChanges[field] = false;
        this.setState({fieldStates: newFieldState, fieldChanges: newFieldChanges})
        document.getElementById(userList[field]).value = this.state.user[userList[field]];
        this.checkFieldChanges();
    }

    handleAddBillingInfo = () => {

    }

    handleSave = () => {
        let name = document.getElementById("name").value;
        let surname
        updateUser(document.getElementById("name").value, document.getElementById("surname").value, document.getElementById("birthday").value, document.getElementById("password").value, this.saveSuccess, this.error);
        this.setState({user: {name: document.getElementById("name").value, surname: document.getElementById("surname").value, birthday: document.getElementById("birthday").value, password: document.getElementById("password").value}})
    }

    saveSuccess = async (response) => {
        if (response.status === 200){           
            this.setState({
                fieldStates: [true, true, true, true, true],
                fieldChanges: [false, false, false, false, false],
                changes: false
            })
            this.props.enqueueSnackbar('User Info successfully updated.', {variant:"success"});
        }
    };    

    render() {
        let account = jwt_decode(localStorage.getItem("jwt"));     
        return (
            <div className="profileContainer">
                <div className="profileContent">
                    <ProfilePaper name={account.name} openInfo={this.openInfo}/>
                    
                    {this.state.open === "account" &&          
                        <AccountSection 
                        changes={this.state.changes} 
                        handleSave={this.handleSave}
                        fieldStates={this.state.fieldStates} 
                        user={this.state.user}
                        handleChange={this.handleChange}
                        handleTextFieldChange={this.handleTextFieldChange}
                        handleUndo={this.handleUndo}
                        />
                    }

                    {this.state.open === "billing" &&          
                        <BillingSection  
                        handleAddBillingInfo={this.handleAddBillingInfo}
                        paymentAddresses={this.state.paymentAddresses}
                        paymentInfo={this.state.paymentInfo}
                        />
                    }                       

                    {this.state.open === "shipping" &&            
                        <ShippingSection
                        shippingAddresses={this.state.shippingAddresses}
                        />
                    }              
                </div>
            </div>
        )
    }
}

const SnackedProfile = withSnackbar(Profile);

function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <SnackedProfile />
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;