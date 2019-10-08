import React, { Component } from 'react'

// create a form 
// register with email and password
// save user to db (with user uid, company, role etc)
class RegisterPage extends Component {

    state = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        company: ['company-1', 'company-2']
    }

    handleInput = (event) => {
        return null
    }

    render() {
        return (
            <>
                <h4>Pls enter your details</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text" name='firstName'
                            onChange={this.handleInput}
                            required />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text" name='lastName'
                            onChange={this.handleInput}
                            required />
                    </label>
                    <select>
                        <option value="company-1">company-1</option>
                        <option value="company-2">company-2</option>
                    </select>
                    <label>
                        email:
                        <input
                            type="text" name='email'
                            onChange={this.handleInput}
                            required />
                    </label>
                    <label>
                        Password:
                        <input
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

export default RegisterPage;