import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import DefaultImg from '../../assets/images/default.jpg';
import { getAccountBankById } from '../functions/userFunctions';


class UserStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.stats,
            account_type: '',
            balance: ''
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
    
    render() {
        let {  account_type, balance } = this.state;
        return(
            <Fragment>
                <Container>
                    <Row>
                        <Col xs={6} md={4} sm>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Account type: { account_type }</ListGroup.Item>
                            <ListGroup.Item>Balance: { balance }</ListGroup.Item>
                        </ListGroup>
                        </Col>
                        <Col xs={6} md={4} sm>
                            <Image src={DefaultImg} roundedCircle />
                        </Col>
    
                </Row>
                </Container>;
            </Fragment>
        );
    }
    
}

export default UserStats;