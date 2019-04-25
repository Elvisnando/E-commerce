import React from "react";
import { Paper, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Icon, IconButton } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class BillingSection extends React.Component {

    render () {          
        return (
        <Paper className="ProfilePaper ComponentPaper">
            <div className="component">
                <Typography variant="h4">My Billing Info</Typography>                            
            </div>
            {this.props.paymentInfo.length > 0 &&
                <div className="billingList">
                <div className="billingListLabel">
                    <Typography className="number"><b>Card number</b></Typography>
                    <Typography className="expiry"><b>Expiry</b></Typography>
                </div>                                                           
                    {this.props.paymentInfo.map((elem, index) =>
                        <PanelComponent elem={elem} index={index} paymentAddresses={this.props.paymentAddresses}/>                           
                        )
                    }                                    
                    <IconButton component="span"size="small" aria-label="Edit" onClick={this.props.handleAddBillingInfo}>
                        <Icon>add</Icon>
                    </IconButton>                             
                </div> 
            }           
        </Paper>
        )       
    }
}

export class PanelComponent extends React.Component {

    render() {
        return (
            <ExpansionPanel className="billingInfoContent">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="billingInfoElementNumber">Card ends with {this.props.elem.cardNumber.slice(12)}</Typography>
                    <Typography className="billingInfoElementExpiry">{this.props.elem.expiryDate}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="ExpansionPanelDetails">
                    <div className="first"><Typography><b>Card owner</b>:<br/>{this.props.elem.cardOwner}</Typography></div>                                           
                    <div className="second"><Typography><b>Associated address</b>:<br/>{this.props.paymentAddresses[this.props.index][0]}<br/>{this.props.paymentAddresses[this.props.index][1]}<br/>{this.props.paymentAddresses[this.props.index][2]}<br/>{this.props.paymentAddresses[this.props.index][3]}</Typography></div>                                
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}