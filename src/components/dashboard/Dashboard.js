import React, { Component, Fragment } from 'react';
import { Button, Nav, Navbar, Container, Col, Row, Tabs, Tab } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import UserStats from './UserStats';
import DepositModal from './DepositModal';
import MakeFriendsModal from './MakeFriendsModal';
import ListFriends from './Friends/ListFriends';
import TransactionModal from './Transactions/TransactionModal';
import ListTransactions from './Transactions/ListTransactions';
import { getAccountBankById } from '../functions/accountBankFunctions';
import { getFriendsRequests } from '../functions/friendsFunctions';
import '../../assets/css/Dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            user_id: null,
            login_id: null,
            account_bank_id: null,
            friendRequest: false, 
            modalDepositShow: false,
            modalMakeFriendsShow: false,
            modalTransaction: false,
            activeTab: props.activetab || 1
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        let token = localStorage.usertoken;

        if(token) {
            try {
                let decoded = jwt_decode(token)
                
                // Getting account bank id use future in components
                getAccountBankById(decoded.dataValues.user_id).then(account_bank => {
                    this.setState({
                        name: decoded.dataValues.login,
                        user_id: decoded.dataValues.user_id,
                        login_id: decoded.dataValues.login_id,
                        account_bank_id: account_bank.account_bank_id
                    })
                })
                getFriendsRequests(decoded.dataValues).then(res => {
                    if(res.length > 0) {
                        this.setState({
                            friendRequest: true
                        })
                        
                    }
                })
                
            } catch(error) {
                console.log(error);
            }
            
        } else {
            this.props.history.push('/');
        }
        
    }

    handleSelect = (selectedTab) => {
        this.setState({
            activeTab: selectedTab
          });
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

        let { user_id, login_id } = this.state;
        if(user_id === null && login_id === null) {
            return null;
        }
        return (
            <Fragment>
            <Navbar variant="dark" style={{ marginBottom: '20px' }} className="custom-navbar">
                <Nav>
                    <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '30px'}} href="/">Ekki</Navbar.Brand>
                </Nav>
                <Nav className="ml-auto">
                    {this.state.friendRequest 
                    ?
                        <Button className="custom-button-navbar-newFriend" onClick={() => this.props.history.push({
                                pathname:'/friends_requests',
                                state: {
                                    user_id: user_id,
                                    login_id:  login_id
                                }
                            })}>
                            You've new requests
                        </Button>
                    :
                        null
                    }
                    
                    <Button className="custom-button-navbar" onClick={this.handleLogout}>
                        Logout
                    </Button>
                </Nav>
            </Navbar>
            <UserStats stats={this.state.user_id}/> 
            <Container>
                <Row>
                    <Col xs={8} md={9} sm>
                        <Tabs onSelect={this.handleSelect} className="custom-tabs-dashboard" defaultActiveKey="1" activeKey={this.state.activeTab}>
                            <Tab eventKey="1" title="Transactions List">
                                <ListTransactions account_bank_id={this.state.account_bank_id}/>
                            </Tab>
                            <Tab eventKey="2" title="Friends List">
                                <ListFriends account_id={this.state.user_id} login_id={this.state.login_id}/>
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col className="text-center" xs={4} md={3} sm>
                        <Nav className="justify-content-center flex-column" activeKey="/dashboard" style={{ marginTop: '20px', marginBottom: '20px', padding: '10px'}}>
                            <Nav.Item>
                                <Button block className="custom-btn-actions" onClick={() => this.setState({ modalDepositShow: true })}>
                                    Deposit
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button block className="custom-btn-actions" onClick={() => this.setState({ modalTransactionShow: true })}>
                                    Do a transaction
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button block className="custom-btn-actions" onClick={() => this.setState({ modalMakeFriendsShow: true })}>
                                    Make friends
                                </Button>
                            </Nav.Item>
                        </Nav>
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