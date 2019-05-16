import React, { Component, Fragment } from 'react';
import { Form, Col, Button, Modal  } from 'react-bootstrap';
// import { getAccountBankById } from '../functions/userFunctions';
import { getFriendsList, getUserById } from '../../functions/userFunctions';

class TransactionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.user_id,
            login_id: props.login_id,
            value: '',
            transaction_to: '',
            list_possible_transaction: [], 
            messageConfirm: 'Success!!',
            messageError: 'Its not possible do the current deposit'
        }
    }

    componentDidMount() {
        // getAccountBankById(this.state.user_id).then( user => {
        //     this.setState({
        //         account_type: user.account_type,
        //         balance: user.balance
        //     })
        // })
        getFriendsList(this.state.login_id).then(res => {
            if(res) {
                res.map(users => {
                    getUserById(users.account_to).then(user => {
                        user.map( atts => {
                            if(atts.status === "Aceito") {
                                let newUser = {
                                    first_name: atts.first_name,
                                    last_name: atts.last_name,
                                    status: users.status
                                }
                                
                                this.setState({
                                    list_possible_transaction: [...this.state.list_possible_transaction, newUser ]
                                })
                            }
                            
                        })
                    })
                })
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // insertDeposit(this.state.user_id, this.state.value).then( res => {
        //     if(res) {
        //         updateCurrentDebitBalance(this.state.user_id, this.state.value).then( res => {
        //             console.log('Deposit updated');
        //         })
        //         console.log(this.state.messageConfirm)
        //     } else {
        //         console.log(this.state.messageError)
        //     }
        // })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleChangeTransaction = (event) => {
        this.setState({
            transaction_to: event.target.value
        });
    }


    render() {
        const { to, staticContext, ...rest } = this.props;
        let { list_possible_transaction } = this.state;

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
                            Transaction Modal
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="value">
                                    <Form.Label>Value</Form.Label>
                                    <Form.Control type="text" placeholder="$$" onChange={this.handleChange} />
                                    <Form.Group controlId="transaction_to">
                                        <Form.Label>Select a friend</Form.Label>
                                        <Form.Control as="select" onChange={this.handleChangeTransaction}>
                                        {
                                            list_possible_transaction.map((user, key) => {
                                                return <option key={key}>1</option>
                                            })
                                        }
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Group>
                                <Button type="submit" >
                                    Transaction
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

export default TransactionModal;