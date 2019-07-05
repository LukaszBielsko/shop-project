import React, { Component } from 'react'

import classes from './Product.module.css';

class Product extends Component {

    state = {
        endPrice: 0,
        howManyProducts: null,
        disableButton: true,
        inStock: null
    }

    static getDerivedStateFromProps(props){
        const {inStock} = props.productData 
        return {
            inStock
        }
    }

    checkAvailability = (inStock) => {
        let availability;

        if (inStock > 101) {
            availability = 'full supply'
        } else if (inStock <= 100) {
            availability = 'medium supply'
        } else if (inStock <= 10){
            availability = 'last pieces'
        } else if (inStock === 0) {
            availability = 'not available'
        }

        return availability;
    }

    quantityInputHandler = (event) => {
        const input = parseInt(event.target.value)
        let endPrice = input * this.props.productData.price

        if (input <= 0) {
            this.setState({ disableButton: true })
        } else {
            this.setState({ disableButton: false })
        }

        if (input > this.props.productData.inStock) {
            alert('Sorry, not enough items in stock.');
            event.target.value = Math.floor(input / 10) // TODO: shows 0 when number entered is less then 10
            return;
        }

        if (isNaN(endPrice)) {
            endPrice = 0
        }

        this.setState({ endPrice, howManyProducts: input })
    }


    render() {
        const product = this.props.productData
        const availability = this.checkAvailability(this.state.inStock)

        return (
            <div className={classes.Product}>
                <p> Product type: {product.type}</p>
                <p>Availability: {availability}   </p>
                <p> Product name: {product.name}</p>
                <p> Price per unit: {product.price} </p>
                <div>
                    How many would you like to order:
                <input
                        type="number"
                        onChange={this.quantityInputHandler} >
                    </input>
                </div>
                <p> Price for all items: {this.state.endPrice} </p>
                <button
                    onClick={() => this.props.add(product.id, this.state.howManyProducts)}
                    disabled={this.state.disableButton}
                    min="0">
                    Add to cart
                </button>
            </div>
        )
    }
}

export default Product;
