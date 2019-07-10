import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

import CartPage from '../../components/CartPage/CartPage';
import OrdersPage from '../../components/OrdersPage/OrdersPage';
import InventoryPage from '../../components/InventoryPage/InventoryPage';
import ShopPage from '../../components/ShopPage/ShopPage';


class MainShop extends Component {

    state = {
        products: [],
        addedToCart: [],
        orders: []
    }

    componentDidMount() {
        const ref = this.props.firebase.db.ref('products')
        ref.once('value')
            .then((data) => this.setState({products: data.val()}))
    }


    addToCartHandler = (id, pieces) => {
        this.setState((prevState) => {
            const product = prevState.products.find(el => el.id === id);
            return { addedToCart: [...prevState.addedToCart, { ...product, pieces }] };
        });
        /*  TODO: Problem occurs when addedToCart is passed to orders component
            Ponadto, żeby nie duplikować danych to addedToCard powinno mieć tylko ID od produktu i ilość sztuk.
            addToCartHandler = (id, pieces) => {
                this.setState((products, addedToCart) => {
                    return { addedToCart: [...addedToCart, { id, pieces }] };
                });
            }
            
            Initial code version
            const addedProduct = { ...this.state.products.find((el) => el.id === id), pieces: pieces }
            const addedToCart = [...this.state.addedToCart]
            addedToCart.push(addedProduct)
            this.setState({ addedToCart: addedToCart })
        */
    }

    checkoutCartHandler = (summaryPrice) => {
        const order = [...this.state.addedToCart]
        const orders = [...this.state.orders, { order, summaryPrice }]
        this.setState({
            orders,
            addedToCart: []
        })
    }


    /* React devtools installed earlier on.
    Made this only for convenience, as it's 
    quicker than clicking into react dev tools
    and then to desired component each time 
    the code changes / page refreshes  */
    checkState = () => console.log(this.state)


    render() {
        return (
            <div>
                <button onClick={this.checkState}>click for the state</button>
                <Switch>
                    <Route path='/shop'
                        render={(props) => <ShopPage
                            products={this.state.products}
                            add={this.addToCartHandler} />}
                    />
                    <Route path='/cart'
                        render={() => <CartPage
                            addedToCart={this.state.addedToCart}
                            checkoutOrder={this.checkoutCartHandler} />}
                    />
                    <Route path='/orders'
                        render={() => <OrdersPage
                            orders={this.state.orders} />}
                    />
                    <Route path='/inventory'
                        component={InventoryPage} />
                </Switch>
            </div>
        )
    }
}

export default MainShop;