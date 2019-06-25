import React from 'react';

import ProductRow from '../ProductsTable/ProductRow/ProductRow';

const ProductsTable = (props) => {
//array of products as props
    return (
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
                <ProductRow products={props.products}/> 
            </tbody>
        </table>
    );
};

export default ProductsTable;
