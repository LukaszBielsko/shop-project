import React, { Component } from 'react'

import classes from './Product.module.css';
class Product extends Component {

    state = {
        endPrice: 0,
        howManyProducts: '',
        disableButton: true,
        inStock: null
    }

    static getDerivedStateFromProps(props) {
        const { inStock } = props.productData
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
        } else if (inStock <= 10) {
            availability = 'last pieces'
        } else if (inStock === 0) {
            availability = 'not available'
        }

        return availability;
    }

    quantityInputHandler = (event) => {
        // without || 0 input would evaluate to NaN, then endPrice would be NaN as well
        const input = parseInt(event.target.value) || 0

        if (input <= 0) {
            this.setState({ howManyProducts: '', endPrice: 0 });
            return;
        } else if (input > this.props.productData.inStock) {
            alert('Sorry, not enough items in stock.');
            const inputValidated = input.toString().slice(0, -1)
            this.setState({ howManyProducts: inputValidated })
            return;
        } else {
            const endPrice = input * this.props.productData.price
            this.setState({ disableButton: false, howManyProducts: input, endPrice })
        }
    }

    /* TODO clear input state after clicking buy button */ 

    render() {
        const product = this.props.productData
        const availability = this.checkAvailability(this.state.inStock)
        const { endPrice, howManyProducts, disableButton } = this.state

        return (
            <div className={classes.Product}>
                <p> Product type: {product.type}</p>
                <p>Availability: {availability}   </p>
                <p> Product name: {product.name}</p>
                <p> Price per unit: {product.price} </p>
                <div>
                    Quantity:
                <input
                        value={howManyProducts.toString()}
                        type="number"
                        onChange={this.quantityInputHandler} >
                    </input>
                </div>
                <p> Price for all items: {endPrice} </p>
                <button
                    onClick={() => this.props.add(product.id, howManyProducts)}
                    disabled={disableButton}
                    min="0">
                    Add to cart
                </button>
            </div>
        )
    }
}

export default Product;
