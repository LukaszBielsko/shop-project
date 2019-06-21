import React from 'react';

import classes from './Product.module.css';

const Product = (props) => {

    const product = props.productData

    console.log('oneProduct renders')

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

    return (
        <div className={classes.Product}>
            <p>Availability: {availability} </p>
            <p> Product type: {product.type}</p>
            <p> Product name: {product.name}</p>
            <p> Price per unit: {product.price} </p>
            <div>
                How many would you like to order: <input type="number"></input>
            </div>
            <p> TODO: price multiplied by the selected number on the fly </p>
            <button>Add to cart</button>
        </div>
    );
};

export default Product;

/*
    id
    type
    name
    price
    inStock

    - Amount in stock should not be displayed as exact number, but should be groups:
    - 0 - not available
    - 1-10 - last pieces
    - 11 - 100 - medium supply
    - over 100 - full supply
    - Each product should allow ordering multiple pieces (the price should be calculated on the fly)
    - Display price per unit and price depending on the number of ordered items
    - When user want to buy more items than in supply then display error message
    - After clicking "add to cart" the order position should be added to the "Cart".



    -  For every product display group and name, price, input for number of items to order, price, price multiplied by the selected number,     rough amount of items in stock, and "add to cart" button.
*/