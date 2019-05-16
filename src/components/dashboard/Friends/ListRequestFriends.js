import React, { Component, Fragment } from 'react';
import { getFriendsRequests, getStatsUserRequest, updateRequestFriend } from '../../functions/userFunctions';
import { Container, Row, Col, FormControl, Button, InputGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ListRequestFriends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: this.props.location.state.user_id,
            account_login_id: '',
            list_of_requests: []
        }
    }

    componentDidMount() {
        getFriendsRequests(this.state.user_id).then(res => {
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

    handleAccept = (user_id, id, status) => {
        updateRequestFriend(user_id, id, status).then(res => {
            window.location.reload();
        })
    }

    render() {
        let { list_of_requests } = this.state;
        if( Array.isArray(list_of_requests) && !list_of_requests.length) {
            this.props.history.push('/dashboard')
        }
        return(
            <Fragment>
                <h1>RequestFriendList</h1>
                <Container>
                    <Row>
                        <Col>
                        {list_of_requests
                        ?
                        list_of_requests.map((user, key) => {
                             return <InputGroup key={key} className="mb-3">
                                
                                <FormControl
                                    
                                    disabled
                                    placeholder={'First name: ' + user.first_name + ' Last name: ' + user.last_name + ' Email: ' + user.email}
                                    aria-label={user.first_name}
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary" onClick={() => this.handleAccept(this.state.user_id, user.Id, 'Aceito')}>Aceitar</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        })
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