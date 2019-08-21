import React, {Component} from 'react';
import axios from '../../axios';

import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
  state = {
    // From database
    ingredients: null,
    ingredientPrices: null,
    ingredientLabels: null,
    //
    totalPrice: 4,
    purchasable: false,
    purchaseConfirm: false,
    orderLoading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(res => {
        const igQty = Object.keys(res.data).reduce((arr, igKey) => {
          return {...arr, [igKey]: 0};
        }, {});
        const igLabels = Object.keys(res.data).reduce((arr, igKey) => {
          return {...arr, [igKey]: res.data[igKey].label};
        }, {});
        const igPrices = Object.keys(res.data).reduce((arr, igKey) => {
          return {...arr, [igKey]: res.data[igKey].price};
        }, {});
        this.setState({
          ingredients: igQty,
          ingredientPrices: igPrices,
          ingredientLabels: igLabels,
        });
      })
      .catch(err => {this.setState({error: true})});
  }

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
      return {
        totalPrice: prevState.totalPrice + this.state.ingredientPrices[type],
      };
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
    this.setState(prevState => {
      return {
        totalPrice: prevState.totalPrice - this.state.ingredientPrices[type],
      };
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({purchaseConfirm: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchaseConfirm: false});
  };

  purchaseContinueHandler = () => {
    this.setState({orderLoading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Lưu Minh Hoàng',
        address: {
          street: '1 Vien Vien',
          zipCode: '70000',
          country: 'Vietnam',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then(() => {
        this.setState({orderLoading: false, purchaseConfirm: false});
      })
      .catch(error => {
        this.setState({orderLoading: false, purchaseConfirm: false});
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let i in disabledInfo) {
      disabledInfo[i] = disabledInfo[i] <= 0; // boolean
    }

    let burger = (this.state.error) ?
      (<p>Ingredients can't be loaded</p>)
      :(<Spinner />);
    let orderSummary = null;
    if (this.state.ingredients && this.state.ingredientLabels) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            //Functions
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchaseConfirm={this.purchaseHandler}
            //Variables
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            labels={this.state.ingredientLabels}
            disabled={disabledInfo}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          //Functions
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
          //Variables
          ingredients={this.state.ingredients}
          labels={this.state.ingredientLabels}
          totalPrice={this.state.totalPrice}
        />
      );
    }
    if (this.state.orderLoading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          //Functions
          modalClosed={this.purchaseCancelHandler}
          //Variables
          show={this.state.purchaseConfirm}
          loading={this.state.orderLoading}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
