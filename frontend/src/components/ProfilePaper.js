import React from "react";
import { Paper, Typography } from "@material-ui/core";
import ProfileCard from "./ProfileCard";

export default class ProfilePaper extends React.Component {

    render() {
        return (
            <Paper className="ProfilePaper">
                <Typography variant="h4">Account Info</Typography>
                <Typography className="profileDescription" variant="subtitle1">Hi {this.props.name},<br/>from here you can manage your account info</Typography>
                <div className="cardList">
                    <ProfileCard openInfo={() => this.props.openInfo("account")} first="Account Info" second={<span>Manage login, name, account information.<br/><br/></span>}/>
                    <ProfileCard openInfo={() => this.props.openInfo("billing")} first="Billing Info" second={<span>Manage your payment info, add new method, delete existing ones.</span>}/>
                    <ProfileCard openInfo={() => this.props.openInfo("shipping")} first="Shipping info" second={<span>Manage your shipping info, add new addresses, delete existing ones.</span>}/>                        
                </div>              
            </Paper>
        );
    }
}