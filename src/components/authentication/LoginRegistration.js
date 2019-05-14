import React, { Component, Fragment } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
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
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="login_name">
                            <Form.Label>Login name</Form.Label>
                            <Form.Control type="text" placeholder="Login name" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="password_login">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handleChange} />
                        </Form.Group>
                        <Button type="submit">
                            Send
                        </Button>
                    </Form.Row>
                </Form>
            </Fragment>
            

        );
    }
}

export default withRouter(LoginRegistration);