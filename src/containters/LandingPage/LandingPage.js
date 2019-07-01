import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import LogingPage from '../../components/LoginPage/LoginPage';
import RegisterPage from '../../components/RegisterPage/RegisterPage';

import classes from './LandingPage.module.css'

// import RegisterPage from '../../components/RegisterPage/RegisterPage';

class LandingPage extends Component {
    render() {
        return (
            <>
                <div className={classes.LandingPage}>
                    <Route path="/" exact component={LogingPage} />
                </div>
                <Route path="/register-page" component={RegisterPage} />
            </>
        )
    }
}

export default LandingPage;
