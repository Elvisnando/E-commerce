import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { productsOwner } from '../../services/ApiCall';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import '../../styles/util.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { sendFilter } from '../../services/ApiCall';
import ProducerFilter from './ProducerFilter';
import LocationFilter from './LocationFilter';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';



const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 300,
    // ${GREY}
    boxShadow: `1px 3px 10px #888888`,
  },
  formControlRange: {
    margin: theme.spacing.unit,
    width: 300,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: `1px 3px 10px #888888`,

  },
  formControlExpireDate: {
    margin: theme.spacing.unit,
    width: 180,
    marginLeft: 60,
    boxShadow: `1px 3px 10px #888888`,
  },
  formControlCheckAvailability: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing.unit,
    width: 300,
    // marginLeft: 80,
    // ${GREY}

  },
  checkAvailability: {
    width: 110,
    height: '30',
    marginLeft: 20,
    boxShadow: `1px 3px 10px #888888`,
    // marginLeft: 0.5,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    width: '90%',
    height: '30',
    margin: 10,
  },
  textFieldLeft: {
    width: 170,
    height: '30',
    boxShadow: `1px 3px 10px #888888`,
    // margin: 80,
  },

  textFieldName: {
    width: '100%',
    // height: '30',
    // margin: 10,
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




class FilterContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rangevalue: { min: 2, max: 10 },
      checkedAvailability: true,
      arrayNames: [],
      location: '',
      arrayLocations: ['Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche', 'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana', 'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto'],
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
      weight: '',
    }
  }

  componentDidMount = () => {
    if(this.props.products.textToSearch != ''){
      
    }
  }

  componentDidUpdate = () => {
    console.log(this.state);
  }

  handleChangeProducer = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCloseProducer = () => {
    this.setState({
      producer: {
        open: false,
      }
    });
  };

  handleOpenProducer = () => {
    this.setState({
      producer: {
        open: true,
      }
    });
  };

  handleCloseLocation = () => {
    this.setState({
      prices: {
        open: false,
      }
    });
  };

  handleOpenLocation = () => {
    this.setState({
      prices: {
        open: true,
      }
    });
  };

  handleChangeAvailability = name => event => {
    this.setState({ [name]: event.target.checked });
  };


  handleChangeMax = (event) => {
    debugger;
    console.log(this.state.max);
    this.setState({ max: event });
    // this.setState({...this.state, max: event });
    console.log(this.state.max);
    // this.setState({max: event.target.value});
  };

  onSubmit = (e) => {
    e.preventDefault();
    let name = this.state.name;
    let producer = this.state.producer;
    let location = this.state.location;
    let expireDate = this.state.expireDate;
    console.log({ expireDate });
    let min = this.state.rangevalue.min;
    let max = this.state.rangevalue.max;
    let availability = this.state.checkedAvailability;
    console.log({ availability });
    debugger;
    sendFilter(name, producer, location, expireDate, min, max, availability);

  }

  retrieveProductsOwner() {
    if (this.state.arrayNames.length === 0) {
      productsOwner(this.successProducerList, this.error);
    }
  }

  successProducerList = async (response) => {
    let res = await response.json();

    let names = [];
    res.forEach(r => names.push(r.name));

    this.setState({ arrayNames: names });
  }

  takeTheDate() {
    if (this.state.expireDate == '') {
      const today = new Date();
      var mm = today.getMonth() + 1;
      var dd = today.getDate();
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }
      //const defaultDate = yyyy + '-' + mm + '-' + dd
      this.setState({ expireDate: yyyy + '-' + mm + '-' + dd })
    }
  }

  // MinMaxHandleChange = prop => event => {
  //   this.setState({ [prop]: event.target.value });
  // };

  render() {
    const { classes } = this.props;

    return (
      <div className="FilterClass">


        {/* CONTAINER FORM   */}
        <form autoComplete="off" onSubmit={this.onSubmit} onLoad={this.takeTheDate()}>

          <FormControl className={classes.formControl}>
            <div className={classes.textField}>
              <TextField
                defaultValue={this.props.products.textToSearch}
                id="name"
                className={classes.textFieldName}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <FormHelperText id="name">Product Name</FormHelperText>
            </div>
          </FormControl>


          {/* PRODUCERS FILTER */}
          <FormControl className={classes.formControl}>
            <div className={classes.textField}>
              <ProducerFilter />
              <FormHelperText id="producer-helper-text">Search Producer</FormHelperText>
            </div>
          </FormControl>



          {/* LOCATIONS */}
          <FormControl className={classes.formControl}>
            <div className={classes.textField}>
              <LocationFilter />
              <FormHelperText id="producer-helper-text">Search Location</FormHelperText>
            </div>
          </FormControl>




          {/* MIX MAX */}
          <FormControl className={classes.formControlRange}>

            <div className={classes.textField}>
              <InputRange
                id="price"
                maxValue={20}
                minValue={0}
                value={this.state.rangevalue}
                onChange={rangevalue => this.setState({ rangevalue })}
              />

            </div>
            <FormHelperText id="price">Price Range</FormHelperText>
          </FormControl>

          {/* EXPIRE DATE & AVAILABILITY */}
          <FormControl className={classes.formControlCheckAvailability}>

            <div className={classes.textFieldLeft}>
              <TextField
                id="date"
                type="date"
                defaultValue={this.state.expireDate}
                value={this.state.expireDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormHelperText id="date">Expire Date</FormHelperText>
            </div>


            <div className={classes.checkAvailability}>
              <FormControlLabel

                control={
                  <Switch
                    checked={this.state.checkedAvailability}
                    onChange={this.handleChangeAvailability('checkedAvailability')}
                    value="checkedAvailability"
                  />
                }
                label="Available"
              />
            </div>


          </FormControl>


          {/* SUBMIT BUTTON   */}
          <br />
          <div>
            <Button type="submit">Update</Button>
          </div>


        </form>

      </div>
    );
  }
}

FilterContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ products }) => {
  return {
    products
  }
}


export default connect(mapStateToProps)(withStyles(styles)(FilterContent));