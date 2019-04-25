import React from "react";
import { TextField } from "@material-ui/core";

const categories = [{
    value: 'Vegetables',
    label: 'Vegetables',
  },
  {
    value: 'Meat',
    label: 'Meat',
  },
  {
    value: 'Fruit',
    label: 'Fruit',
  },
  {
    value: 'Esotic',
    label: 'Esotic',
  }];

const regions = [
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

export default class ProductField extends React.Component {

    render() {
        if (this.props.id === "region") 
            return (
                <TextField className="productField"
                margin="normal"
                variant="outlined"
                label={this.props.name}
                select="true"
                id={this.props.id}
                SelectProps={{ native: true }}            
                >
                {regions.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
                </TextField>)
        if (this.props.id === "category") 
            return (
                <TextField className="productField"
                margin="normal"
                variant="outlined"
                label={this.props.name}
                select="true"
                id={this.props.id}
                SelectProps={{ native: true }}            
                >
                {categories.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
                </TextField>)
        if (this.props.id === "currency")
            return (
                <TextField className="productField little" id={this.props.id}
                margin="normal"
                variant="outlined"
                select="true"
                label={this.props.name}
                SelectProps={{ native: true }} 
                >
                {currencies.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
                </TextField>
            );
            if (this.props.id === "price")
            return (
                <TextField className="productField little" id={this.props.id}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                label={this.props.name}
                type={this.props.type}               
                />
            );
        return (
            <TextField className="productField"
            component="span"
            margin="normal"
            variant="outlined"
            label={this.props.name}
            type={this.props.type}
            id={this.props.id}
            InputLabelProps={{
                shrink: true,
            }}
            />          
        );        
    }
}