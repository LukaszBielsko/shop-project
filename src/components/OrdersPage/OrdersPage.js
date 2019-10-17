import React, { Component } from 'react'

import ProductsTable from '../ProductsTable/ProductsTable';
import classes from './OrdersPage.module.css';

class Orders extends Component {

    render() {
        const { orders, isAdmin, realiseOrder } = this.props;

        return (
            <>
                {orders.map((order) => {
                    return ( 
                        <div className={classes.Order} key={order.orderID}>
                            <h4>Order ref: {order.orderID} </h4>
                            <h5> Created by {order.createdBy} on {order.orderDate}</h5>
                            <h5>Status: {order.status}</h5>
                            {isAdmin &&
                                <button 
                                onClick={() => realiseOrder(order.orderID, order.company)}>
                                    Realise
                                </button>}
                            <ProductsTable
                                products={order.order}
                                title="Ordered products" />
                            <h5>Summary price: {order.summaryPrice}</h5>
                        </div>
                        )
                })
                }
            </>
        )
    }

}

export default Orders;
