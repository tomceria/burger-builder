import React from 'react';

import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey =>
    props.ingredients[igKey] > 0 ? (
      <li key={igKey}>
        <span style={{textDecoration: 'underline'}}>{props.labels[igKey]}</span>
        : {props.ingredients[igKey]}
      </li>
    ) : null,
  );
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Burger contains</p>
      <ul>{ingredientSummary}</ul>
      <h3>Total price: {props.totalPrice.toFixed(2)}</h3>
      <p>Continue to checkout?</p>
      <Button btntype="Success" clicked={props.purchaseContinued}>
        Continue
      </Button>
      <Button btntype="Danger" clicked={props.purchaseCancelled}>
        Cancel
      </Button>
    </Aux>
  );
};

export default orderSummary;
