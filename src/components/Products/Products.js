import React from 'react';

import Product from './Product/Product';
import classes from './Products.module.css';

const Products = (props) => {
    return (
        <div className={classes.Products}>
            {props.products.map((product) => {
                return <Product
                    isAdmin={props.isAdmin}
                    /* TODO does not work as a unique key */ 
                    key={product.id}
                    productData={product}
                    add={props.add}
                    remove={props.remove}
                    edit={props.edit} />
            })}
        </div>
    );
};

export default Products;                            



