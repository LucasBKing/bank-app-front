import React, { Component, Fragment } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { registerUser } from '../functions/userFunctions';
import { withRouter, Redirect } from 'react-router-dom';

class UserRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            CPF: '',
            user_id: '',
            navigate: false   
        }
    }

    handleDate = (date) => {
        this.setState({
            birthday: date
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();

        let user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            CPF: this.state.CPF
        }

        registerUser(user).then(res => {
            this.setState({
                navigate: true,
                user_id: res.insertId
            });

        });
   
    }

    render() {

        let { navigate } = this.state;
        if (navigate === true) return <Redirect to={{
            pathname: '/login_registration',
            state: { user_id: this.state.user_id, user_name: this.state.first_name}
        }}/>;

        return (
            <Fragment>
                <h1>User Registration</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="first_name">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="last_name">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Phone" onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="CPF">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type="text" placeholder="CPF" onChange={this.handleChange} />
                        </Form.Group>

                        <Button type="submit">
                            Send
                        </Button>
                    </Form.Row>

                </Form>
            </Fragment>        
        );
    }
};

export default withRouter(UserRegistration);

