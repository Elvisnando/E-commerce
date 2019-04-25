import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import {productsOwner} from '../../services/ApiCall';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import '../../styles/util.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {sendFilter} from '../../services/ApiCall';



const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 200,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    width: 200,
  },
  root: {
    display: 'flex',
    //flexWrap: 'wrap',
    flexDirection: 'row',
  },
  minmax: {
    width: 100,
  },
  displayincolumn: {
    display: 'flex',
    flexDirection: 'column',
    float: 'none',
  },
});



class GetFilter extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
          checkedAvailability: true,
          arrayNames: [],
          location: '',
          arrayLocations: ['Abruzzo','Basilicata','Calabria','Campania','Emilia-Romagna','Friuli-Venezia Giulia','Lazio','Liguria','Lombardia','Marche','Molise','Piemonte','Puglia','Sardegna','Sicilia','Toscana','Trentino-Alto Adige','Umbria','Valle d\'Aosta','Veneto'],
          producer: '',
          min: '',
          max: '',
          name: '',
          expireDate: '',
          product: {
            name: '',
        },
        producer: {
            open: false,
            age: '',
            arrayNames: [],
        },
        prices: {
            open: false,
            age: '',
        },
      }
  }

  handleChangeProducer = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCloseProducer = () => {
    this.setState({
        producer: {
        open: false,
    }});
  };

  handleOpenProducer = () => {
    this.setState({
        producer: {
        open: true,
    }});
  };

  handleCloseLocation = () => {
    this.setState({ 
        prices: {
        open: false,
    } });
  };

  handleOpenLocation = () => {
    this.setState({ 
        prices: {
        open: true,
    } });
  };

  handleChangeAvailability = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onSubmit(e){
    e.preventDefault();
    let name = this.state.name;
    let producer = this.state.producer;
    let location = this.state.location;
    let expireDate = this.state.expireDate;
    console.log({expireDate});
    let min = this.state.min;
    let max = this.state.max;
    let availability = this.state.checkedAvailability;
    console.log({availability});
    debugger;
    sendFilter(name, producer, location, expireDate, min, max, availability);

  }

  retrieveProductsOwner() {
      if (this.state.arrayNames.length === 0) {
        productsOwner(this.success, this.error);
      }
  }

  success = async (response) => {
    let res = await response.json();
    
    let names = [];
    res.forEach(r => names.push(r.name));
    
    this.setState({arrayNames: names}); 
  }
  
  takeTheDate () {
      if(this.state.expireDate == ''){
        const today = new Date();
    var mm = today.getMonth() +1;
    var dd = today.getDate();
    var yyyy = today.getFullYear();

    if(dd<10) {
    dd = '0'+dd
    }

    if(mm<10){
    mm = '0'+mm
    }
    //const defaultDate = yyyy + '-' + mm + '-' + dd
    this.setState({expireDate: yyyy + '-' + mm + '-' + dd})
      }
  }

  render() {
    const { classes } = this.props;
    return (
    <div className="FilterClass" onLoad={this.retrieveProductsOwner()}>
      {/* CONTAINER FORM   */}
      <form autoComplete="off" onSubmit={this.onSubmit.bind(this)} onLoad={this.takeTheDate()}>
        
        <FormControl className={classes.formControl}>
          <div className={classes.textField}>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={(event) => {
                this.setState({name: event.target.value})
            }}
            margin="normal"
            
          />
          </div>
          </FormControl>

        {/* PRODUCERS FILTER */}
        <FormControl className={classes.formControl} >
        <InputLabel htmlFor="producers">Producers</InputLabel>
        <Select
                open={this.state.producopen}
                onClose={this.handleCloseProducer}
                onOpen={this.handleOpenProducer}
                value={this.state.producer}
                onChange={(event) => {
                    this.setState({producer: event.target.value})
                }}

                inputProps={{
                    name: 'producer',
                    id: 'producers',
                }}
        >
        {
            this.state.arrayNames.length > 0 && 
            this.state.arrayNames.map((elem, key) => <MenuItem className={classes.displayincolumn} key={key} value={elem}>{elem}</MenuItem>)
        }
        </Select>
        </FormControl>
        
        {/* LOCATIONS */}
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="location">Location</InputLabel>
          <Select
            className={classes.displayincolumn}
            open={this.state.prices.open}
            onClose={this.handleCloseLocation}
            onOpen={this.handleOpenLocation}
            value={this.state.location}
            
            onChange={(event) => {
                this.setState({location: event.target.value})}
            }

            inputProps={{
              name: 'location',
              id: 'location',
            }}
          >
            <MenuItem className={classes.displayincolumn} value="">
              <em>Locations</em>
            </MenuItem>
            {
            this.state.arrayLocations.length > 0 && 
            this.state.arrayLocations.map((elem, key) => <MenuItem className={classes.displayincolumn} key={key} value={elem}>{elem}</MenuItem>)
            }    


          </Select>
        </FormControl>
        
        {/* EXPIRE DATE */}
        <FormControl className={classes.formControl}>
        <TextField
        id="date"
        label="Expire Date"
        type="date"
        defaultValue={this.state.expireDate}
        value={this.state.expireDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
                        }}
        />
        </FormControl>

        {/* MIX MAX */}
        {/* MIX MAX */}
        <FormControl className={classes.formControl}>
            <div className={classes.root}>
              <div className={classes.textField}>
                <Input
                  id="mmin"
                  onChange={(e) => this.setState({ min: e.target.value })}
                  aria-describedby="min-helper-text"
                  endAdornment={<InputAdornment position="end">€</InputAdornment>}
                  inputProps={{
                    'aria-label': 'Min',
                  }}
                />
                <FormHelperText id="min-helper-text">Price Start From</FormHelperText>
              </div>


              <div className={classes.textField}>
                <Input
                  id="max"
                  onChange={(e) => this.setState({ min: e.target.value })}
                  aria-describedby="max-helper-text"
                  endAdornment={<InputAdornment position="end">€</InputAdornment>}
                  inputProps={{
                    'aria-label': 'Max',
                  }}
                />
                <FormHelperText id="max-helper-text">Price Up To</FormHelperText>

              </div>
            </div>


          </FormControl>

        {/* AVAILABILITY */}
        <FormControl className={classes.formControl}>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedAvailability}
              onChange={this.handleChangeAvailability('checkedAvailability')}
              value="checkedAvailability"
            />
          }
          label="Availability"
        />
        </FormControl>

        {/* SUBMIT BUTTON   */}
        <br/>
        <div>
        <Button type="submit">Update</Button>
        </div>


      </form>

      </div>
    );
  }
}

GetFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GetFilter);