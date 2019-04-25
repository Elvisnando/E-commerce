import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import history from '../services/History';

export default class CheckoutForm extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
        history.push("/");
    });
  }

  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_tZmCgoWTFsS28mJftL1I0xkq"
        name= "Paying"
        description ="You are paying "
      />
    )
  }
}