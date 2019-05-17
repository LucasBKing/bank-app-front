import React, { Component, Fragment } from 'react';
import { Button, Nav, Navbar, Container, Col, Row } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import UserStats from './UserStats';
import DepositModal from './DepositModal';
import MakeFriendsModal from './MakeFriendsModal';
import ListFriends from './Friends/ListFriends';
import TransactionModal from './Transactions/TransactionModal';
import { getFriendsRequests } from '../functions/userFunctions';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            user_id: null,
            login_id: null,
            friendRequest: false, 
            modalDepositShow: false,
            modalMakeFriendsShow: false,
            modalTransaction: false
        }
    }

    componentDidMount() {
        let token = localStorage.usertoken;

        if(token) {
            try {
                let decoded = jwt_decode(token)
                this.setState({
                    name: decoded.dataValues.login,
                    user_id: decoded.dataValues.user_id,
                    login_id: decoded.dataValues.login_id
                })
                getFriendsRequests(decoded.dataValues.user_id).then(res => {
                    if(res.length > 0) {
                        this.setState({
                            friendRequest: true
                        })
                        console.log(res);
                    }
                })
                
            } catch(error) {
                console.log(error);
            }
            
        } else {
            this.props.history.push('/');
        }
        
    }

    handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }

    handleDoTransaction = (event) => {
        event.preventDefault();
        console.log("handle do transaction")
    }

    render() {
        let modalDepositClose = () => this.setState({ modalDepositShow: false });
        let modalMakeFriendsClose = () => this.setState({ modalMakeFriendsShow: false });
        let modalTransactionClose = () => this.setState({ modalTransactionShow: false });

        let { user_id } = this.state;
        if(user_id === null) {
            return null;
        }
        return (
            <Fragment>
            <Navbar bg="dark" variant="dark">
                <Nav>
                    <Navbar.Brand href="#home">Ekki</Navbar.Brand>
                </Nav>
                <Nav className="ml-auto">
                    {this.state.friendRequest 
                    ?
                        <Button variant="warning" onClick={() => this.props.history.push({
                                pathname:'/friends_requests',
                                state: {
                                    user_id: user_id
                                }
                            })}>
                            You've new requests
                        </Button>
                    :
                        null
                    }
                    
                    <Button variant="outline-info" onClick={this.handleLogout}>
                        Logout
                    </Button>
                </Nav>
            </Navbar>
            <UserStats stats={this.state.user_id}/>                
            <Nav className="justify-content-center" activeKey="/dashboard">
                <Nav.Item>
                    <Button variant="outline-info" onClick={() => this.setState({ modalDepositShow: true })}>
                        Depositar
                    </Button>
                </Nav.Item>
                <Nav.Item>
                    <Button variant="outline-info" onClick={() => this.setState({ modalTransactionShow: true })}>
                        Efetuar Transferencia
                    </Button>
                </Nav.Item>
                <Nav.Item>
                    <Button variant="outline-info" onClick={() => this.setState({ modalMakeFriendsShow: true })}>
                        Fazer amigos
                    </Button>
                </Nav.Item>
            </Nav>
            <Container>
                <Row>
                    <Col>
                        <h1>Transactions</h1>
                    </Col>
                    <Col>
                        <h1>List of friends</h1>
                        <ListFriends account_id={this.state.user_id} login_id={this.state.login_id}/>
                    </Col>
                </Row>
                
            </Container>
            <TransactionModal
                user_id={this.state.user_id}
                login_id={this.state.login_id}
                show={this.state.modalTransactionShow}
                onHide={modalTransactionClose}
            />
            <DepositModal
                user_id={this.state.user_id}
                show={this.state.modalDepositShow}
                onHide={modalDepositClose}
            />
            <MakeFriendsModal
                login_id={this.state.login_id}
                user_id={this.state.user_id}
                show={this.state.modalMakeFriendsShow}
                onHide={modalMakeFriendsClose}
            />
            </Fragment>
        );
    }
}

export default Dashboard;