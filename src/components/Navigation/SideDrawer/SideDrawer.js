import React from 'react';

import styles from './SideDrawer.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = props => {
  const sideDrawerClasses = [
    styles.SideDrawer,
    props.open ? styles.Open : styles.Close,
  ].join(' ');

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={sideDrawerClasses}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
