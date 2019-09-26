import React from 'react';

import Product from './Product/Product';

const Products = (props) => {
    return (
        <div>
            {props.products.map((product) => {
                return <Product
                    isAdmin={props.isAdmin}
                    /* TODO does not work as a unique key */ 
                    key={product.id} t
                    productData={product}
                    add={props.add}
                    remove={props.remove}
                    edit={props.edit} />
            })}
        </div>
    );
};

export default Products;                            



