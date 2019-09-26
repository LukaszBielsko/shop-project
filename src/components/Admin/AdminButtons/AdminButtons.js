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

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }


    render() {

        return (
            <>
                <button onClick={this.openModal}>EDIT</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    style={customStyles}
                    contentLabel="Edit "
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                    <button onClick={this.closeModal}>close</button>
                    <div>{this.props.product.name}</div>
                    <form>
                        <input name='product-name' value={this.props.product.name} />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal>
                <button onClick={() => this.props.remove(this.props.product.id)}>remove</button>
            </>
        )
    }
}

export default AdminButtons;

