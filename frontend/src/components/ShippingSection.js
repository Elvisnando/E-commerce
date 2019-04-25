import React from "react";
import { Paper, Typography } from "@material-ui/core";

export default class ShippingSection extends React.Component {

    render() {
        return (
            <Paper className="ProfilePaper ComponentPaper">
                <div className="component">
                    <Typography variant="h4">My Shipping Info</Typography>                            
                </div> 
                <AddressList shippingAddresses={this.props.shippingAddresses}/>
            </Paper>
        );
    }
}

export class AddressList extends React.Component {

    render () {
        return (
            <div className="addressList">
            {this.props.shippingAddresses.map((elem) =>
                <Paper className="element">
                    <Typography className="address"><b>Address</b>:<br/>{elem[0]}<br/>{elem[1]}<br/>{elem[2]}<br/>{elem[3]}</Typography>
                </Paper>
                )
            }
            </div> 
        );
    }
}