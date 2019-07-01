import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Footer from './components/Navigation/Footer/Footer';
import LandingPage from './containters/LandingPage/LandingPage';
import NavigationBar from './components/Navigation/NavigationBar/NavigationBar';
import MainShop from './containters/MainShop/MainShop';


function App() {

    return (
        <BrowserRouter>
            <NavigationBar />
            <LandingPage />
            <MainShop/>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
