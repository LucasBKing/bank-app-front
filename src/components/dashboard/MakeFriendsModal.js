import React, { Component, Fragment } from 'react';
import { Nav, Button, Modal } from 'react-bootstrap';
import { getListOfPossibleFriends, addFriend, getStatsUserRequest, getAccountLoginById} from '../functions/userFunctions';

class MakeFriendsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.user_id,
            account_login_id: props.login_id,
            list_users: []
        }
    }

    componentDidMount() {
        let user = {
            user_id: this.state.user_id,
            account_login_id: this.state.account_login_id
        }
        getListOfPossibleFriends(user).then(res => {
            res.map(user => {
                this.setState({
                    list_users: [...this.state.list_users, user]
                })
            })
        })
    }

    handleAdd = (user_id) => {
        let accounts = {
            account_to: user_id,
            account_login_id: this.state.account_login_id
        }
        addFriend(accounts).then( res => {
            getStatsUserRequest(this.state.account_login_id).then(user => {
                getAccountLoginById(this.state.user_id).then(last_res => {
                    console.log(user, last_res);
                })
            })
        })
    }
    
    render() {
        const { to, staticContext, ...rest } = this.props;
        let { list_users } = this.state;
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
                            List of users
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Click on name to add.
                        <Nav className="flex-column">
                            {
                                list_users && list_users.map((user, key) => {
                                    return <Button key={key} onClick={() => this.handleAdd(user.Id)}>{user.first_name} {user.last_name}</Button>
                                })
                            }
                            
                        </Nav>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default MakeFriendsModal;