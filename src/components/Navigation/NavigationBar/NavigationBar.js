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
        <Link to="/" >
            <img src={logo} alt="printer logo" />
        </Link>
        {props.showLinks ?
            <>
                <NavLink to='/shop' className={classes.navLink} activeStyle={styles}>Shop</NavLink>
                <NavLink to='/cart' className={classes.navLink} activeStyle={styles}> Cart</NavLink>
                <NavLink to='/orders' className={classes.navLink} activeStyle={styles}> Orders</NavLink>
                <NavLink to='/inventory' className={classes.navLink} activeStyle={styles}> Inventory</NavLink>
            </> 
            : <p>Please log in.</p>
        }
    </div>
);

export default NavBar;