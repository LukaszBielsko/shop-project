import React, { Component } from 'react'

import ProductsTable from '../ProductsTable/ProductsTable';
import classes from './OrdersPage.module.css';

class Orders extends Component {

    /* TODO  import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table' show table nicely :) */

    render() {
        
        let orders = this.props.orders.map((order, index) => {
            return (
                <div className={classes.Order} key={order.orderID}>
                    <h4>Order ref: {order.orderID} </h4>
                    <h5> Created by {order.createdBy} on {order.date}</h5>
                    <ProductsTable
                        products={order.order}
                        title="Ordered products" />
                    <h5>Summary price: {order.summaryPrice}</h5>
                </div>
            )
        })


        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default Orders;
