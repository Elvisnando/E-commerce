import React, { Component } from "react";
import { TextField} from "@material-ui/core";
import {PopulateProductsList, PopulateImagesList, ResetImagesList} from "../actions";
import {connect} from "react-redux";
import "../styles/util.css";
import {receiveProductByName, getFile} from "../services/ApiCall";
import history from '../services/History';
import 'font-awesome/css/font-awesome.min.css';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { string } from "prop-types";

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChanged = this.handleChanged.bind(this);
        this.handleTry = this.handleTry.bind(this);
        this.state = {
            location: '',
            producer: '',
            min: '',
            max: '',
            expireDate: '',
            availability: '',
            prd : []
        }

    }

    handleTry(e) {
        e.preventDefault();
        console.log(this.props.products);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.ResetImagesList();
        let nameSearch = document.getElementById("searchBarText").value;
        
        if(nameSearch != "") {
            receiveProductByName(nameSearch, this.successProducts, this.error);            
        }
    }

    // handleChanged(e) {
    //     this.props.ResetImagesList();
    //     e.preventDefault();
    //     let nameSearch = document.getElementById("searchBarText").value;
    //     debugger
    //     receiveProductByName(nameSearch, this.successProducts, this.error);
    // }

    error = async (response) => {
        console.log("Error in  login: " + response);
    }

    successProducts = async (response) => {
        if (response.status === 200) {        
            let productsList = await response.json();
            await this.props.PopulateProductsList(productsList);
            this.props.products.productsList.map(product =>  getFile(product.id, this.success, this.error));        
       }
    }

    success = async (response) => {
        if (response.status === 200) {
            let res = await response.json();
            this.props.PopulateImagesList(res.encodedImage);
            history.push('/product');
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="searchBarDiv" autocomplete="off">
                <TextField
                id="searchBarText"
                className="TextField"
                placeholder="Search"
                margin="dense"
                variant="outlined"
                fullWidth 
                // onChange = {this.handleChanged}
                />
                <IconButton className="searchBarButton" aria-label="Search" type="submit">
                    <SearchIcon/>
                </IconButton>
            </form>  
        );
    }

}

const mapStateToProps = ({ products }) => {
    return {
        products
    }
}

export default connect(mapStateToProps, {PopulateProductsList, PopulateImagesList, ResetImagesList})(SearchBar);