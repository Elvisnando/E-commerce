import React from "react";
import SearchBar from "../components/SearchBar";
import Products from "../components/Products";
import FilterSideBar from "../components/searchProductPage/FilterSideBar";
import "../styles/products.css";
import { Paper } from "@material-ui/core";
import { receiveProductByName } from "../services/ApiCall";
import {connect} from "react-redux";

class ProductsView extends React.Component {

    componentWillMount () {
        receiveProductByName();
    }

    render () {
        return (
            <div className="ProductContainer">
                <div className="subContainer">
                    <Paper className="SearchBarContainer"><SearchBar/></Paper>
                    <Products/>
                </div>
                <FilterSideBar className="FilterSideBarContainer"/>
            </div>
        )
    }
}

const mapStateToProps = ({ products }) => {
    return {
        products
    }
}

export default connect(mapStateToProps) (ProductsView);