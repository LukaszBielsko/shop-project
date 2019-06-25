import React, { Component } from 'react'
import { Link } from 'react-router-dom';
class Cart extends Component {
    render() {

        let productsInCart = this.props.addedToCart.map((product) => {
            return (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.pieces}</td>
                    <td>{product.price}</td>
                    <td>{product.pieces * product.price}</td>
                </tr>
            )
        })

        const reducer = (accumulator, element) => accumulator + (element.price * element.pieces)
        const summaryPrice = this.props.addedToCart.reduce(reducer, 0)

        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="4">Products in your cart</th>
                        </tr>
                        <tr>
                            <th>Product</th>
                            <th>Pieces ordered</th>
                            <th>Price per unit</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsInCart}
                    </tbody>
                </table>
                <p>Summary price: {summaryPrice} </p>
                <Link to='/orders'>
                    <button onClick={() => this.props.checkoutOrder(summaryPrice)}> Buy {`<redirects to Orders>`}</button>
                </Link>
            </>
        )
    }
}

export default Cart;
