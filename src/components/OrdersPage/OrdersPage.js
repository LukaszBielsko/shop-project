import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

import ProductsTable from '../ProductsTable/ProductsTable';

class Orders extends Component {

    render() {
        const { orders, isAdmin, realiseOrder } = this.props;

        return (
            <div className="orders">
                {orders.map((order) => {
                    return (
                        <Card className="order" key={order.orderID}>
                            <h3>Order ref: {order.orderID} </h3>
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
                        </Card>
                    )
                })
                }
            </div>
        )
    }

}

export default Orders;
