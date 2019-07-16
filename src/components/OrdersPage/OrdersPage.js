import React, { Component } from 'react'

import ProductsTable from '../ProductsTable/ProductsTable';

class Orders extends Component {

    /* TODO  import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table' show table nicely :) */

    render() {

        let orders = this.props.orders.map((order, index) => {
            return (
                <div key={index}>
                    <h3>Order no:{index + 1}</h3>
                    <ProductsTable
                        products={order.order}
                        title="Ordered products" />
                    <h4>Summary price: {order.summaryPrice}</h4>
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
