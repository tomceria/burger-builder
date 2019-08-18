import React from 'react';

import styles from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const buildControls = props => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {Object.keys(props.labels).map(igKey => (
        <BuildControl
          key={igKey}
          label={props.labels[igKey]}
          added={() => props.ingredientAdded(igKey)}
          removed={() => props.ingredientRemoved(igKey)}
          disabled={props.disabled[igKey]}
        />
      ))}
      <button className={styles.OrderButton} disabled={!props.purchasable}>
        ORDER
      </button>
    </div>
  );
};

export default buildControls;
