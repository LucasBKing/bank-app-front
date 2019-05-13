import React, { Component, Fragment } from 'react';
import { TextField, Button } from '@material-ui/core';
import { registerAccountLogin } from '../functions/userFunctions';
import { withRouter, Redirect } from 'react-router-dom';

class LoginRegistration extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            user_id: this.props.location.state.user_id,
            user_name: this.props.location.state.user_name,
            login_name: '',
            password_login: '',
            navigate: false
        }        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let account = {
            login_name: this.state.login_name,
            password_login: this.state.password_login,
            user_id: this.state.user_id
        }

        registerAccountLogin(account).then(res => {
            this.setState({
                navigate: true
            });
        })
    }

    render() {
        const { user_name, navigate } = this.state;
        if (navigate === true) return <Redirect to={{
            pathname: '/bank_account_registration',
            state: { user_id: this.state.user_id, user_name: this.state.user_name}
        }}/>;
        return(
            <Fragment>
                <h1>Olá Sr. {user_name}, crie um login e senha para acessar sua conta online.</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* User */}
                    <TextField
                        id="login_name"
                        label="Login name"
                        value={this.state.login_name}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="password_login"
                        label="Password"
                        value={this.state.password_login}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button type="submit" variant="contained" size="medium" color="primary">
                        Send 
                    </Button>
                </form>
            </Fragment>
            

        );
    }
}

export default withRouter(LoginRegistration);