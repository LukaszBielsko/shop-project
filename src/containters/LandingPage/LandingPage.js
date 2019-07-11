import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import classes from './LandingPage.module.css'

import LogingPage from '../../components/LoginPage/LoginPage';
import RegisterPage from '../../components/RegisterPage/RegisterPage';
import { FirebaseContext } from '../../components/Firebase';



// import RegisterPage from '../../components/RegisterPage/RegisterPage';

class LandingPage extends Component {
    render() {
        return (
            <>
                <div className={classes.LandingPage}>
                    <FirebaseContext.Consumer>
                        {firebase => <Route path="/" exact
                            render={() => <LogingPage firebase={firebase} />}
                        />}
                    </FirebaseContext.Consumer>
                </div>
                <Route path="/register-page" component={RegisterPage} />
            </>
        )
    }
}

export default LandingPage;
