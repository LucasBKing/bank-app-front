import React, { Component, Fragment } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import { createCreditCard } from '../functions/userFunctions';
let generator = require('creditcard-generator');
let moment = require('moment');

class CreditCardModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account_bank_id: props.account_bank_id,
            account_type: props.account_type,
            password: '',
            messageConfirm: 'Success!!',
            messageError: 'Its not possible create credit card, please contact us.'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const code = generator.GenCC("VISA");

        let creditCard = {
            code: code[0],
            balance: 0,
            credit_line: '',
            password_cd: this.state.password,
            due_date: moment().add(10, 'years').calendar(),
            account_bank_id: this.state.account_bank_id
        }

        switch(this.state.account_type) {
            case 'Bronze':
                creditCard.credit_line = 200;
                break;
            case 'Silver':
                creditCard.credit_line = 400;
                break;
            case 'Gold':
                creditCard.credit_line = 600;
                break;
            case 'Platinum':
                creditCard.credit_line = 1000;
                break;
            default:
                creditCard.credit_line = 0;
        }

        createCreditCard(creditCard).then(res => {
            console.log(res);
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
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
                            Create Credit Card Modal
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Passwrod" onChange={this.handleChange} />
                                </Form.Group>
                                <Button type="submit" >
                                    Create
                                </Button>
                            </Form.Row>
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

export default CreditCardModal;