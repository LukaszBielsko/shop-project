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
                            render={() => <LogingPage
                                firebase={firebase}
                                isLoggedIn={this.props.isLoggedIn} />}
                        />}
                    </FirebaseContext.Consumer>
                </div>
                <FirebaseContext.Consumer>
                    {firebase => <Route path="/register-page"
                        render={() => <RegisterPage
                            firebase={firebase} />}
                    />}
                </FirebaseContext.Consumer>
            </>
        )
    }
}

export default LandingPage;
