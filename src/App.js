import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Footer from './components/Navigation/Footer/Footer';
import LandingPage from './containters/LandingPage/LandingPage';
import NavigationBar from './components/Navigation/NavigationBar/NavigationBar';
import MainShop from './containters/MainShop/MainShop';

class App extends Component {

    state = {
        isLoggedIn: null
    }

    componentDidMount(){
        this.props.firebase.auth.onAuthStateChanged( user => {
            if (user){
                this.setState({ isLoggedIn: true})
                console.log('isLoggedIn ' + this.state.isLoggedIn )
            } else {
                this.setState({ isLoggedIn: false})
                console.log('isLoggedIn ' + this.state.isLoggedIn )
            }
        })
    }


    render() {
        return (
            <BrowserRouter>
                <NavigationBar showLinks={this.state.isLoggedIn}/>
                <LandingPage />
                <MainShop firebase={this.props.firebase} />
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;

/* TODO
where auth info should be placed and how?
    high up :)
    context vs state passing

where it will be passed?
    navigation bar depends on auth user
    inventory page (and some other feats) depends on user auht and user role
 */