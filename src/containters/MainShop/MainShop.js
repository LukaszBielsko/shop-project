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
        addedToCart: [],
        orders: [
            {
                order: [
                    {
                        "id": "product-1",
                        "type": "Printer",
                        "name": "ZX3",
                        "price": "400",
                        "pieces": 20,
                        "inStock": "30"
                    },
                    {
                        "id": "product-2",
                        "type": "Printer",
                        "name": "ZX5",
                        "price": "600",
                        "pieces": 33,
                        "inStock": "5"
                    }
                ],
                summaryPrice: 666
            },
            {
                order: [
                    {
                        "id": "product-1",
                        "type": "Printer",
                        "name": "ZX3",
                        "price": "400",
                        "pieces": 20,
                        "inStock": "30"
                    },
                    {
                        "id": "product-2",
                        "type": "Printer",
                        "name": "ZX5",
                        "price": "600",
                        "pieces": 33,
                        "inStock": "5"
                    }
                ],
                summaryPrice: 666
            }


        ]
    }

    componentDidMount() {
        axios.get('http://localhost:3000/products')
            .then(response => {
                this.setState({ products: response.data })
            })
    }


    addToCartHandler = (id, pieces) => {
        const addedProduct = { ...this.state.products.find((el) => el.id === id), pieces: pieces }
        const addedToCart = [...this.state.addedToCart]
        addedToCart.push(addedProduct)
        this.setState({ addedToCart: addedToCart })
    }

    checkoutCartHandler = (summaryPrice) => {
        const order = [...this.state.addedToCart]
        const orders = [...this.state.orders]
        orders.push({ order: order, summaryPrice: summaryPrice })
        this.setState({
            orders: orders,
            addedToCart: []
        })
    }

    checkState = () => console.log(this.state)


    render() {
        return (
            <div>
                <button onClick={this.checkState}>click for the state</button>
                <Route
                    path='/shop'
                    render={(props) => <ShopPage
                        products={this.state.products}
                        add={this.addToCartHandler}
                    />}
                />
                <Route
                    path='/cart'
                    render={() => <CartPage
                        addedToCart={this.state.addedToCart}
                        checkoutOrder={this.checkoutCartHandler} />}
                />
                <Route path='/orders' render={() => <OrdersPage
                    orders={this.state.orders} />}
                />
                <Route path='/inventory' component={InventoryPage} />
            </div>
        )
    }
}

export default MainShop;