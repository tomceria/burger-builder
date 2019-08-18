import React, {Component} from 'react';

import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4, // base price
  };

  addIngredientHandler = type => {
    const updatedIngredients = {  // immutable
      ...this.state.ingredients,
    };
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    this.setState({ingredients: updatedIngredients});
    this.setState((prevState, props) => {
      return {totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]};
    });
  };

  removeIngredientHandler = type => {
    
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
