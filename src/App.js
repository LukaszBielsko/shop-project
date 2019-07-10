import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Footer from './components/Navigation/Footer/Footer';
import LandingPage from './containters/LandingPage/LandingPage';
import NavigationBar from './components/Navigation/NavigationBar/NavigationBar';
import MainShop from './containters/MainShop/MainShop';

import {FirebaseContext} from './components/Firebase/index';


function App() {

    return (
        <BrowserRouter>
            <NavigationBar />
            <LandingPage />
            <FirebaseContext.Consumer>
               { firebase =>  <MainShop firebase={firebase}/>}
            </FirebaseContext.Consumer>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
