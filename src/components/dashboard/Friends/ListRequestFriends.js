import React, { Component, Fragment } from 'react';
import { getStatsUserRequest } from '../../functions/userFunctions';
import { getFriendsRequests, updateRequestFriend } from '../../functions/friendsFunctions';
import { Container, Row, Col, Button, Table, Navbar, Nav} from 'react-bootstrap';
import '../../../assets/css/FriendRequest.css'

class ListRequestFriends extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            user_id: this.props.location.state.user_id,
            account_login_id: this.props.location.state.login_id,
            list_of_requests: []
        }
    }

    componentDidMount() {
        let account = {
            user_id: this.state.user_id,
            account_login_id: this.state.account_login_id
        }
        getFriendsRequests(account).then(res => {
            if(res.length > 0) {
                res.map(users_login => {

                    getStatsUserRequest(users_login.account_login_id).then(res => {
                        res.map(user => {
                            
                            let newUser = {
                                Id: user.user_id,
                                account_login_id: user.Id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email                               
                            }
                            this.setState({
                                list_of_requests: [...this.state.list_of_requests, newUser]
                            })
                        })
                    })
                })               
            }
        })
    }

    handleAccept = (user, status) => {
        let first_row = {
            account_login_id: this.state.account_login_id,
            account_to: user.Id,
            status: status,
            action_id: this.state.account_login_id
        }
        
        let second_row = {
            account_login_id: user.account_login_id,
            account_to: this.state.user_id,
            status: status,
            action_id: this.state.account_login_id
        }
        
        updateRequestFriend(first_row).then( res => {
            updateRequestFriend(second_row).then( res2 => {
                window.location.reload();
            })
        })
    }

    handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }


    render() {
        let { list_of_requests } = this.state;
   
        return(
            <Fragment>
                <Navbar variant="dark" style={{ marginBottom: '20px' }} className="custom-navbar">
                    <Nav>
                        <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '30px'}} href="/dashboard">Ekki</Navbar.Brand>
                    </Nav>
                    <Nav className="ml-auto">
                        <Button className="custom-button-navbar" onClick={this.handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar>
                <h1>Who wants to be your friend?</h1>
                <Container>
                    <Row>
                        <Col>
                        
                        { list_of_requests
                            ?
                            <Table className="custom-table" responsive>
                                <thead>
                                    <tr >
                                        <th>#</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th>Email</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                            {
                                list_of_requests.map((user, key) => {
                                    return <tbody key={key}>
                                                    <tr>
                                                        <td>{key}</td>
                                                        <td>{user.first_name}</td>
                                                        <td>{user.last_name}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            <Button variant="outline-primary" onClick={() => this.handleAccept(user, 'Aceito')}>
                                                                Accept
                                                            </Button>
                                                            <Button variant="outline-primary" onClick={() => this.handleAccept(user, 'Recusado')}>
                                                                Refuse
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                })
                            }
                            </Table>
                            :
                            null
                        }
                        </Col>
                    </Row>
                        
                </Container>
            </Fragment>
        );
    }
}

export default ListRequestFriends;