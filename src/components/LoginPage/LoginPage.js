import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './LoginPage.module.css';

class LoginPage extends Component {

    state = {
        userName: '',
        password: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div className={classes.LoginPage}>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input
                            className={classes.inputField}
                            type="text" name='userName'
                            onChange={this.handleInput}
                            required />
                    </label>
                    <label>
                        Password:
                        <input
                            className={classes.inputField}
                            type="password"
                            name='password'
                            onChange={this.handleInput}
                            required />
                    </label>
                    <input type="submit" value="Login" />
                   <Link to="/register-page">
                       <button> Register </button>
                   </Link>
                </form>
            </div >
        );
    }
};

export default LoginPage;