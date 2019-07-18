import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import date from 'date-and-time';

import CartPage from '../../components/CartPage/CartPage';
import OrdersPage from '../../components/OrdersPage/OrdersPage';
import InventoryPage from '../../components/InventoryPage/InventoryPage';
import ShopPage from '../../components/ShopPage/ShopPage';
import { isatty } from 'tty';

/* TODO clear state on logout */
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
            .then((data) => {
                const products = data.val();
                this.setState({ products })
            })
    }

    componentDidUpdate(prevProps) {
        /*  compDidUp will run everytime new props are passed
         wait for the change of userInfo from null to object
         no other change will occur, so no worries that it will 
         run more than needed and cause infinite loop I think :) */

        const getOrders = (companyOrders) => {
            const companyOrdersArray = Object.values(companyOrders)
            const orders = companyOrdersArray[companyOrdersArray.length - 1]
            return orders
        }

        if (this.props.userInfo !== prevProps.userInfo) {
            /* TODO once() has to be changed to on() - in order to fetch data whenever it changes  */
            /*  i could change the whole data structure to use only orders
               and put all orders there, then filter to get only given company's orders 
               is that a good solution to fetch all orders when it's not neccesary?
               probably not, but it's easier from normalizing data pespective */
            if (this.props.isAdmin) {
                const ordersRef = this.props.firebase.db.ref('orders')
                ordersRef.once('value').then(data => {
                    const allOrdersObject = data.val()
                    const allOrdersArray = Object.values(allOrdersObject)
                    const adminAllOrders = allOrdersArray.map((el) => getOrders(el))
                    const orders = adminAllOrders.flat()
                    this.setState({ orders })
                })
            } else {
                const ordersRef = this.props.firebase.db.ref(`orders/${this.props.userInfo.companyId}`)
                ordersRef.once('value')
                    .then(data => {
                        const companyOrders = data.val()
                        const orders = getOrders(companyOrders);
                        this.setState({ orders })
                    }).catch(err => console.log(err))
            }
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
        const now = new Date();
        const orderDate = date.format(now, 'ddd MMM DD YYYY')
        const orders = [
            ...this.state.orders,
            {
                order,
                summaryPrice,
                orderDate,
                company: userInfo.companyId,
                status: 'in progress',
                createdBy: `${userInfo.firstName} ${userInfo.lastName}`,
                orderID: `${userInfo.companyId}/${this.state.orders.length + 1}`
            }]
        this.props.firebase.db.ref(`orders/${userInfo.companyId}`).push(orders)
        this.setState({
            orders,
            addedToCart: []
        })
    }

    realiseOrderHandler = (orderID, company) => {
        // find order, change status, assign to new array
        const orders = this.state.orders.map((order) => {
            if (order.orderID === orderID) {
                order.status = 'realised'
            }
            return order
        })

        // prepare array with orders of given company
        const companyOrders = []
        orders.forEach(order => {
            if (order.company === company) {
                companyOrders.push(order)
            }
        })

        // set state and save to firebase db
        this.setState(orders)
        this.props.firebase.db.ref(`orders/${company}`).push(companyOrders)
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
                <button onClick={this.checkState}>state</button>
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
                                    orders={orders}
                                    isAdmin={isAdmin}
                                    realiseOrder={this.realiseOrderHandler} />}
                            />
                            {isAdmin ? <Route path='/inventory'
                                component={InventoryPage} /> : null}
                        </>
                        : null}
                    {/* TODO: 404 renders only for NOT logged in users and flashes for few seconds for logged ones then disapears*/}
                    <Route render={() => <p>404 - nope, nothing here, I'm afraid</p>} />
                </Switch>

            </div>
        )
    }
}

export default MainShop;