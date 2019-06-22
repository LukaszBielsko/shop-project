import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import axios from 'axios';

import CartPage from '../../components/CartPage/CartPage';
import OrdersPage from '../../components/OrdersPage/OrdersPage';
import InventoryPage from '../../components/InventoryPage/InventoryPage';
import ShopPage from '../../components/ShopPage/ShopPage';

class MainShop extends Component {

    state = {
        products: [],
        addedToCart: []
    }

    componentDidMount() {
        axios.get('http://localhost:3000/products')
            .then(response => {
                this.setState({ products: response.data })
            })
    }

    addToCartHandler = (id, pieces) => {
        const addedProduct = {...this.state.products.find((el) => el.id === id), pieces: pieces}
        const addedProducts = [...this.state.addedToCart]
        addedProducts.push(addedProduct)
        this.setState({ addedToCart: addedProducts })
    }


    render() {
        return (
            <div>
                {/* <Route path='/shop' component={ShopPage} products={this.state.products} /> */}
                <Route
                    path='/shop'
                    render={(props) => <ShopPage
                        products={this.state.products}
                        add={this.addToCartHandler}
                    />}
                />
                <Route
                    path='/cart'
                    render={(props) => <CartPage
                        addedToCart={this.state.addedToCart}
                    />} />
                <Route path='/orders' component={OrdersPage} />
                <Route path='/inventory' component={InventoryPage} />
            </div>
        )
    }
}

export default MainShop;