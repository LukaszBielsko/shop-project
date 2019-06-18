import React from 'react';
import classes from './Footer.module.css';
import logo from '../../../assets/printerLogo.ico'

const footer = (props) => (
    <div className={classes.Footer}>
        <img className={classes.logoImg} src={logo} alt="printer logo"/>
         </div>
);

export default footer;