import React, { Component } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { insertProduct } from '../services/ApiCall.js';
import { withStyles } from '@material-ui/core';
import '../styles/util.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import jwt_decode from 'jwt-decode';

const styles = theme => ({
  margin: {
      margin: theme.spacing.unit * 2,
  },
  padding: {
      padding: theme.spacing.unit
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


class DetailSellerForm extends Component{
    constructor(props) {
      super(props);
      this.state = {
        value: '', 
        currency:'',
        piva:'',
        name:'',

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
        insertProduct(this.state.name, this.state.description, this.state.availability,this.state.origin,this.state.price,this.state.currency,this.state.type);
      }
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

    addressChange(ev) {
      this.setState({
        address: ev.target.value
      })
    }

    pivaChange(ev) {
      this.setState({
        piva: ev.target.value
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
       return (
        <div id="divEsterno">
        <div>
        <TextField                            
          id="outlined-email-input"
          label="Name"
          type="Name"
          name="Name"
          autoComplete="Name"
          className="firstInsertProductTxt"
          margin="normal"
          disabled
          value= {jwt_decode(localStorage.getItem("jwt")).name}
          variant="outlined"
          onChange={this.nameChange.bind(this)}
        />
        <TextField                            
          id="outlined-number"
          label="Piva"
          className="firstInsertProductTxt"
          placeholder="0"
          helperText={this.helperText(this.state.availability, "Piva")}
          error={this.errorTrue(this.state.availability)}
          type="number"
          margin="normal"
          value= {jwt_decode(localStorage.getItem("jwt")).piva}
          variant="outlined"
          disabled
          onChange={this.pivaChange.bind(this)}
         />
        <TextField                            
          id="outlined-number"
          label="Address"
          className="firstInsertProductTxt"
          helperText={this.helperText(this.state.address, "Address")}
          error={this.errorTrue(this.state.address)}
          type="name"
          margin="normal"
          disabled
          value= {jwt_decode(localStorage.getItem("jwt")).address}
          variant="outlined"
          onChange={this.addressChange.bind(this)}
        />
        </div>
        </div>
        
      );
      
    }    
  }

  const DetailSeller = withStyles(styles)(DetailSellerForm);

  export default DetailSeller;
