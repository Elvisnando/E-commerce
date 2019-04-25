import React from "react";
import { Typography, Button } from "@material-ui/core";
import TransparentDialog from "./TransparentDialog";
import Home from "../screens/Home";

class Test extends React.Component {
    state = {
      open: false,
      selectedValue: "cristian"
    };
  
    handleClickOpen = () => {
      this.setState({
        open: true
      });
    };
  
    handleClose = value => {
      this.setState({ selectedValue: value, open: false });
    };
  
    render() {
      return (
        <div>
          <Typography variant="subheading">
            Selected: {this.state.selectedValue}
          </Typography>
          <br />
          <Button onClick={this.handleClickOpen}>Open simple dialog</Button>
          <TransparentDialog
            open={this.state.open}
            onClose={this.handleClose}
          >
            <Home/>
          </TransparentDialog>
        </div>
      );
    }
  }
  
  export default Test;