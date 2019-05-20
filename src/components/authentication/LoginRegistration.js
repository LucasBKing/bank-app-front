import React, { Component, Fragment } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { registerAccountLogin } from '../functions/loginAccountFunctions';
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
        if(this.state.login_name === '' || this.state.password_login === '')
        {
            alert('Please, fill out all fields');
        } else {
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
        
    }

    render() {
        const { user_name, navigate } = this.state;
        if (navigate === true) return <Redirect to={{
            pathname: '/bank_account_registration',
            state: { user_id: this.state.user_id, user_name: this.state.user_name}
        }}/>;
        return(
            <Fragment>
                <Row float="center">
                    <Col className="text-center">
                        <h1>Hello {user_name}, create a login name and a password to connect in your account.</h1>
                        <Form style={{ padding: '30px' }} onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="login_name">
                                    <Form.Label>Login name</Form.Label>
                                    <Form.Control required type="text" placeholder="Login name" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="password_login">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required type="password" placeholder="Password" onChange={this.handleChange} />
                                </Form.Group>
                                
                            </Form.Row>
                            <Button type="submit">
                                Send
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Fragment>
            

        );
    }
}

export default withRouter(LoginRegistration);