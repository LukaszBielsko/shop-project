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
        isAdmin: null,
        userInfo: null
    }

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(user => {
            if (user) {
                const ref = this.props.firebase.db.ref('users/');
                ref.once('value')
                    .then(snapshot => {
                        const users = snapshot.val()
                        console.log(users)
                        const userInfo = users.find((el) => el.uid === user.uid)
                        console.table(userInfo)
                        this.setState({
                            userInfo,
                            isLoggedIn: true,
                            isAdmin: userInfo.role === 'admin' ? true : false,
                        })
                    })
            } else {
                this.setState({ isLoggedIn: false })
            }
        })
    }


    render() {
        const { firebase } = this.props;
        const { isLoggedIn, isAdmin, userInfo } = this.state

        return (
            <BrowserRouter>
                <NavigationBar
                    isLoggedIn={isLoggedIn}
                    firebase={firebase}
                    isAdmin={isAdmin} />
                <LandingPage
                    isLoggedIn={isLoggedIn}
                 />
                <MainShop
                    firebase={firebase}
                    isLoggedIn={isLoggedIn}
                    isAdmin={isAdmin}
                    userInfo={userInfo} />
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;
