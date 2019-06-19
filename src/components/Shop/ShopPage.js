import React, { Component } from 'react'
import axios from 'axios';

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

        let list = null;

        if (this.state.products){
            list = (
                <div>
                   <ol>
                       { this.state.products.map( (el) => {
                        return <li>Product Type: {el.type}  Product ID: {el.id}</li>   
                       })}
                   </ol>
                </div>
            )
        }


        console.log('did mount ', this.state.products)
        return (
            <div>
                <h1>Shop Page</h1>
                {list}
            </div>
        )
    }
}

export default ShopPage;