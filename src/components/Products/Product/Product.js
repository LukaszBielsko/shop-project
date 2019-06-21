import React, { Component } from 'react'

import classes from './Product.module.css';

class Product extends Component {

    state = {
        availability: null,
        endPrice: '...',
        howManyProducts: null
    }

    componentDidMount() {
        this.checkAvailability()
    }

    checkAvailability = () => {
        const product = this.props.productData
        let availability;

        if (product.inStock === 0) {
            availability = 'not available'
        } else if (product.inStock > 1 && product.inStock <= 10) {
            availability = 'last pieces'
        } else if (product.inStock > 11 && product.inStock <= 100) {
            availability = 'medium supply'
        } else if (product.inStock > 101) {
            availability = 'full supply'
        }

        this.setState({ availability: availability })
    }

    quantityInputHandler = (event) => {
        let input = parseInt(event.target.value)
        let fullPrice = input * this.props.productData.price

        if (input > this.props.productData.inStock) {
            alert('Sorry, not enough items in stock.');
            event.target.value = Math.floor(input / 10)
            return;
        }

        if (isNaN(fullPrice)){
            fullPrice = '...'
        }

        this.setState({ endPrice: fullPrice, howManyProducts: input })
    }

    render() {
        return (
            <div className={classes.Product}>
                <p>Availability: {this.state.availability} </p>
                <p> Product type: {this.props.productData.type}</p>
                <p> Product name: {this.props.productData.name}</p>
                <p> Price per unit: {this.props.productData.price} </p>
                <div>
                    How many would you like to order:
                <input
                        type="number"
                        onChange={this.quantityInputHandler}
                    ></input>
                </div>
                <p> Price for all items: {this.state.endPrice} </p>
                <button>Add to cart</button>
            </div>
        )
    }
}

export default Product;

/*
    id
    type
    name
    price
    inStock

    - When user wants to buy more items than in supply then display error message
    - After clicking "add to cart" the order position should be added to the "Cart".




    - Display price per unit and price depending on the number of ordered items
    - Each product should allow ordering multiple pieces (the price should be calculated on the fly)

    - Amount in stock should not be displayed as exact number, but should be groups:
    - 0 - not available
    - 1-10 - last pieces
    - 11 - 100 - medium supply
    - over 100 - full supply

    -  For every product display group and name, price, input for number of items to order, price, price multiplied by the selected number,     rough amount of items in stock, and "add to cart" button.
*/