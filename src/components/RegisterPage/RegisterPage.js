import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';

import classes from './RegisterPage.module.css';

class RegisterPage extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        companyId: 'company-1'
    }

    handleSubmit = (event) => {
        this.props.firebase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
        this.props.firebase.auth.onAuthStateChanged(user => {
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
            <div className={classes.RegisterPage}>
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
                    <select required name="companyId" onChange={this.handleInput} >
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
            </div>
        )
    }
}

export default withRouter(RegisterPage);