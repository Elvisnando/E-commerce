import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import QuantityComponent from './QuantityComponent';
import { receiveAvailabilityProduct } from '../services/ApiCall';
import {retrieveProductDetails} from '../services/ApiCall';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { addToCart } from '../services/ApiCall';
import { checkQuantityInCartPerProduct } from '../services/ApiCall';
import { SnackbarProvider, withSnackbar } from 'notistack';
import {connect} from "react-redux";

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    elementContainer: {
        maxWidth: 900,
        marginTop: 40,
        // height: '100%',

    },
    imgdetailsContainer: {
        display: 'flex',
        // flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    img: {
        width: 355,
        // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        margin: 10,
    },
    paperRightSideDiv: {
        marginLeft: 30,
    },
    details: {
        width: 150,
        height: 'auto',
        backgroundColor: '#fffbf6',
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
    },

    buttons: {
        marginLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    description: {

        // width: '70%',

        height: '30%',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        backgroundColor: '#faf8fd',
        marginBottom: 10,

    },
    pDescription: {
        margin: 10,
        marginRight: 10,
        marginLeft: 10,
        textAlign: 'justify',

    },
    name: {
        fontSize: 22,
    },
    infoProduct: {
        fontSize: 15,
        // fontFamily: "Courier New, Courier, monospace",
        margin: 0,
    },
    li: {
        fontSize: 17,
        // fontFamily: "Comic Sans MS, cursive, sans-serif",

    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    buttonCart: {
        backgroundColor: '#b3d7ff',
        width: 'auto',
        height: 'auto',
        size: 'auto',
    },
    quantityField: {
        marginRight: 8,
        [`& fieldset`]: {
            borderRadius: 70,
        },
        width: 75,
        height: 30,
    },
    iconCart: {
        color: 'black',
    },
})



class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            imageIndex: this.props.match.params.imageIndex,
            name: '',
            origin: '',
            quantity: '',
            maxAvailabilityPage: '',
            maxAvailabilityProduct: '',
            expiryDate: '',
            price: '',
            image: ''
        }
    }

    componentWillMount() {
        console.log(this.state.id);
        this.retrievePrDetails();
        this.checkQuantityPerUser();
    }

    retrievePrDetails(){
        retrieveProductDetails(this.state.id, this.successDetailsP, this.errorDetailsP) 
    } 

    successDetailsP = async (response) => {
        let res = await response.json();
        console.log(res);
        this.setState({
            name: res.name, 
            region: res.region, 
            maxAvailabilityPage: res.availability,
            maxAvailabilityProduct: res.availability, 
            productionDate: res.productionDate, 
            price: res.price })
    }

    errorDetailsP(){

    }

    
    handleChange = () => {
        let value = document.getElementById('quantity').value;
        if (value < 0) {
            this.setState({quantity: 0});
        } else if (value > this.state.maxAvailabilityPage) {
            this.setState({quantity: this.state.maxAvailabilityPage});
        } else {
            this.setState({quantity: value});
        }
    };

    addProductToCart = () => {
        if(this.state.quantity > 0){
        console.log("clicked");
        //
        console.log(this.state.quantity);
        let token = localStorage.getItem("jwt");
        token !== null && addToCart(this.state.id, this.state.quantity, token, this.successAddProdCart, this.errorAddProdCart);
        } else {
            this.props.enqueueSnackbar('No more items available', {variant: 'error',});
        }
    }

    successAddProdCart = async (response) => {
        this.checkQuantityPerUser();
        console.log(response);
        this.props.enqueueSnackbar('Product successfully added to Cart.', {variant: 'success',});
    }

    errorAddProdCart = async (response) => {
        console.log(response);
    }

    checkQuantityPerUser() {
        let token = localStorage.getItem("jwt");
        token !== null && checkQuantityInCartPerProduct(this.state.id, token, this.successCheckQuantity, this.errorCheckQuantity);
    }

    successCheckQuantity = async (response) => {
        //
        let res = await response.json();
        if (res > 0) {
            //console.log("MAX availability product");
            //console.log(this.state.maxAvailabilityProduct);
            let newAvailability = this.state.maxAvailabilityProduct - res;
            //console.log("new availability");
            //console.log(newAvailability);
            this.setState({ maxAvailabilityPage: newAvailability });
            //console.log("new max availability page");
            //console.log(this.state.maxAvailabilityPage);
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
        const { classes, theme } = this.props;
        //var maxAvailability = this.state.maxAvailability;
        const inputProps = {
            min: 0,
            max: this.state.maxAvailabilityPage,
            step: 1,
        };
        
        return (
            //MAIN DIV
            <div className={classes.container}>

                <div className={classes.elementContainer}>

                    <div className={classes.imgdetailsContainer}>
                        <Paper>
                            <div className={classes.img}>
                                <img
                                    src={"data:image/jpeg;base64," + this.props.products.images[this.state.imageIndex]}
                                    alt="product"
                                    width="100%"
                                    height="100%"
                                >
                                </img>
                            </div>
                        </Paper>

                        <Paper className={classes.paperRightSideDiv}>
                            <div>
                                <div className={classes.details}>
                                    <p className={classes.name}>{this.state.name}</p>

                                    <p className={classes.infoProduct}>Origin</p>
                                    <ul>
                                        <li className={classes.li}>{this.state.region}</li>
                                    </ul>

                                    <p className={classes.infoProduct}>Picies Available</p>
                                    <ul>
                                        <li className={classes.li}>{this.state.maxAvailabilityPage}</li>
                                    </ul>

                                    <p className={classes.infoProduct}>Expiry-Date</p>
                                    <ul>
                                        <li className={classes.li}>{this.state.productionDate}</li>
                                    </ul>

                                    <p className={classes.infoProduct}>Price</p>
                                    <ul>
                                        <li className={classes.li}>{this.state.price}</li>
                                    </ul>
                                </div>
                                <div className={classes.buttons}>
                                    <TextField className={classes.quantityField}
                                        inputProps={inputProps}
                                        onChange={this.handleChange}
                                        component="span"
                                        margin="normal"
                                        variant="outlined"
                                        label="Quantity"
                                        type="number"
                                        id="quantity"
                                        value={this.state.quantity}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <IconButton component="span" size="small" aria-label="Cart" onClick={this.addProductToCart}>
                                        <Icon className={classes.iconCart}>add_shopping_cart</Icon>
                                    </IconButton>

                                </div>


                            </div>


                        </Paper>
                    </div>



                    <Paper>
                        <div className={classes.description}>
                            <p className={classes.pDescription}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                        </p>
                        </div>
                    </Paper>





                </div>



            </div>
            //END MAIN DIV
        )
    }
}

ProductPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ products }) => {
    return {
        products
    }
}

// const SnackedProductPage = withSnackbar(ProductPage);
const SnackedProductPage = withSnackbar(connect(mapStateToProps)(withStyles(styles)(ProductPage)));

function IntegrationNotistack(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <SnackedProductPage {...props} />
    </SnackbarProvider>
  );
}

export default (IntegrationNotistack);
