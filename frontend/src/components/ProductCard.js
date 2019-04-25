import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import history from '../services/History';


export default class ProductCard extends React.Component {    

    handleClick = () => {
        history.push(`/products/${this.props.product.id}/${this.props.index}`);
    }

    render() {

        let imgPath = "data:image/jpeg;base64," + this.props.image;
        
        return (
            <Card className="cardItem" >
                <CardActionArea>
                    <CardContent className="cardContent" onClick={() => this.handleClick()}>
                        <img src={imgPath}/>
                        <div>
                            <p className="name"><b>{this.props.product.name}</b></p>
                            <p className="label">Origin</p>
                            <p>{this.props.product.region}</p>
                            <p className="label">Available Pieces</p>
                            <p>{this.props.product.availability}</p>
                            <p className="label">Expiry Date</p>
                            <p>{this.props.product.productionDate}</p>
                            <p className="label">Price</p>
                            <p>{this.props.product.price} €</p>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
    
}