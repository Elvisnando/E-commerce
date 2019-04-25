import React from "react";
import ProductCard from "./ProductCard";
import {connect} from "react-redux";

class Products extends React.Component {

    render () {        
        return (
            <div className="products">
                {this.props.products.productsList.map((product, index) => 
                    <ProductCard product={product} image={this.props.products.images[index]} index={index}/>
                    )}
            </div>
        )
    }
}

const mapStateToProps = ({ products }) => {
    return {
        products
    }
}

export default connect(mapStateToProps) (Products);