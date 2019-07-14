import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Footer from './components/Navigation/Footer/Footer';
import LandingPage from './containters/LandingPage/LandingPage';
import NavigationBar from './components/Navigation/NavigationBar/NavigationBar';
import MainShop from './containters/MainShop/MainShop';

class App extends Component {

    state = {
        isLoggedIn: null,
        userInfo: null
    }

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ isLoggedIn: true })
                const ref = this.props.firebase.db.ref('users/');
                ref.once('value')
                    .then(snapshot => {
                        let users = snapshot.val()
                        let userInfo = users.find((el) => el.uid === user.uid)
                        this.setState({ userInfo })
                    })
            }
        })
    }


    render() {
        return (
            <BrowserRouter>
                <NavigationBar showLinks={this.state.isLoggedIn} />
                <LandingPage />
                <MainShop firebase={this.props.firebase} />
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;
