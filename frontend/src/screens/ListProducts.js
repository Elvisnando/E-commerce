import React, { Component } from 'react';
import ListProductComponent from '../components/searchProductPage/ListProductComponent';


export default class ListProducts extends Component {
  render() {
    return (
      <div>
        <ListProductComponent push={this.props.history.push}/>
        
      </div>
    )
  }
}
