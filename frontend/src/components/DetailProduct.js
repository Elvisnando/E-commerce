import React, { Component } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { insertProduct } from '../services/ApiCall.js';
import { withStyles } from '@material-ui/core';
//import '../styles/util.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from "prop-types";
import Select from 'react-select';
import { StylesConfig } from '../styles/test.css';

// import classes from "*.module.scss";


const styles = theme => ({
  margin: {
      margin: theme.spacing.unit * 2,
  },
  padding: {
      padding: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    height: "50%",
  },
  DivContainer: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    width: "100%",
    height: "40%"
  },
  singleTexfield : {
    width: "30%",
    margin: 5,
  },
  descriptionTextfield: {
    width: "100%",
  },
  selectTextfield: {
    width: "100%",
    height: "100%",
  },
  css10nd86i: {
    height: "100%",
  },
  texFieldDescription: {
    width: "100%",
  }
}); 

const regions = [
  {
    value: '0',
    label: 'Select a Region',
  },
  {
    value: 'Abruzzo',
    label: 'Abruzzo',
  },
  {
    value: 'Basilicata',
    label: 'Basilicata',
  },
  {
    value: 'Calabria',
    label: 'Calabria',
  },
  {
    value: 'Campania',
    label: 'Campania',
  },
  {
    value: 'Emilia-Romagna',
    label: 'Emilia-Romagna',
  },
  {
    value: 'Friuli-Venezia Giulia',
    label: 'Friuli-Venezia Giulia',
  },
  {
    value: 'Lazio',
    label: 'Lazio',
  },
  {
    value: 'Liguria',
    label: 'Liguria',
  },
  {
    value: 'Lombardia',
    label: 'Lombardia',
  },
  {
    value: 'Marche',
    label: 'Marche',
  },
  {
    value: 'Molise',
    label: 'Molise',
  },
  {
    value: 'Piemonte',
    label: 'Piemonte',
  },
  {
    value: 'Puglia',
    label: 'Puglia',
  },
  {
    value: 'Sardegna',
    label: 'Sardegna',
  },
  {
    value: 'Sicilia',
    label: 'Sicilia',
  },
  {
    value: 'Toscana',
    label: 'Toscana',
  },
  {
    value: 'Trentino-Alto Adige',
    label: 'Trentino-Alto Adige',
  },
  {
    value: 'Umbria',
    label: 'Umbria',
  },
  {
    value: 'Valle d\'Aosta',
    label: 'Valle d\'Aosta',
  },
  {
    value: 'Veneto',
    label: 'Veneto',
  }
];

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const styleForSelect = {

  control: styles => ({ ...styles, height: "50px" })
  
  };



class DetailProductForm extends Component{
    constructor(props) {
      super(props);
      this.state = {
        value: '', 
        currency:'', 
        description:'',
        type:'',
        price:''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
  
    handleSubmit(event) {
      event.preventDefault();
    };
  
    onSubmit(e) {
      e.preventDefault();
      if(this.state.price < 0 || this.state.availability < 0) {
        return;
      }
      else 
      {
        let token = localStorage.getItem("jwt");
        insertProduct(this.state.name, this.state.description, this.state.availability,this.state.origin,this.state.price,this.state.currency,this.state.type, token,this.success, this.error);
      }
    }

    success = async (response) => {
      console.log(response);
    };

    error = async (response) => {
      console.log("Errore nella login: " + response);
    }

    onChange(e) {
      this.setState ({ [e.target.name] : e.target.value });
    }

    error = async (response) => {
      console.log("errore server");
    }

    nameChange(ev) {
      this.setState({
          name: ev.target.value
      })
    }

    descriptionChange(ev) {
      this.setState({
          description: ev.target.value
      })
    }

    availabilityChange(ev) {
      this.setState({
        availability: ev.target.value
      })
    }

    expiryDateChange(ev) {
        this.setState({
            expiryDate: ev.target.value
        })
    }

    regionChange(ev) {
      this.setState({
          region: ev.target.value
      })
    }

    originChange(ev) {
        this.setState({
            origin: ev.target.value
        })
    }

    priceChange(ev) {
        this.setState({
            price: ev.target.value
        })
    }

    currencyChange(ev) {
      this.setState({
          currency: ev.target.value
      })
    }

    typeChange(ev) {
        this.setState({
            type: ev.target.value
        })
    } 

    errorTrue = (value) => {
      if(value < 0) {
        return true;
      }
        return false;
    }

    helperText = (value, id) => {
      if(value < 0) {
        return id+" must be greater than or equal to 0";
      }
        return "";
    }

    

    render() {

      const {classes, theme} = this.props;

       return (
        <div className={classes.container}>
        
        <div className={classes.DivContainer}>
        <div className={classes.singleTexfield}>
        <TextField                            
          
          id="outlined-email-input"
          label="Name"
          type="Name"
          name="Name"
          autoComplete="Name"
          margin="normal"
          variant="outlined"
          onChange={this.nameChange.bind(this)}
        />
        </div>

        <div className={classes.singleTexfield}>
        <TextField                            
          id="outlined-number"
          label="Availability"
          
          placeholder="0"
          helperText={this.helperText(this.state.availability, "Availability")}
          error={this.errorTrue(this.state.availability)}
          type="number"
          margin="normal"
          variant="outlined"
          onChange={this.availabilityChange.bind(this)}
         />
        </div>
        <div className={classes.singleTexfield}>
        <TextField                            
          id="outlined-select-origin-native"
          select
          label="Region"          
          onChange={this.originChange.bind(this)}
          SelectProps={{ native: true }}
          margin="normal"
          variant="outlined"
        >  
        {regions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </TextField>
        </div>
        </div>



        <div className={classes.DivContainer}>
        
        <div className={classes.singleTexfield}>
        <Select
            
            // options={suggestions}
            // components={components}
            styles={styleForSelect}
            label="Type"
            onChange={this.typeChange.bind(this)}
            placeholder="Type"
            
            isClearable
          />

          </div>


        {/* <TextField                                    
          id="outlined-password-input"
          label="Type"
          type="Type"
          className="firstInsertProductTxt ciao"
          // className="MuiFormControl-root-115 MuiFormControl-marginNormal-117 firstInsertProductTxt"
          margin="normal"
          variant="outlined"
          onChange={this.typeChange.bind(this)}
        />  */}

        <div className={classes.singleTexfield}>        
        <TextField
        required="true"       
        id="birthday"
        type="date"
        
        margin="dense"
        variant="outlined"    
        onChange = {(event) => {
            this.setState({birthday: event.target.value})
                    }
                    }
        />
        </div>
        
        <div className={classes.singleTexfield}>
        <TextField
          id="filled-adornment-weight"
          variant="outlined"
          label="Price"
          
          helperText={this.helperText(this.state.price, "Price")}
          error={this.errorTrue(this.state.price)}
          type="number"
          onChange={this.priceChange.bind(this)}
          InputProps={{
            endAdornment: 
            <InputAdornment position="end">
              <TextField                                
                id="outlined-select-currency-native"
                select
                onChange={this.currencyChange.bind(this)}
                SelectProps={{
                  native: true
                }}
              >  
                {currencies.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </InputAdornment>,
          }}
        />
        </div>
        </div> 
        
        <div className={classes.DivContainer}>
        <div className={classes.descriptionTextfield}>
        <TextField
          className={classes.texFieldDescription}
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.descriptionChange.bind(this)}
          margin="normal"
          variant="outlined"
        />
        </div>
        <br/><br/><br/>
        <Button variant="contained" className="SubmitButton" type="submit" onClick={this.onSubmit.bind(this)}>Insert</Button>
        </div>
        </div>
      );
      
    }    
  }


  DetailProductForm.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  const DetailProduct = withStyles(styles, {withTheme: true})(DetailProductForm);

  export default DetailProduct;
