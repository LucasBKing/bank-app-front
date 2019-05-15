import React, { Component, Fragment } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import { getAccountBankById, insertDeposit, updateCurrentDebitBalance } from '../functions/userFunctions';

class DepositModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.user_id,
            value: '',
            messageConfirm: 'Success!!',
            messageError: 'Its not possible do the current deposit'
        }
    }

    componentDidMount() {
        getAccountBankById(this.state.user_id).then( user => {
            this.setState({
                account_type: user.account_type,
                balance: user.balance
            })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        insertDeposit(this.state.user_id, this.state.value).then( res => {
            if(res) {
                updateCurrentDebitBalance(this.state.user_id, this.state.value).then( res => {
                    console.log('Deposit updated');
                })
                console.log(this.state.messageConfirm)
            } else {
                console.log(this.state.messageError)
            }
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
                            Deposit Modal
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="value">
                                    <Form.Label>Value</Form.Label>
                                    <Form.Control type="text" placeholder="$$" onChange={this.handleChange} />
                                </Form.Group>
                                <Button type="submit" >
                                    Deposit
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

export default DepositModal;