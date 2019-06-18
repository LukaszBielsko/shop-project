import React, { Component } from 'react'
import LogingPage from '../../components/LoginPage/LoginPage';
import { Route } from 'react-router-dom';
import classes from './LandingPage.module.css'

import RegisterPage from '../../components/RegisterPage/RegisterPage';

class LandingPage extends Component {
    render() {
        return (
            <div className={classes.LandingPage}>
                <Route path="/" exact component={LogingPage} />
            </div>
        )
    }
}

export default LandingPage;
