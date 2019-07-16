import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

import CartPage from '../../components/CartPage/CartPage';
import OrdersPage from '../../components/OrdersPage/OrdersPage';
import InventoryPage from '../../components/InventoryPage/InventoryPage';
import ShopPage from '../../components/ShopPage/ShopPage';


class MainShop extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            addedToCart: [],
            orders: []
        }
    }

    componentDidMount() {
        // get products
        const productsRef = this.props.firebase.db.ref('products')
        productsRef.once('value')
            .then((data) => this.setState({ products: data.val() }))
    }

    componentDidUpdate(prevProps){
        // compDidUp will run everytime new props are passed
        // wait for the change of userInfo from null to object
        // no other change will occur, so no worries that it will 
        // run more than needed and cause infinite loop
        if (this.props.userInfo !== prevProps.userInfo){
            const ordersRef = this.props.firebase.db.ref(`example/${this.props.userInfo.companyId}`)
            ordersRef.once('value')
                .then(data => {
                    const allOrders = data.val()
                    const allOrdersArray = Object.values(allOrders)
                    // get the last item from array with list of all orders (firebase)
                    const orders = allOrdersArray[allOrdersArray.length - 1]
                    this.setState({ orders })
                }).catch(err => console.log(err))
        }
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
        const { userInfo } = this.props
        const order = [...this.state.addedToCart]
        const orders = [
            ...this.state.orders,
            {
                order, summaryPrice,
                company: userInfo.companyId, 
                createdBy: userInfo.firstName + " " + userInfo.lastName,
                //TODO proper date format needed
                date: new Date().getTime() 
            }]
        this.props.firebase.db.ref(`example/${this.props.userInfo.companyId}`).push(orders)
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
    checkState = () => console.log(this.state, this.props)


    render() {
        const { orders, products, addedToCart } = this.state
        const { isLoggedIn, isAdmin } = this.props

        return (
            <div>
                <Switch>
                    {isLoggedIn ?
                        <>
                            <Route path='/shop'
                                render={(props) => <ShopPage
                                    products={products}
                                    add={this.addToCartHandler} />}
                            />
                            <Route path='/cart'
                                render={() => <CartPage
                                    addedToCart={addedToCart}
                                    checkoutOrder={this.checkoutCartHandler} />}
                            />
                            <Route path='/orders'
                                render={() => <OrdersPage
                                    orders={orders} />}
                            />
                            {isAdmin ? <Route path='/inventory'
                                component={InventoryPage} /> : null}
                        </>
                        : null}
                    {/* TODO: 404 renders only for NOT logged in users */}
                    <Route render={() => <p>404 - nope, nothing here, I'm afraid</p>} />
                </Switch>
                <button onClick={this.checkState}>state</button>
            </div>
        )
    }
}

export default MainShop;