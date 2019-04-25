import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { payUsingPentacoin } from '../services/ApiCall';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import { SnackbarProvider, withSnackbar } from 'notistack';

const styles = theme => ({
    mainContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    elementContainer: {
        width: 300,
        marginTop: 100,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconPay: {
        color: '#00b500',
    },
    paper: {
        width: 230,
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholder: {
        height: 40,
        width: 40,
        marginLeft: 5,
    },
    done: {

    },
    textPay:{
        disabled: 'true',
    }

})

class PentaCoinPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: 'idle',
        }
    }



    payWithPentacoin = () => {
        console.log("payWithPenta");
        this.handleClickQuery();
        let token = localStorage.getItem("jwt");
        token !== null && payUsingPentacoin(token, this.successPayWithPentaCoin, this.errorPayWithPentacoin);

    }

    successPayWithPentaCoin = async (response) => {
        console.log('success');
        
    }

    errorPayWithPentacoin = async (response) => {
        console.log('error');
    }

    handleClickQuery = () => {
        setTimeout(function () { //Start the timer
            console.log("1 second passed");
            this.props.enqueueSnackbar('Congratulation, Payment successfully made.', { variant: 'success', });
        }.bind(this), 1000)
        clearTimeout(this.timer);

        if (this.state.query !== 'idle') {
            this.setState({
                query: 'idle',
            });
            return;
        }

        this.setState({
            query: 'progress',
        });
        this.timer = setTimeout(() => {
            this.setState({
                query: 'success',
            });
        }, 2000);
    };

    render() {
        const { classes } = this.props;
        const { query } = this.state;
        return (
            <div className={classes.mainContainer}>


                <div className={classes.elementContainer}>

                    <Paper className={classes.paper}>
                        <div className={classes.textPay}>
                            pay with PentaCoin
                        </div>

                        <div className={classes.iconContainer}>
                            <IconButton component="span" size="small" aria-label="Cart" onClick={this.payWithPentacoin}>
                                <Icon className={classes.iconPay}>payment</Icon>
                            </IconButton>
                        </div>


                    </Paper>

                    <div className={classes.placeholder}>
                        {query === 'success' ? (
                            <Icon fontSize='large' className={classes.done}>done</Icon>
                        ) : (
                                <Fade
                                    in={query === 'progress'}
                                    style={{
                                        transitionDelay: query === 'progress' ? '100ms' : '0ms',
                                    }}
                                    unmountOnExit
                                >
                                    <CircularProgress />
                                </Fade>
                            )}
                    </div>
                </div>



            </div>
        )
    }
}

PentaCoinPayment.propTypes = {
    classes: PropTypes.object.isRequired
};

const SnackedPaymentWithPentaCoin = withSnackbar(withStyles(styles)(PentaCoinPayment));

function IntegrationNotistack(props) {
    return (
        <SnackbarProvider maxSnack={3}>
            <SnackedPaymentWithPentaCoin {...props} />
        </SnackbarProvider>
    );
}

export default (IntegrationNotistack);
