import React, { Component } from 'react'

import ProductsTable from '../ProductsTable/ProductsTable';

class Orders extends Component {

    showProps = () => console.log(this.props.orders.map((el) => el.order))

    render() {

        let plainOrder = this.props.orders.map((el) => el.order);
        console.log(plainOrder)

        let orders = this.props.orders.map((or, index) => {
            return (
                <>
                    <h3>Order no:{index}</h3>
                    <ProductsTable 
                    products={plainOrder}
                    title="Ordered products" />
                    <h4>Summary price: {or.summaryPrice}</h4>
                </>
            )
        })


        return (
            <div>
                {orders}
                <button onClick={this.showProps}>  click for props </button>
            </div>
        )
    }
}

export default Orders;

//  {order: order, summaryPrice: summaryPrice}