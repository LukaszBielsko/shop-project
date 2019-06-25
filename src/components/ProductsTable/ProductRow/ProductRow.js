import React from 'react';

const ProductRow = (props) => {

    return (
        props.products.map((product) => (
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.pieces}</td>
                <td>{product.price}</td>
                <td>{product.pieces * product.price}</td>
            </tr>
            )
        )
    )
};

export default ProductRow;