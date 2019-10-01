import React, { Component } from 'react'
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

class AdminButtons extends Component {

    state = {
        modalIsOpen: false,
    }

    componentDidMount() {
        const { id, inStock, name, price, type } = this.props.product
        this.setState({ id, inStock, name, price, type })
        console.log('did mount')
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = 'green';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    handleChange = (event) => {
        const target = event.target
        const input = target.value
        const name = target.name
        this.setState({ [name]: input })
    }

    render() {
        const { product, remove } = this.props
        const { modalIsOpen, name, inStock, price, type } = this.state
        return (
            <>
                <button onClick={this.openModal}>EDIT</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    style={customStyles}
                    contentLabel="Edit "
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                    <button onClick={this.closeModal}>close</button>
                    <div>{this.props.product.name}</div>
                    <form>
                        <label>
                            Name
                            <input name="name" type="text" value={name} onChange={this.handleChange} />
                        </label>
                        <label>inStock
                            <input name="inStock" type="text" value={inStock} onChange={this.handleChange} />
                        </label>
                        <label>
                            Price
                            <input name="price" type="text" value={price} onChange={this.handleChange} />
                        </label>
                        <label>
                            Type
                            <input name="type" type="text" value={type} onChange={this.handleChange} />
                        </label>
                        <button onClick={ () => {
                            this.props.edit(this.state)
                            this.closeModal() }
                            }>Save changes</button>
                    </form>
                </Modal>
                {product.isRemoved ?
                    <button> add </button> :
                    <button onClick={() => remove(product.id)}>remove</button>
                }
            </>
        )
    }
}

export default AdminButtons;


/* create a form in the modal
labels corespond with object keys
fill fields with values that can be edited
save and cancel buttons and bob's your uncle */