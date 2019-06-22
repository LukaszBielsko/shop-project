import React, { Component } from 'react'
import axios from 'axios';

import Products from '../../components/Products/Products';

class ShopPage extends Component {

    state = {
        products: []
    }

    componentDidMount() {
        axios.get('http://localhost:3000/products')
            .then(response => {
                this.setState({ products: response.data })
            })
    }

    render() {
        return (
            <div>
                <Products products={this.state.products} />
            </div>
        )
    }
}

export default ShopPage;