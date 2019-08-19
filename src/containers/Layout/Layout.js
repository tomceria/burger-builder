import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import styles from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  };

  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer
          //Functions
          closed={this.sideDrawerCloseHandler}
          //Variables
          open={this.state.showSideDrawer}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
