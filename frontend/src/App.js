import React from "react";
import {Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import NavBar from "./components/NavBar";
import ConfirmRegistartion from "./services/ConfirmRegistration";
import ListProducts from './screens/ListProducts';
import history from './services/History';
import Footer from "./components/Footer";
import Payments from "./components/Payments";
import "./styles/global.css";
import RecoveryPassword from "./services/RecoveryPassword";
import Profile from "./screens/Profile";
import AddProduct from "./screens/AddProduct";
import ProductsView from "./screens/ProductsView";
import ProductPage from "./components/ProductPage";
import SideBar from "./components/SideBar";
import PentaCoinPayment from "./components/PentaCoinPayment";
import {connect} from "react-redux";
import {toggleToken} from "./actions/index";




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.props.toggleToken();
    this.handleDrawerClose();
    history.push("/");
  };

  render() {
    return (
        <Router history={history}>
          <div className="principal">
            <NavBar openMenu={this.handleDrawerOpen} position='fixed' />
            <div className="wrap">
              <SideBar open={this.state.open} handleDrawerClose={this.handleDrawerClose} handleLogout={this.handleLogout}/>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product" component={ProductsView} />
                <Route exact path="/payments" component={Payments} />
                <Route exact path="/InsertProduct" component={AddProduct} />
                {/* <Route exact path="/product" component={ListProducts} /> */}
                <Route exact path="/reset_password/:token" component={RecoveryPassword} />
                <Route path="/register/:token" component={ConfirmRegistartion} />
                <Route path="/profile" component={Profile}/>
                <Route exact path="/products/:id/:imageIndex" component={ProductPage} />
                {/* <Route path="/test/:id" component={ProductPage} /> */}
                <Route exact path="/test" component={PentaCoinPayment} />
                <Route component={() => <div>No such page!</div>} />
              </Switch>
            </div>
            <Footer/>
          </div>
        </Router>
    );
  }
}

const mapStateToProps = ({login}) => {
  return {
    login
  }
}

export default connect(mapStateToProps, {toggleToken})(App);
