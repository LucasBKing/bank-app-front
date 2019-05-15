import React, { Component, Fragment } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import UserStats from './UserStats';
import DepositModal from './DepositModal';
import MakeFriendsModal from './MakeFriendsModal';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            user_id: null,
            modalDepositShow: false,
            modalMakeFriendsShow: false
        }
    }

    componentDidMount() {
        let token = localStorage.usertoken;

        if(token) {
            try {
                let decoded = jwt_decode(token)
                this.setState({
                    name: decoded.dataValues.login,
                    user_id: decoded.dataValues.user_id
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
                    <Button variant="outline-info" onClick={this.handleDoTransaction}>
                        Efetuar Transferencia
                    </Button>
                </Nav.Item>
                <Nav.Item>
                    <Button variant="outline-info" onClick={() => this.setState({ modalMakeFriendsShow: true })}>
                        Fazer amigos
                    </Button>
                </Nav.Item>
            </Nav>
            <DepositModal
                user_id={this.state.user_id}
                show={this.state.modalDepositShow}
                onHide={modalDepositClose}
            />
            <MakeFriendsModal
                user_id={this.state.user_id}
                show={this.state.modalMakeFriendsShow}
                onHide={modalMakeFriendsClose}
            />
            </Fragment>
        );
    }
}

export default Dashboard;