import React, { Component } from 'react'
import Products from '../Products/Products';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');


class InventoryPage extends Component {

    state = {
        modalIsOpen: false,
        newProduct: {
            id: null,
            type: null,
            name: null,
            price: null,
            inStock: null
        }
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = 'green';
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            newProduct: {}
        });
    }

    handleChange = (event) => {
        const target = event.target
        const input = target.value
        const name = target.name
        const { ...newProduct } = this.state.newProduct
        newProduct[name] = input
        this.setState({ newProduct })
    }

    render() {
        const { products, isAdmin, remove, edit, add } = this.props
        const { modalIsOpen } = this.state
        return (
            <>
                <button onClick={this.openModal}>ADD NEW PRODUCT</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    style={customStyles}
                    contentLabel="Add new product ">
                    <h2 ref={subtitle => this.subtitle = subtitle}>Add new product</h2>
                    <label>
                        Type
                            <input name="type" type="text" onChange={this.handleChange} />
                    </label>
                    <label>
                        id
                            <input name="id" type="text" onChange={this.handleChange} />
                    </label>
                    <label>
                        Name
                            <input name="name" type="text" onChange={this.handleChange} />
                    </label>
                    <label>
                        inStock
                            <input name="inStock" type="text" onChange={this.handleChange} />
                    </label>
                    <label>
                        Price
                            <input name="price" type="text" onChange={this.handleChange} />
                    </label>

                    <button onClick={this.closeModal}>Cancel</button>
                    <button onClick={() => {
                        add(this.state.newProduct)
                        this.closeModal()
                    }}
                    >
                        Add</button>
                </Modal>
                <Products products={products} isAdmin={isAdmin} remove={remove} edit={edit} />
            </>
        )
    }
}

export default InventoryPage;