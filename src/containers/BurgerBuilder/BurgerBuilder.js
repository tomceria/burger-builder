import React, {Component} from 'react';

import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};
const INGREDIENT_LABELS = {
  salad: 'Salad',
  bacon: 'Bacon',
  cheese: 'Cheese',
  meat: 'Meat',
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchaseConfirm: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = type => {
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    this.setState({ingredients: updatedIngredients});
    this.setState((prevState, props) => {
      return {totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]};
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    if (updatedIngredients[type] <= 0) {
      return;
    }
    updatedIngredients[type] = this.state.ingredients[type] - 1;
    this.setState({ingredients: updatedIngredients});
    this.setState((prevState, props) => {
      return {totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]};
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({purchaseConfirm: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchaseConfirm: false});
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let i in disabledInfo) {
      disabledInfo[i] = disabledInfo[i] <= 0; // boolean
    }
    return (
      <Aux>
        <Modal show={this.state.purchaseConfirm} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            labels={INGREDIENT_LABELS}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          //Functions
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          purchaseConfirm={this.purchaseHandler}
          //Variables
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          labels={INGREDIENT_LABELS}
          disabled={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
