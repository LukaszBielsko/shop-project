import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import classes from './NavigationBar.module.css';
import logo from '../../../assets/printerLogo.ico';

let styles = {
    color: "green",
    transform: "scale(1.2)"
};

const NavBar = (props) => (


    <div className={classes.Navbar}>
        <Link to="/" exact>
            <img src={logo} alt="printer logo" />
        </Link>
        <NavLink to='/shop' className={classes.navLink} activeStyle={styles}>Shop</NavLink>
        <NavLink to='/cart' className={classes.navLink} activeStyle={styles}> Cart</NavLink>
        <NavLink to='/orders' className={classes.navLink} activeStyle={styles}> Orders</NavLink>
        <NavLink to='/inventory' className={classes.navLink} activeStyle={styles}> Inventory</NavLink>

        {/* <Route path='/shop' component={ShopPage} />
        <Route path='/cart' component={CartPage} />
        <Route path='/orders' component={OrdersPage} />
        <Route path='/inventory' component={InventoryPage} /> */}
    </div>
);

export default NavBar;