import React, { Component } from 'react'

import classes from './Product.module.css';

class Product extends Component {

    state = {
        availability: null,
        endPrice: '...',
        howManyProducts: null,
        disableButton: true
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

        if (input <= 0) {
            this.setState({ disableButton: true })
            console.log('input <= 0')
        } else {
            this.setState({ disableButton: false })
        }

        if (input > this.props.productData.inStock) {
            alert('Sorry, not enough items in stock.');
            event.target.value = Math.floor(input / 10) // TODO: shows 0 when number entered is less then 10
            return;
        }

        if (isNaN(fullPrice)) {
            fullPrice = '...'
        }

        this.setState({ endPrice: fullPrice, howManyProducts: input })
    }

    render() {
        return (
            <div className={classes.Product}>
                <p> Product type: {this.props.productData.type}</p>
                <p>Availability: {this.state.availability} </p>
                <p> Product name: {this.props.productData.name}</p>
                <p> Price per unit: {this.props.productData.price} </p>
                <div>
                    How many would you like to order:
                <input
                        type="number"
                        onChange={this.quantityInputHandler} >
                    </input>
                </div>
                <p> Price for all items: {this.state.endPrice} </p>
                <button
                    onClick={() => this.props.add(this.props.productData.id, this.state.howManyProducts)}
                    disabled={this.state.disableButton}
                    min="0">
                    Add to cart
                </button>
            </div>
        )
    }
}

export default Product;
