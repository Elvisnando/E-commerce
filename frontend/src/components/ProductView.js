import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { addToCart } from '../services/ApiCall';
import Button from '@material-ui/core/Button';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getProductFromCart } from '../services/ApiCall.js'
import {saveProductsInCart} from '../actions/index';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }


});

class PaperSheet extends Component {
  
  constructor(props) {
    super();

    this.state = {
      product: [],
      classes: props,
      age: 1,
      open: false,
      insert: false,
      pr: []
    }
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  componentWillMount() {
    let id = this.props.match.params.id;
    let prod = this.props.products.productsList;
    for (let c=0; c < prod.length; c++) {
      if (prod[c].id  == id) {
        this.setState({product:prod[c]})
      }
    }
    console.log(this.product);
  }
   /* axios.post("/Cart/add", { 
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer "+ localStorage.getItem("jwt")
    },
      p })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })*/

  handlerClick = (id) => {
     
      addToCart(id,this.state.age,localStorage.getItem("jwt"),this.succes,this.error);
      this.setState({insert: true});
      getProductFromCart(localStorage.getItem("jwt"), this.success, this.error);
      
      //this.props.history.push('/Chart');
  }
  success = async (response) => {
    let res = await response.json();
    this.setState({pr: res});
    this.props.saveProductsInCart(this.state.pr);
    this.props.history.push('/product');
}

  render() {
  return (
    <div>
      <Paper className={this.state.classes.root}  elevation={1}>

      <Typography   component="p">
          <img width="250" height="250" src="https://www.tpi.it/app/uploads/2019/01/heart-3147976_1920-2.jpg"/>
      </Typography>

        <Typography   variant="h5" component="h3">
          Product: {this.state.product.name}
          ID: {this.state.product.id}
        </Typography>
        
        <Typography   component="p">
        Description: {this.state.product.description}
        <p></p>
        Price: {this.state.product.price}
        </Typography>

        <form autoComplete="off">
        <FormControl className={this.state.classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">
            Quantity
          </InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: "age",
              id: "demo-controlled-open-select",
              
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </form>
        <Button variant="contained" color="primary" className={this.state.classes.button}  onClick= {() => this.handlerClick(this.state.product.id)}>Add To cart</Button>
      </Paper>
            
    </div>
  );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ products }) => {
  return {
      products
  }
}

export default connect(mapStateToProps, {saveProductsInCart})(withStyles(styles)(PaperSheet));