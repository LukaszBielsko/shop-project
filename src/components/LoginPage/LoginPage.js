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

    handleUserName = (event) => {
        this.setState({ userName: event.target.value })
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
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
                            type="text" name='username'
                            onChange={this.handleUserName}
                            required />
                    </label>
                    <label>
                        Password:
                        <input
                            className={classes.inputField}
                            type="password"
                            name='password'
                            onChange={this.handlePassword}
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