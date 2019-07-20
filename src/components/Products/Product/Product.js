import React, { Component } from 'react'

import classes from './Product.module.css';

/* TODO - edit and delete button for admin */
/* We need a page accessible only for the admin where he can add items to our inventory, and refill existing resources.

- On this page admin should see list of items which are currently available, and marked as deleted.
  - Each item he should see item type, name, price, number in stock, button to edit, button to remove (only for items that are not removed)
- Admin should be able to edit each existing item. by clicking "Edit" button which opens/redirects to the form filled with item data. Then he should be able to change all the item properties.
- He should be able to remove items
  - if someone bought them, they should be still visible in the "Orders" and "Cart" page
  - removed items should not be displayed in the "Shop" page
- Admin should be able to add new items to our inventory.
  - There should be a button "Add new item" which opens/redirects to the form where he can specify all properties of the item
  */

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
            event.target.value = Math.floor(input / 10) // FIXME: shows 0 when number entered is less then 10
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
        const {endPrice, howManyProducts, disableButton} = this.state

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
