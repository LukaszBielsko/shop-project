import React from 'react';

import Product from './Product/Product';

const Products = (props) => {
    return (
        <div>
            {props.products.map((product) => {
                return <Product
                    isAdmin={props.isAdmin}
                    key={product.id}
                    productData={product}
                    add={props.add}
                    remove={props.remove} />
            })}
        </div>
    );
};

export default Products;                            



