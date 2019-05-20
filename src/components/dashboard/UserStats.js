import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import DefaultImg from '../../assets/images/default.jpg';
import { getAccountBankById } from '../functions/accountBankFunctions';
import { getAccountCreditCardByAccountBankId } from '../functions/creditCardFunctions';
import {getUserById } from '../functions/userFunctions';
import CreditCardModal from './CreditCardModal';


class UserStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.stats,
            account_bank_id: null,
            account_type: '',
            balance: '',
            first_name: '',
            last_name: '',
            hasCreditCard: false,
            balance_credit_card: '',
            credit_card_line: '',
            modalCreditCardShow: false
        }
    }
    async componentDidMount() {
        // const results = await requests(this.state.user_id);
        // console.log(results);
        getAccountBankById(this.state.user_id).then( user => {
            if(user) {
                this.setState({
                    account_bank_id: user.account_bank_id,
                    account_type: user.account_type,
                    balance: user.balance
                })
                
                getUserById(this.state.user_id).then(user => {
                    
                    this.setState({
                        first_name: user[0].first_name,
                        last_name: user[0].last_name
                    })
                    getAccountCreditCardByAccountBankId(this.state.account_bank_id).then( res => {
                        if (res) {
                            this.setState({
                                balance_credit_card: res.results[0].balance,
                                hasCreditCard: true,
                            })
                        }
                    })
                })
            }
        });
    }
    
    render() {
        let modalCreditCardClose = () => this.setState({ modalCreditCardShow: false });
        let {  account_type, balance, balance_credit_card, hasCreditCard } = this.state;
        let { account_bank_id } = this.state;
        if(account_bank_id === null) {
            return null;
        }
        
        return(
            <Fragment >
                <Container>
                    <Row float="center" >
                        <Col className="text-center" xs={4} md={3} sm>
                            <Image src={DefaultImg} roundedCircle fluid style={{maxWidth: '200px', maxHeight: '150px', width: 'auto', height: 'auto', marginBottom: '5px'}}/>
                            <h5>{ account_type }</h5>
                            <h4>{this.state.first_name + ' ' +this.state.last_name}</h4>
                        </Col>
                    
                        <Col xs={8} md={9} sm>
                            <ListGroup  fluid variant="flush">
                                
                                <ListGroup.Item ><h3>Balance debit: </h3><h3 style={{ fontWeight: 'bold' }}>R${ balance }</h3></ListGroup.Item>
                                { hasCreditCard
                                ?
                                    <ListGroup.Item style={{ border: 'none' }}><h3>Balance credit card:</h3><h3 style={{ fontWeight: 'bold'}}>R${ balance_credit_card }</h3></ListGroup.Item>
                                :
                                    <Button className="custom-button-create-cc" block onClick={() => this.setState({ modalCreditCardShow: true })}>
                                        Create your credit card now!
                                    </Button>
                                }
                                
                            </ListGroup>
                        </Col>
                        
    
                </Row>
                </Container>
                <CreditCardModal
                    account_type={this.state.account_type}
                    account_bank_id={this.state.account_bank_id}
                    show={this.state.modalCreditCardShow}
                    onHide={modalCreditCardClose}
                />
            </Fragment>
        );
    }
    
}

export default UserStats;