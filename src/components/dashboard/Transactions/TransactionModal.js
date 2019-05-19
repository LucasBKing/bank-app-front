import React, { Component, Fragment } from 'react';
import { Form, Col, Button, Modal  } from 'react-bootstrap';
import { getAccountBankById } from '../../functions/userFunctions';
import { 
    getUserById, 
    insertTransaction, 
    updateCurrentDebitBalance, 
    getCurrentDebitBalance, 
    getAccountCreditCardByAccountBankId, 
    updateCurrentCreditCardBalance
} from '../../functions/userFunctions';
import {
    getFriendsList
} from '../../functions/login_accountFunctions';
import {
    getTransactions,
    updateTransactionStatus
} from '../../functions/transactionsFunctions'



function testTransactionDuplicated(id1, id2, transaction_type) {
    
    getTransactions(id2).then( transactions => {
        
        let length = transactions.length;
        let created2 = new Date(transactions[length-2].Created)
        let created1 = new Date(transactions[length-1].Created)
        
        let newTransaction = {
            value: transactions[length-1].value,
            by_who: transactions[length-1].account_bank_id,
            to_who: transactions[length-1].to_who,
            year: created1.getFullYear(),
            month: created1.getMonth() + 1,
            day: created1.getDate(),
            hours: created1.getHours(),
            minutes: created1.getMinutes(),
            seconds: created1.getSeconds(),
            status: 'ok'
        }

        let oldTransaction = {
            Id: transactions[length-2].Id,
            value: transactions[length-2].value,
            by_who: transactions[length-2].account_bank_id,
            to_who: transactions[length-2].to_who,
            year: created2.getFullYear(),
            month: created2.getMonth() + 1,
            day: created2.getDate(),
            hours: created2.getHours(),
            minutes: created2.getMinutes(),
            seconds: created2.getSeconds(),
            status: transactions[length-2].status ? 'ok' : 'cancelled'
        }
        
        if (newTransaction.value === oldTransaction.value &&
            newTransaction.by_who === oldTransaction.by_who &&
            newTransaction.to_who === oldTransaction.to_who &&
            newTransaction.year === oldTransaction.year &&
            newTransaction.month === oldTransaction.month &&
            newTransaction.day === oldTransaction.day &&
            newTransaction.hours === oldTransaction.hours
            ) {
                if( (newTransaction.minutes - oldTransaction.minutes) < 2 ) {
                    updateTransactionStatus(oldTransaction.Id).then(res => {
                        if(transaction_type === "debit") {
                            updateCurrentDebitBalance(id2, newTransaction.value).then(res2 => {
                                updateCurrentDebitBalance(newTransaction.to_who, -newTransaction.value).then(res2 => {
                                    console.log("asd", res, res2);
                                })    
                            })
                        } else if(transaction_type === "credit card") {
                            updateCurrentDebitBalance(newTransaction.to_who, -newTransaction.value).then(res2 => {
                                updateCurrentCreditCardBalance(id1, -newTransaction.value).then(res2 => {
                                    console.log("asdasd", res, res2);
                                })    
                            })
                        } 
                    })
                } 
            }
            
    })
    
}

class TransactionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.user_id,
            login_id: props.login_id,
            value: '',
            balance: null,
            transaction_to: 'Choose',
            id_transaction_to: null, 
            account_bank_id: '',
            list_possible_transaction: [], 
            messageConfirm: 'Success!!',
            messageError1: 'Insufficient funds.',
            messageError2: 'Insufficient funds. But we have a solution, do you want to use the Ekki Credit Card?',
            formCreditCardDisplay: 'none',
            formTransactionDisplay: 'block',
            showInsufficientMoney: false,
            account_to_insert_transaction: null
        }
    }

    componentDidMount() {
        
        let user = {
            account_login_id: this.state.login_id,
            user_id: this.state.user_id
        }
        // Get the account bank Id to make future transactions
        getAccountBankById(user.user_id).then( account => {
            this.setState({
                account_bank_id: account.account_bank_id
            })
            // Get friend list
            getFriendsList(user.account_login_id).then(res => {
                if(res) {
                    // Getting one by one
                    res.map(users => {
                            // Getting the friend stats from Users table
                            getUserById(users.account_to).then(user => {
                                // Getting one by one
                                user.map( atts => {
                                    // Getting the account bank Id of friend
                                    getAccountBankById(atts.Id).then( account_friend => {
                                        
                                        if(users.status === "Aceito") {
                                            let newUser = {
                                                first_name: atts.first_name,
                                                last_name: atts.last_name,
                                                user_id: atts.Id,
                                                account_bank_id: account_friend.account_bank_id
                                            }
                                            this.setState({
                                                list_possible_transaction: [...this.state.list_possible_transaction, newUser ]
                                            })

                                        }        
                                    })                        
                                })
                            })
                          
                    })
                }
            });
        })
        
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Getting the account_bank_id from user to recieve the value
        let account_to_insert_transaction = this.state.list_possible_transaction.find( option => option.account_bank_id === this.state.transaction_to);
        this.setState({
            account_to_insert_transaction: account_to_insert_transaction
        })
        // Getting the current debit balance to test if it's possible to make the transaction
        getCurrentDebitBalance(this.state.account_bank_id).then(currentBalance => {
            //If debit balance is insufficiente, try to get credit card Id
            if (currentBalance < this.state.value) {
                getAccountCreditCardByAccountBankId(this.state.account_bank_id).then(currentCreditCardBalance => {
                    
                        // Setting up the Credit Card Id, cause in the future the user can use it to transfer money by credit card
                        this.setState({
                            credit_card_id: currentCreditCardBalance.results[0].Id
                        })
                        
                        // Testing if there is a credit card
                        if(currentCreditCardBalance) {    
                            let creditCardBalance = currentCreditCardBalance.results[0].balance;
                            let creditCardLine = currentCreditCardBalance.results[0].credit_line;
                            // If its impossible use credit card to solve problem
                            if ((creditCardBalance === creditCardLine) || ((creditCardBalance + this.state.value) >  creditCardLine)) {
                                this.setState({
                                    showInsufficientMoney: true
                                })
                            } else {
                                // Try to withdraw from creditcard
                                this.setState({
                                    formCreditCardDisplay: 'block',
                                    formTransactionDisplay: 'none'
                                })
                            }
                        }
                        // If user dont have credit card and dont have money
                        this.setState({
                            showInsufficientMoney: true
                        })
                    
                })
                
            } else {
                // Creating a new transaction
                insertTransaction(account_to_insert_transaction.account_bank_id, this.state.account_bank_id, this.state.value).then( res => {
                    // Updating the recieved value to user
                    updateCurrentDebitBalance(account_to_insert_transaction.user_id, this.state.value).then(res => {
                        // Updating the withdraw
                        updateCurrentDebitBalance(this.state.user_id, -this.state.value).then(res2 => {
                            // Try identify if last transactions was the same
                            testTransactionDuplicated(this.state.user_id, this.state.account_bank_id, "debit");
                            
                        })  
                    })
                })
            }            
        })      
    }

    handleAccetpWithdrawFromCreditCard = (event) => {
        // Creating a new transaction
        insertTransaction(this.state.account_to_insert_transaction.account_bank_id, this.state.account_bank_id, this.state.value).then( res => {
            // Updating the recieved value to user
            updateCurrentDebitBalance(this.state.account_to_insert_transaction.user_id, this.state.value).then(res => {
                // Updating the withdraw from credit card
                updateCurrentCreditCardBalance(this.state.credit_card_id, this.state.value).then(res2 => {
                    // Try identify if last transactions was the same
                    testTransactionDuplicated(this.state.credit_card_id, this.state.account_bank_id, "credit card")
                })  
            })
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: parseFloat(event.target.value),
            showInsufficientMoney: this.state.showInsufficientMoney ? false : null
        });
    }

    handleChangeTransaction = (event) => {
        this.setState({
            transaction_to: parseInt(event.target.value),
            showInsufficientMoney: this.state.showInsufficientMoney ? false : null
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
                                <Form.Group as={Col} controlId="value" style={{ display: this.state.formTransactionDisplay }}>
                                    <Form.Label>Value</Form.Label>
                                    <Form.Control type="text" placeholder="$$" onChange={this.handleChange} />
                                    <Form.Group controlId="transaction_to">
                                        <Form.Label>Select a friend</Form.Label>
                                        <Form.Control as="select" onChange={this.handleChangeTransaction}>
                                            <option>Choose</option>
                                        {
                                            list_possible_transaction.map((user, key) => {
                                                return <option key={key} value={user.account_bank_id}>{user.first_name} {user.last_name}</option>
                                            })
                                        }
                                        </Form.Control>
                                        <Form.Text className="text-muted" style={{ display: this.state.showInsufficientMoney ? 'block' : 'none'}}>
                                            You cant do transactions cause you dont have money.
                                        </Form.Text>
                                    </Form.Group>
                                    <Button type="submit" >
                                        Transaction
                                    </Button>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group as={Col} controlId="formError1" style={{ display: this.state.formCreditCardDisplay }}>
                                <Form.Label>{this.state.messageError2}</Form.Label>
                                <Form.Row>
                                    <Button type="submit" onClick={this.handleAccetpWithdrawFromCreditCard}>
                                        Accept
                                    </Button>
                                    <Button type="submit" onClick={() => this.setState({ formCreditCardDisplay: 'none', formTransactionDisplay: 'block', value: ''})}>
                                        No
                                    </Button>
                                </Form.Row>
                            </Form.Group>
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