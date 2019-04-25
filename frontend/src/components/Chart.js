import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import '../styles/util.css';
import {connect} from 'react-redux';
import {saveProductsInCart} from '../actions/index';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import history from '../services/History';
import { getProductFromCart } from '../services/ApiCall.js'
import { deleteItemToChart } from '../services/ApiCall.js'
import { emptyCart } from '../services/ApiCall.js'


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
})

 class Chart extends Component{
    constructor(props) {
      super(props);

      this.state = {
        value: '',
        qnt: 0,
        pr: [],
        quantita:'',
        quantitaScelta:[],
        quantitaTotale: '',
        quantinty:'',
        singleQuantity:[]
      };
    }

    componentWillMount = async () => {
        let token = localStorage.getItem("jwt");
        getProductFromCart(token, this.success, this.error);
        
    }
    

    success = async (response) => {
        let res = await response.json();
        console.log(res);
        debugger;
        
        this.setState({pr: res});
        this.setState({qnt: res.length})
        this.setState({singleQuantity: this.state.pr.quantinty})
        this.setState({quantitaScelta: res.map(row => row.quantity)})
        this.setState({quantitaTotale: this.state.quantitaScelta})
    }

    error = async (response) => {
        debugger;
    }

    quantitiesChange(ev) {
        if(ev.target.value === "" || ev.target.value === undefined) {
          this.setState({
            quantita: this.state.pr.quantita
          })
        }
      }

    goToPayment() {
        history.push("/payments");
    }

    emptyCart() {
        debugger;
        let token = localStorage.getItem("jwt");
        emptyCart(token, this.succe, this.erro);
    }

    succe = async(response) =>  {
        debugger;
        let token = localStorage.getItem("jwt");
        getProductFromCart(token, this.succep, this.errorp);
        this.props.saveProductsInCart([]);
    }

    erro = async(response) =>  {
        debugger;
    }

    deleteProduct(idItems) {
        console.log("identificatore: " +idItems.currentTarget.id);
        let token = localStorage.getItem("jwt");
        debugger;
        let intId = parseInt(idItems.currentTarget.id);
        deleteItemToChart(intId, token, this.succex, this.errorx);
        
    }

    succex = async (response) => {
        debugger;
        let token = localStorage.getItem("jwt");
        getProductFromCart(token, this.su, this.er);
    }

    su = async(response) => {
        debugger;
        let res = await response.json();
        this.setState({pr: res});
        this.setState({qnt: res.length})
        this.props.saveProductsInCart(res);
    }
    
    er  = async (response) => {
        debugger;
    }

    succep = async(response) => {
        let res = await response.json();
        this.setState({pr: res});
        this.setState({qnt: res.length})
    }

    errorx  = async (response) => {
    }

    render() {
        return (
            <div>
            <div id="contenitoreEsterno">
                <div id="idTable">
                    <Paper elevation={1}>
                        <Typography component="p">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.pr.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">{row.product.name}</TableCell>
                                        <TableCell align="right">{row.product.price}</TableCell>
                                        <TableCell align="right">
                                            <TextField
                                                id={row.product.id}
                                                label="Quantities"
                                                type="number"
                                                name="Quantities"
                                                value=  {row.quantity}
                                                margin="normal"
                                                variant="outlined"
                                                onChange={this.quantitiesChange.bind(this)} 
                                            />
                                            <Button id={row.product.id} onClick={this.deleteProduct.bind(this)}>delete</Button>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Typography>
                </Paper>
            </div>
                <div id="divRiepilogo">
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                            {'Number of Products to Buy: ' + this.state.qnt }
                            </Typography>
                            <br/>
                            <Typography variant="h5" component="h2">
                            {'Total Price: ' + this.state.quantitaTotale }
                            </Typography>
                        </CardContent>
                        <br/>
                        <CardActions>
                            <Button id="btn" size="small" onClick={(event) => this.goToPayment()}>Proceed with the Purchase</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
                <Button id="btn" size="small" onClick={(event) => this.emptyCart()}>Empty the Cart</Button>
            </div>
        );
    }
            
  }    

  export default connect(null, {saveProductsInCart})(withStyles(styles, {withTheme: true})(Chart));
