import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import ProductsTable from '../ProductsTable/ProductsTable';

class Cart extends Component {
    render() {

        const reducer = (accumulator, element) => accumulator + (element.price * element.pieces)
        const summaryPrice = this.props.addedToCart.reduce(reducer, 0)

        return (
            <>
                <ProductsTable products={this.props.addedToCart} />
                <p>Summary price: {summaryPrice} </p>
                <Link to='/orders'>
                    <button onClick={() => this.props.checkoutOrder(summaryPrice)}> Buy {`<redirects to Orders>`}</button>
                </Link>
            </>
        )
    }
}

export default Cart;
