import { Dialog } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
      backgroundColor: "transparent"
    },
  
    paper: {
      backgroundColor: "transparent",
      overflow: "hidden"
    }
  };

class TransparentDialog extends React.Component {
    handleClose = () => {
      this.props.onClose(this.props.selectedValue);
    };
  
    handleListItemClick = value => {
      this.props.onClose(value);
    };
  
    render() {
      const { classes, onClose, selectedValue, invisible, ...other } = this.props;
  
      return (
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          BackdropProps={{
            classes: {
              root: classes.root
            }
          }}
          // PaperProps={{
          //   classes: {
          //     root: classes.paper
          //   }
          // }}
        >
            {this.props.children}
        </Dialog>
      );
    }
  }
  
  TransparentDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string
  };
  
  export default withStyles(styles)(TransparentDialog);