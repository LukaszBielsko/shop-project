import React from 'react';

const Product = (props) => {

    const productData = props.productInfo

    console.log('oneProduct renders')
    return (
        <p> some product props {productData.id}</p>
    );
};

export default Product;

/* 
    id
    type
    name
    price
    inStock  
*/