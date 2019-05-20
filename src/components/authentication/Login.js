import React, { Component, Fragment } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import { loginAccount } from '../functions/loginAccountFunctions';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            login_name: '',
            password_login: ''
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
        }

        loginAccount(account).then( res => {
            this.props.history.push('/dashboard');
        })

    }

    render() {
        const { to, staticContext, ...rest } = this.props;
        return (
            <Fragment>
                <Modal
                    {...rest}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="login_name">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Login name" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="password_login">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Button type="submit">
                                Send
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
                
            </Fragment>
        );
    }
}

export default withRouter(Login);