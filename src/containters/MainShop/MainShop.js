import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import date from 'date-and-time';

import CartPage from '../../components/CartPage/CartPage';
import OrdersPage from '../../components/OrdersPage/OrdersPage';
import InventoryPage from '../../components/InventoryPage/InventoryPage';
import ShopPage from '../../components/ShopPage/ShopPage';

/* TODO clear state on logout - with onAuthStateChanged */
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
        /*  products are fetched from db only at the start of the app
        but they are being updated in the local state and then after 
        checking out db is updated - not a problem with app like this,
        but with multiple users using app at the same time = problem */

        // get products
        const productsRef = this.props.firebase.db.ref('products')
        /* productsRef.once('value')
            .then((data) => {
                const products = data.val();
                this.setState({ products })
            }) */
        productsRef.limitToLast(1).once('value')
            .then(data => {
                // const a = Object.values(data.val())
                const productsObject = data.val()
                const products = Object.values(productsObject)[0]
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
            /* TODO  limitToLast() might help with complexity of below blocks */
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
            const products = prevState.products.map(item => {
                if (item.id === id) {
                    item.inStock -= pieces
                }
                return item
            })
            return {
                addedToCart: [...prevState.addedToCart, { ...product, pieces }],
                products
            };
        });
    }


    checkoutCartHandler = (summaryPrice) => {
        const { userInfo, firebase } = this.props
        const { products, addedToCart, orders } = this.state
        const order = [...addedToCart]
        const now = new Date();
        const orderDate = date.format(now, 'ddd MMM DD YYYY')
        const updatedOrders = [
            ...orders,
            {
                order,
                summaryPrice,
                orderDate,
                company: userInfo.companyId,
                status: 'in progress',
                createdBy: `${userInfo.firstName} ${userInfo.lastName}`,
                orderID: `${userInfo.companyId}/${orders.length + 1}`
            }]
        firebase.db.ref(`orders/${userInfo.companyId}`).push(updatedOrders)
        firebase.db.ref('products').push(products)
        this.setState({
            orders: updatedOrders,
            addedToCart: []
        })
    }



    realiseOrderHandler = (orderID, company) => {
        // find order, change status, update orders (create a new array of orders with updated order)
        const orders = this.state.orders.map((order) => {
            if (order.orderID === orderID) {
                order.status = 'realised'
            }
            return order
        })
        // create array with orders of given company
        const companyOrders = []
        orders.forEach(order => {
            if (order.company === company) {
                companyOrders.push(order)
            }
        })
        this.setState(orders)
        // save to db
        this.props.firebase.db.ref(`orders/${company}`).push(companyOrders)
    }

    removeProduct = (productId) => {
        // find index of removed index then remove it from products
        const { products } = this.state
        const removedProductIndex = products.find(el => el.id === productId)
        products.splice(removedProductIndex, 1)
        // save to db and change state
        // sth should be changed here - dont like the fact that im updating db
        // and then seting the state - but it works for now
        this.props.firebase.db.ref('products').push(products)
        this.setState(products)
    }


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
                                    orders={orders}
                                    isAdmin={isAdmin}
                                    realiseOrder={this.realiseOrderHandler} />}
                            />
                            {isAdmin ? <Route path='/inventory'
                                render={() => <InventoryPage
                                    isAdmin={isAdmin}
                                    products={products}
                                    remove={this.removeProduct} />} />
                                : null}
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