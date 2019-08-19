import React from 'react';

import styles from './Toolbar.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={props.sideDrawerToggled} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly} style={{height: '100%'}}>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default toolbar;
