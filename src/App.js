import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Footer from './components/Navigation/Footer/Footer';
import LandingPage from './containters/LandingPage/LandingPage';
import NavigationBar from './components/Navigation/NavigationBar/NavigationBar';
import CartPage from './components/Cart/Cart';
import OrdersPage from './components/Orders/Orders';
import InventoryPage from './components/Inventory/InventoryPage';
import ShopPage from './components/Shop/ShopPage';

function App() {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Route path='/shop' component={ShopPage} />
            <Route path='/cart' component={CartPage} />
            <Route path='/orders' component={OrdersPage} />
            <Route path='/inventory' component={InventoryPage} />
            <LandingPage />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
