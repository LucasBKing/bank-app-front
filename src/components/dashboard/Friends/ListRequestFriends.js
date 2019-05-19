import React, { Component, Fragment } from 'react';
import { getFriendsRequests, getStatsUserRequest, updateRequestFriend, getAccountLoginById } from '../../functions/userFunctions';
import { Container, Row, Col, FormControl, Button, InputGroup, Table, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ListRequestFriends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: this.props.location.state.user_id,
            account_login_id: this.props.location.state.account_login_id,
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
                res.map(user => {
                    getStatsUserRequest(user.account_login_id).then(res => {
                        res.map(user => {
                            this.setState({
                                list_of_requests: [...this.state.list_of_requests, user]
                            })
                        })
                    })
                })               
            }
        })
    }

    handleAccept = (user_id, account_login_id, status) => {
        let account = {
            user_id: this.state.user_id,
            account_login_id: account_login_id,
            status: status
        }
        updateRequestFriend(account).then(res => {
            getAccountLoginById(this.state.user_id).then(account_login => {
               
                let account_bidirectional  = {
                    user_id: user_id,
                    account_login_id: account_login[0].Id,
                    status: status
                }
                
                updateRequestFriend(account_bidirectional).then(res => {
                    console.log(res);
                    window.location.reload();
                })
            })
            
        })
    }

    render() {
        let { list_of_requests } = this.state;
   
        return(
            <Fragment>
                <h1>RequestFriendList</h1>
                <Container>
                    <Row>
                        <Col>
                        
                        { list_of_requests
                            ?
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th>Email</th>
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
                                                            <Button variant="outline-primary" onClick={() => this.handleAccept(user.user_id, user.Id, 'Aceito')}>
                                                                Aceitar
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