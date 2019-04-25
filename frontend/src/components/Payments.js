import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import '../styles/util.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import history from '../services/History';
import Paypal from '../components/Paypal';
import CheckoutForm from '../components/CheckoutForm';
import { getProductFromCart, getFile } from '../services/ApiCall.js'
import { getUser } from '../services/ApiCall.js'
import { getUserPaymentInfo } from '../services/ApiCall.js'
import { getUserShippingInfo } from '../services/ApiCall.js'
import { checkQuantityInCartPerProduct } from '../services/ApiCall.js'
import jwt_decode from "jwt-decode";
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { addToCart } from '../services/ApiCall';
import IconButton from '@material-ui/core/IconButton';
import { SnackbarProvider, withSnackbar } from 'notistack';
import {connect} from "react-redux";
import {ResetImagesList, PopulateImagesList} from "../actions/index";


let id = 0;
function createDataForPayments(address, termsOfPayment) {
    id+=1;
    return {
        id,
        address,
        termsOfPayment
    }
}

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    },
    iconCart: {
        color: "black",
    },
    quantityField: {
        marginRight: 8,
        [`& fieldset`]: {
            borderRadius: 70,
        },
        width: 75,
        height: 30,
    },
})

const rowsPayments = [
    createDataForPayments('Via Pinco Pallo', 'Visa'),
]

const client = {
    sandbox:    '2345676543',
    // production: '123456789abcdef'
} 

 class Chart extends Component{
    constructor(props) {
      super(props);

      this.state = {
        value: '',
        qnt: '',
        pr: [],
        paymentAddresses: [],
        paymentInfo: [],
        iva: ' 2,00€',
        maxAvailability: '',
        price: [],
        totalPrice: '',
        quantity: '',
        maxAvailabilityPage: '',
        maxAvailabilityProduct: '',
      };

      this.props.ResetImagesList();
    }
    // checkQuantityPerUser() {
    //     let token = localStorage.getItem("jwt");
    //     // token !== null && checkQuantityInCartPerProduct(this.state.id, token, this.successCheckQuantity, this.errorCheckQuantity);
    // }

    successCheckQuantity = async (response) => {
        let res = await response.json();
        if (res > 0) {
            let newAvailability = this.state.maxAvailabilityProduct - res;
            this.setState({ maxAvailabilityPage: newAvailability });
        }
        if (this.state.maxAvailabilityPage > 0) {
            let number = 1;
            this.setState({ quantity: number });
        } else {
            this.setState({ quantity: 0 });
        }

    }

    errorCheckQuantity = async (response) => {

    }

    componentWillMount = async () => {
        let token = localStorage.getItem("jwt");
        let user = jwt_decode(localStorage.getItem("jwt"));
        getProductFromCart(token, this.success, this.error);
        // this.checkQuantityPerUser();

        getUser(user.email, this.successUser, this.errorUser);
        getUserPaymentInfo(user.email, this.successPayment, this.errorPayment);
        getUserShippingInfo(user.email, this.successShipping, this.errorShipping);
    }

    successImage = async (response) => {
        if (response.status === 200) {
            let res = await response.json();
            this.props.PopulateImagesList(res.encodedImage);
        }
    }
    
    success = async (response) => {
        debugger;

        let res = await response.json();
        debugger
        res.map(product => getFile(product.id, this.successImage, this.error));
        this.setState({pr: res});
        this.setState({qnt: res.length})
        this.setState({price: res.map(e => e.product.price)})
        this.calculatePrice();
    }

    calculatePrice(quant = null, id = null) {
        debugger;
        let priceTotal = 0.0;
        let q = 0;
        if(quant == null) {
            for(let i = 0; i < this.state.price.length; i++) {
                q = this.state.pr[i].quantity;
                priceTotal += (this.state.price[i] * q);
            }
            this.setState({totalPrice: priceTotal});
        }
        else {
            debugger;
            let oldPrice = this.state.totalPrice;
            var newpriceTotal = 0;

            for(var i = 0; i < this.state.price.length; i++) {
                
                debugger;
                console.log(this.state.pr[i]);
                console.log(this.state.pr[i].product.price);
                console.log(this.state.pr[i].quantity);
                q = quant;
                newpriceTotal = oldPrice + this.state.price[i];
                var x = this.state.pr[i].quantity;
                var pr = this.state.pr[i].price;
            }
            this.setState({totalPrice: newpriceTotal});
        }
       
    }
    
    error = async (response) => {
        console.log("error: "+response.json());
    }

    successUser = async (response) => {
        let resShipping = await response.json();
    }

    errorUser = async (response) => {
        console.log("Chiamata User fallita");
    }

    successPayment = async (response) => {
        debugger;
        let resPayment = await response.json();         
        if (resPayment.length > 0) {
            this.setState({paymentInfo: resPayment, paymentAddresses: resPayment.map(elem => elem.address.split(":"))});
        }
    }

    errorPayment = async (response) => {
        console.log("Chiamata Payment fallita");
    }

    successShipping = async (response) => {
        let resShipping = await response.json();
    }

    errorShipping = async (response) => {
        console.log("Chiamata Shipping fallita");
    }

    Pay() {
        alert("pagamento avvenuto con successo");
        history.push("/");
    }

    quantityChange(e) {
        let newQnt = e.currentTarget.value;
        let id = e.currentTarget.id;
        this.calculatePrice(newQnt, id);    
    }

    addProductToCart(e) {
        debugger;

        var element = document.getElementById(e);

        if(this.state.quantity > 0){
        let token = localStorage.getItem("jwt");
        token !== null && addToCart(this.state.id, this.state.quantity, token, this.successAddProdCart, this.errorAddProdCart);
        } else {
            this.props.enqueueSnackbar('No more items available', {variant: 'error',});
        }
    }

    successAddProdCart = async (response) => {
        this.props.enqueueSnackbar('Product successfully added to Cart.', {variant: 'success',});
    }

    errorAddProdCart = async (response) => {
        console.log(response);
    }

    successCheckQuantity = async (response) => {
        let res = await response.json();
        if (res > 0) {
            let newAvailability = this.state.maxAvailabilityProduct - res;
            this.setState({ maxAvailabilityPage: newAvailability });
        }
        if (this.state.maxAvailabilityPage > 0) {
            let number = 1;
            this.setState({ quantity: number });
        } else {
            this.setState({ quantity: 0 });
        }

    }

    errorCheckQuantity = async (response) => {

    }

    render() {
        const inputProps = {
            min: 0,
            max: this.state.maxAvailabilityPage,
            step: 1,
        };
        const {
            classes
        } = this.props;

        return (
            <div>
                <div id="ecco">
                <div id="contenitorePaper">
                    {this.state.pr.map(row => (
                        <div id="productDiv">
                                <Paper id="DivMoreExt" elevation={1}>
                                    <div id="imgContainer">
                                        <img id="img" width="50px" src='http://www.aziendaorlando.it/wp-content/uploads/2016/11/verdure.jpg'></img>
                                    </div>
                                    <div id="nameDescriptionContainer">
                                        <div id="nameContainer" class="infoCartPaper">
                                            {row.product.name}
                                        </div>
                                        <div id="descriptionContainer">
                                            {row.product.description}
                                        </div>
                                    </div>
                                    <div id="qntPriceContainer">
                                        <div id="qntContainer">
                                            <TextField className={classes.quantityField}
                                                id={row.product.id}
                                                inputProps={inputProps}
                                                onChange={this.handleChange}
                                                component="span"
                                                margin="normal"
                                                variant="outlined"
                                                label="Quantity"
                                                type="number"
                                                defaultValue= {row.quantity}
                                                onChange={this.quantityChange.bind(this)}
                                                // value={this.state.quantity}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <IconButton component="span" size="small" aria-label="Cart" onClick={this.addProductToCart.bind(this)}>
                                                <Icon className={classes.iconCart}>add_shopping_cart</Icon>
                                            </IconButton>
                                        </div>
                                        <div id="paymentContainer">
                                            {row.product.price + '€'} 
                                        </div>
                                    </div>
                                </Paper>
                        </div>
                    ))}
                    </div>
                    <div id="divRiepilogo">
                        <Card>
                                <CardContent>
                                    <div id="firstTab">
                                    <Typography variant="h6">
                                        <div id="cont">
                                            <div>
                                                {'Subtotale:'} 
                                            </div>
                                            <div>
                                                {'IVA:'} 
                                            </div>
                                        </div>
                                    </Typography>
                                    <Typography variant="h6">
                                        <div id="ContainerPrice">
                                            <div>
                                                {this.state.totalPrice + "€"} 
                                            </div> 
                                            <div class="price">
                                                {this.state.iva}
                                            </div>
                                        </div>
                                    </Typography>
                                    </div>
                                    <br/>
                                    <Divider/>
                                    <Typography variant="h6">
                                        <div id="tot">
                                            <div>
                                                {'Totale:'} 
                                            </div>
                                            <div id="Totprice">
                                                {this.state.totalPrice + 2 + '€'}
                                            </div>
                                        </div>
                                    </Typography>
                                </CardContent>
                                <br/>
                                <div id="divBottoni">
                                    <div id="btnPaypal">
                                            <Paypal />
                                    </div>
                                    <div id="btnStripe">
                                            <CheckoutForm />
                                    </div>
                                </div>
                                <CardActions>
                                </CardActions>
                        </Card>
                    </div>    
                </div>
                {this.state.paymentAddresses.map (ad => (
                    <Paper id="DivMoreExt2" elevation={1}>
                        <div class="infoCartPaper">Address</div>
                        <div>
                            {ad[0]+' - '} {ad[1]}
                        </div>
                    </Paper>
                ))} 
            </div>
        )
    }
            
  }    

  const mapStateToProps = ({ products }) => {
    return {
        products
    }
}
    const SnackedPaymentPage = withSnackbar(connect(mapStateToProps, {PopulateImagesList, ResetImagesList})(withStyles(styles, {withTheme: true})(Chart)));

    function IntegrationNotistack(props) {
    return (
        <SnackbarProvider maxSnack={3}>
        <SnackedPaymentPage {...props} />
        </SnackbarProvider>
    );
    }

    export default (IntegrationNotistack);

