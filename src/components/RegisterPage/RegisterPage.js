import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';

// create a form 
// register with email and password
// save user to db (with user uid, company, role etc)
class RegisterPage extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        companyId: ''
    }

    handleSubmit = (event) => {
        this.props.firebase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
        this.props.firebase.auth.onAuthStateChanged(user => {
            console.log(user)
            if (user){
                this.setState({uid: user.uid})
                this.props.firebase.db.ref('users').push(this.state)
                // redirect to shop
                this.props.history.push('/shop')
            }
        })

        event.preventDefault()
    }

    handleInput = (event) => {
        const input = event.target.value
        const target = event.target.name
        this.setState({ [target]: input })
    }

    render() {
        const {firstName, lastName, email, password} = this.state
        return (
            <>
                <h4>Pls enter your details</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                        <input
                            value={firstName}
                            type="text" name='firstName'
                            onChange={this.handleInput}
                            required />
                    </label>
                    <label>
                        Last Name:
                        <input
                            value={lastName}
                            type="text" name='lastName'
                            onChange={this.handleInput}
                            required />
                    </label>
                    <select name="companyId" onChange={this.handleInput} >
                        <option value="company-1">company-1</option>
                        <option value="company-2">company-2</option>
                    </select>
                    <label>
                        email:
                        <input
                            value={email}
                            type="email" name='email'
                            onChange={this.handleInput}
                            required />
                    </label>
                    <label>
                        Password:
                        <input
                            value={password}
                            type="password"
                            name='password'
                            onChange={this.handleInput}
                            required />
                    </label>
                    <input type="submit" value="Register" />
                </form>
            </>
        )
    }
}

export default withRouter(RegisterPage);