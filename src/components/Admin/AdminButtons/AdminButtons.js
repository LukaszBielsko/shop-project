import React, { Component } from 'react'

class AdminButtons extends Component {


    checkId = (id) => {
        console.log(id)
    }

    render() {
      
        return (
            <>
                <button>edit</button>
                <button onClick={() => this.checkId(this.props.product.id) }>remove</button>
            </>
        )
    }
}

export default AdminButtons;

