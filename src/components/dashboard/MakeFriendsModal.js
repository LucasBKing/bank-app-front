import React, { Component, Fragment } from 'react';
import { Nav, Button, Modal } from 'react-bootstrap';
import { getListOfPossibleFriends } from '../functions/userFunctions';

class MakeFriendsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.user_id,
            list_users: []
        }
    }

    componentDidMount() {
        getListOfPossibleFriends(this.state.user_id).then(res => {
            this.setState({
                list_users: res
            })
            console.log(res);
        })
    }

    handleAdd = (user_id) => {
        console.log(user_id);
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