import React, { Component } from 'react'

import Products from '../Products/Products';

class ShopPage extends Component {

    render() {
        return (
            <div>
                <Products products={this.props.products} add={this.props.add} />
            </div>
        )
    }
}

export default ShopPage;


