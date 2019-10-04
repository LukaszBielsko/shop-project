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
            newProduct: {
                id: null,
                type: null,
                name: null,
                price: null,
                inStock: null
            }
        });
    }

    handleChange = (event) => {
        const target = event.target
        const input = target.value
        const name = target.name
        const { ...newProduct } = this.state.newProduct
        newProduct[name] = input
        console.table(newProduct)
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
                        this.props.add(this.state.newProduct)
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

/*
- On this page admin should see list of items which are currently available, and marked as deleted.
    Products component can be used.
    What about additional features available only for admin?
        - Admin buttons can be coded as component and added conditionally to product comp
  - Each item he should see item type, name, price, number in stock, button to edit, button to remove (only for items that are not removed)
 - removed items should not be displayed in the "Shop" page
- Admin should be able to edit each existing item by clicking "Edit" button which opens/redirects to the form filled with item data. Then he should be able to change all the item properties.


- He should be able to remove items
  - if someone bought them, they should be still visible in the "Orders" and "Cart" page

- Admin should be able to add new items to our inventory.
  - There should be a button "Add new item" which opens/redirects to the form where he can specify all properties of the item
 */