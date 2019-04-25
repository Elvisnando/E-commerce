import React, { Component } from "react";
import '../styles/style.css';
import { connect } from "react-redux";
import { loginSuccess, toggleToken } from "../actions";
import Register from "../components/Register";
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import history from '../services/History';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Login from "../screens/Login";
import '../styles/util.css';

import jwt_decode from "jwt-decode";
import Waiting from "./Waiting";
import RecoveryPassword from "./RecoveryPassword";

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { getProductFromCart } from '../services/ApiCall.js'
import {saveProductsInCart} from '../actions/index';
import { Icon } from "@material-ui/core";


const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClickOpenRegistrationBuyer = this.handleClickOpenRegistrationBuyer.bind(this);
    this.handleCloseRegistrationBuyer = this.handleCloseRegistrationBuyer.bind(this);
    this.handleClickOpenRegistrationBusiness = this.handleClickOpenRegistrationBusiness.bind(this);
    this.handleCloseRegistrationBusiness = this.handleCloseRegistrationBusiness.bind(this);
    this.handleCloseForgetPassword = this.handleCloseForgetPassword.bind(this);
    this.handleClickOpenLogin = this.handleClickOpenLogin.bind(this);
    this.handleCloseLogin = this.handleCloseLogin.bind(this);
    this.handleClickOpenWait = this.handleClickOpenWait.bind(this);
    this.handleCloseWait = this.handleCloseWait.bind(this);
    this.goToBusiness = this.goToBusiness.bind(this);
    this.goToBuyer = this.goToBuyer.bind(this);
    this.goToRecoveryPassword = this.goToRecoveryPassword.bind(this);
    this.backToLogin = this.backToLogin.bind(this);
    this.goToWait = this.goToWait.bind(this);
  }

  componentWillMount = async () => {
    let token = localStorage.getItem("jwt");
    console.log(token);
      token !== null && getProductFromCart(token, this.success, this.error);  
}


success = async (response) => {
    let res = await response.json();
    this.setState({pr: res});
    this.props.saveProductsInCart(res);
    this.setState({qnt: res.length})
    this.props.saveProductsInCart(this.state.pr);
}

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }
  handleClickOpenLogin = () => {
    this.setState({ openLogin: true });
  };

  handleCloseLogin = () => {
    this.setState({ openLogin: false });
  };

  handleClickOpenWait = () => {
    this.setState({ openWait: true });
  };

  handleCloseWait = () => {
    this.setState({ openWait: false });
  };

  handleClickOpenRegistrationBuyer = () => {
    this.setState({ openRegistrationBuyer: true });
  };

  handleCloseRegistrationBuyer = () => {
    this.setState({ openRegistrationBuyer: false });
  };

  handleClickOpenRegistrationBusiness = () => {
    this.setState({ openRegistrationBusiness: true });
  };

  handleCloseRegistrationBusiness = () => {
    this.setState({ openRegistrationBusiness: false });
  };

  handleClickOpenForgetPassword = () => {
    this.setState({ openForgetPassword: true });
  };

  handleCloseForgetPassword = () => {
    this.setState({ openForgetPassword: false });
  }

  handleClickOpenLogin = () => {
    this.setState({ openLogin: true });
  };

  handleCloseLogin = () => {
    this.setState({ openLogin: false });
  };

  OnClickAdminPages(e) {
    //window.location.replace("/AdminPage");
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleLogout() {
    localStorage.removeItem("jwt");
    this.props.toggleToken();

    history.push("/");
  };

  goToBusiness() {
    this.handleCloseRegistrationBuyer();
    this.handleClickOpenRegistrationBusiness();
  }

  goToBuyer() {
    this.handleCloseRegistrationBusiness();
    this.handleClickOpenRegistrationBuyer();
  }

  goToRecoveryPassword() {
    this.handleCloseLogin();
    this.handleClickOpenForgetPassword();
  }

  goToWait() {
    this.handleClickOpenWait();
  }

  backToLogin() {
    this.handleCloseForgetPassword();
    this.handleClickOpenLogin();
  }

  render() {
    if (localStorage.hasOwnProperty('jwt')) {
      let decodeToken = jwt_decode(localStorage.getItem('jwt'));
      return (
        <div className="navBar">
          <a href="/"><b>HOME</b></a>
          <a href="/"><b>ABOUT US</b></a>
          <a href="/payments">
            <IconButton component="span" size="large">
              <Icon>shopping_cart</Icon>
            </IconButton>
            </a>
          <a href="#">
            <IconButton component="span" size="large" onClick={this.props.openMenu}>
              <Icon>menu</Icon>
            </IconButton>
          </a>
        </div>
      )
    }
    return (
      <div className="navBar">
        <a href="/"><b>HOME</b></a>
        <a href="/"><b>ABOUT US</b></a>
        <a href="#" onClick={this.handleClickOpenLogin}><b>LOGIN</b></a>
        <a href="#" onClick={this.handleClickOpenRegistrationBuyer}><b>REGISTER</b></a>

        <Dialog open={this.state.openLogin} onClose={this.handleCloseLogin} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" onClose={this.handleCloseLogin}>Login</DialogTitle>
          <DialogContent>
            <Login setLogginStatus={this.props.loginSuccess} setToken={this.props.setToken} closeDialog={this.handleCloseLogin} change={this.goToRecoveryPassword}/>
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.openRegistrationBuyer} onClose={this.handleCloseRegistrationBuyer} aria-labelledby="form-dialog-title_Register">
          <DialogTitle id="form-dialog-title_Register" onClose={this.handleCloseRegistrationBuyer}>Registration User Form</DialogTitle>
          <DialogContent>
            <Register open={"buyer"} changeForm={this.goToBusiness} closeDialog={this.handleCloseRegistrationBuyer} waitOpen={this.handleClickOpenWait} waitClose={this.handleCloseWait}/>
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.openRegistrationBusiness} onClose={this.handleCloseRegistrationBusiness} aria-labelledby="form-dialog-title_Register">
          <DialogTitle id="form-dialog-title_Register" onClose={this.handleCloseRegistrationBusiness}>Registration Business Form</DialogTitle>
          <DialogContent>
            <Register open={"business"} changeForm={this.goToBuyer} closeDialog={this.handleCloseRegistrationBusiness} waitOpen={this.handleClickOpenWait} waitClose={this.handleCloseWait}/>
          </DialogContent>
        </Dialog> 
        <Dialog open={this.state.openWait} aria-labelledby="form-dialog-title_Wait">
            <DialogContent>
              <Waiting/>   
            </DialogContent>
          </Dialog>   
        <Dialog open={this.state.openForgetPassword} onClose={this.handleCloseForgetPassword} aria-labelledby="form-dialog-title_ForgetPassword">
          <DialogTitle id="form-dialog-title_ForgetPassword">Recovery Password Form</DialogTitle>
          <DialogContent>
            <RecoveryPassword changeForm={this.backToLogin} closeDialog={this.handleCloseForgetPassword} waitOpen={this.handleClickOpenWait} waitClose={this.handleCloseWait}/>
          </DialogContent>            
        </Dialog>
      </div>
    )
  }

  renderButton() {
    if (localStorage.hasOwnProperty('jwt')) {
      let decodeToken = jwt_decode(localStorage.getItem('jwt'));
      return (
        <div>
          <ul className="navBar">
          <li><a href="javascript:void(0);" onClick={this.props.openMenu}>Menu</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/tempproducts">Temp Products</a></li>       
            <li style={{ float: "right" }}>
              <a onClick={this.handleLogout} className="active">Logout</a>
            </li>
            <li style={{ float: "right" }}>
              <a href="javascript:void(0);" onClick={this.openAccountMenu}>Hi, {decodeToken.name}</a>
            </li>
            <li style={{ float: "right" }}>
            <a href="/Payments" className="active">
              
              <Badge badgeContent={ this.props.products.productsInCart.length} showZero={true} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </a>
          </li>
          </ul>
          
        </div>);
    }
    return (
      <div>
        <ul className="navBar">
        <li><a href="/">Home</a></li>
        
          <li style={{ float: "right" }}>
            <a href="javascript:void(0);" className="active" onClick={this.handleClickOpenRegistrationBuyer}>Register</a>
          </li>
          <li style={{ float: "right" }}>
            <a href="javascript:void(0);" className="active" onClick={this.handleClickOpenLogin}>Login</a>
          </li>
        </ul> 
        <Dialog open={this.state.openLogin} onClose={this.handleCloseLogin} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" onClose={this.handleCloseLogin}>Login</DialogTitle>
          <DialogContent>
            <Login setLogginStatus={this.props.loginSuccess} setToken={this.props.setToken} closeDialog={this.handleCloseLogin} change={this.goToRecoveryPassword}/>
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.openRegistrationBuyer} onClose={this.handleCloseRegistrationBuyer} aria-labelledby="form-dialog-title_Register">
          <DialogTitle id="form-dialog-title_Register" onClose={this.handleCloseRegistrationBuyer}>Registration User Form</DialogTitle>
          <DialogContent>
            <Register open={"buyer"} changeForm={this.goToBusiness} closeDialog={this.handleCloseRegistrationBuyer} waitOpen={this.handleClickOpenWait} waitClose={this.handleCloseWait}/>
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.openRegistrationBusiness} onClose={this.handleCloseRegistrationBusiness} aria-labelledby="form-dialog-title_Register">
          <DialogTitle id="form-dialog-title_Register" onClose={this.handleCloseRegistrationBusiness}>Registration Business Form</DialogTitle>
          <DialogContent>
            <Register open={"business"} changeForm={this.goToBuyer} closeDialog={this.handleCloseRegistrationBusiness} waitOpen={this.handleClickOpenWait} waitClose={this.handleCloseWait}/>
          </DialogContent>
        </Dialog> 
        <Dialog open={this.state.openWait} aria-labelledby="form-dialog-title_Wait">
            <DialogContent>
              <Waiting/>   
            </DialogContent>
          </Dialog>   
        <Dialog open={this.state.openForgetPassword} onClose={this.handleCloseForgetPassword} aria-labelledby="form-dialog-title_ForgetPassword">
          <DialogTitle id="form-dialog-title_ForgetPassword">Recovery Password Form</DialogTitle>
          <DialogContent>
            <RecoveryPassword changeForm={this.backToLogin} closeDialog={this.handleCloseForgetPassword} waitOpen={this.handleClickOpenWait} waitClose={this.handleCloseWait}/>
          </DialogContent>            
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ login, products }) => {
  return {
    login,
    products
  }
}

export default connect(mapStateToProps, { loginSuccess, toggleToken, saveProductsInCart })(NavBar);
