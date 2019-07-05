import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import ProductsTable from '../ProductsTable/ProductsTable';

class Cart extends Component {

    summaryPrice = () => {
        return this.props.addedToCart.reduce(
            (summaryPrice, { price, pieces }) => summaryPrice + (price * pieces)
            , 0)
    }


    render() {
        const { addedToCart, checkoutOrder } = this.props;
        const summaryPrice = this.summaryPrice();

        if (!addedToCart.length) {
            return (
                <p>No products in the cart</p>
            )
        }

        return (
            <>
                <ProductsTable
                    products={addedToCart}
                    title="Products in your cart" />
                <p>Summary price: {summaryPrice} </p>
                <Link to='/orders'>
                    <button onClick={() => checkoutOrder(summaryPrice)}> Buy </button>
                </Link>
            </>
        )
}
}

export default Cart;
