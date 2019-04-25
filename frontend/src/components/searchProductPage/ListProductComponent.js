import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchBar from "../../components/SearchBar";
import {connect} from 'react-redux';
import TableListProducts from './TableListProducts';
import FilterSideBar from '../searchProductPage/FilterSideBar';


const styles = theme => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
      root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
      row: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.default,
        }},
      ListAndFilterContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 1,
      },
      leftDiv: {
        width: '70%',
        marginLeft: 50,
        marginRight: 10,
        marginTop:10,
      },
      rightDiv: {
        width: '30%',
        marginRight: 10,
        marginTop:10,
      },
      searchBar: {
        width: '66.7%',
        marginLeft: 50,
        marginRight: 10,
        marginTop:10,
      },
      fab: {
        margin: theme.spacing.unit,
        color: "yellow",
      },
    });
  
  let id = 0;
  function createData(name, location, availability, price, expireDate) {
    id += 1;
    return { id, name, location, availability, price, expireDate };
  }
  
    const rows = new Array()
    
    class ListProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: [this.props.products.id],
            arrayAvailability: [this.props.products.availability],
            arrayLocation: [this.props.products.origin],
            producer: [],
            price: [this.props.products.price],
            min: [],
            max: [],
            arrayNames: [this.props.products.name],
            expireDate: [this.props.products.expiryDate],
            checkedAvailability: true,
            product: {
              name: '',
          },
          producerToSend: '',
          minToSend: '',
          maxToSend: '',
          nameToSend: '',
          expireDateToSend: '',
          locationToSend: '',
        }
    }

    // RENDER 
    render() {
    
    const { classes } = this.props;
    console.log(this.props.products);
    // debugger;
    return (
      // onLoad={this.successFromSearchBar2()}
      <div >
        {/* SEARCH BAR */}
        <div className={classes.searchBar}>
        <SearchBar/>
        </div>

        {/* LIST PRODUCTS AND FILTER */}
        <div className={classes.ListAndFilterContainer}>
        
        {/* LIST PRODUCT */}
        <div className={classes.leftDiv}>
        <TableListProducts push={this.props.push}/>
        </div>
        
        {/* FILTER */}
        <div className={classes.rightDiv}>
        <FilterSideBar/>
        </div>
      
      </div>
      </div>
    )
  }
}

ListProductComponent.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = ({ products }) => {
    return {
        products
    }
}
export default connect(mapStateToProps)(withStyles(styles)(ListProductComponent));