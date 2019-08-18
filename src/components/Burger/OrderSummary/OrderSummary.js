import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{textDecoration: 'underline'}}>
        {props.labels[igKey]}
      </span>
      : {props.ingredients[igKey]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Burger contains</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
    </Aux>
  );
};

export default orderSummary;
