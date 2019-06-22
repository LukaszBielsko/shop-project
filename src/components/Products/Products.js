import React from 'react';

import Product from './Product/Product';

const Products = (props) => {
    return (
        <div>
            {props.products.map((product) => {
                return <Product
                    key={product.id}
                    productData={product} />
            })}
        </div>
    );
};

export default Products;



