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
                        return <li key={el.id} >Product Type: {el.type}  Product ID: {el.id}</li>   
                       })}
                   </ol>
                </div>
            )
        }
        // components ideally should do only one thing
        // collect data from the web
        // pass it to products comp
            // display list of products


        console.log('shop renders ', this.state.products)
        return (
            <div>
                <h1>Shop Page</h1>
                {list}
            </div>
        )
    }
}

export default ShopPage;