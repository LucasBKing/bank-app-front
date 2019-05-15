import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import DefaultImg from '../../assets/images/default.jpg';
import { getAccountBankById, getAccountCreditCardByAccountBankId } from '../functions/userFunctions';
import CreditCardModal from './CreditCardModal';


class UserStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.stats,
            account_bank_id: null,
            account_type: '',
            balance: '',
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
                
                
                getAccountCreditCardByAccountBankId(this.state.account_bank_id).then( res => {
                    if (res) {
                        this.setState({
                            balance_credit_card: res.results[0].balance,
                            hasCreditCard: true,
                        })
                    }
                })
            }
        });
              //.then( user => {
        //     
            
        // })
    }
    
    render() {
        let modalCreditCardClose = () => this.setState({ modalCreditCardShow: false });
        let {  account_type, balance, balance_credit_card, hasCreditCard } = this.state;
        let { account_bank_id } = this.state;
        if(account_bank_id === null) {
            return null;
        }
        
        return(
            <Fragment>
                <Container>
                    <Row>
                        <Col xs={6} md={4} sm>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Account type: { account_type }</ListGroup.Item>
                            <ListGroup.Item>Balance debit: { balance }</ListGroup.Item>
                            { hasCreditCard
                            ?
                                <ListGroup.Item>Balance credit card: { balance_credit_card }</ListGroup.Item>
                            :
                                <Button variant="outline-info" onClick={() => this.setState({ modalCreditCardShow: true })}>
                                    Create your credit card now!
                                </Button>
                            }
                            
                        </ListGroup>
                        </Col>
                        <Col xs={6} md={4} sm>
                            <Image src={DefaultImg} roundedCircle />
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