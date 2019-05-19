import React, { Component, Fragment } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getUserById, getAccountLoginById, updateRequestFriend } from '../../functions/userFunctions';
import { getFriendsList } from '../../functions/login_accountFunctions';

class ListFriends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.account_id,
            account_login_id: props.login_id,
            list: []
        }
    }

    componentDidMount() {

        getFriendsList(this.state.account_login_id).then(res => {
            if(res) {
                res.map(users => {
                    if(users.status === 'Aceito') {
                        getUserById(users.account_to).then(user => {
                            user.map( atts => {
                                getAccountLoginById(atts.Id).then(account_login => {
                                    
                                    let newUser = {
                                        Id: atts.Id,
                                        account_login_id: account_login[0].Id,
                                        first_name: atts.first_name,
                                        last_name: atts.last_name,
                                        email: atts.email                               
                                    }
                                    
                                    this.setState({
                                        list: [...this.state.list, newUser ]
                                    })
                                })
                                
                            })
                        })
                    }
                })
            }
        });
    }

    handleDeleteFriend = (user, status) => {
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
                console.log(res, res2)
            })
        })
    } 

    render() {
        let { list } = this.state;
        return(
            <Fragment>
                { list
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
                    list.map((user, key) => {
                        return <tbody key={key}>
                                        <tr>
                                            <td>{key}</td>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Button variant="outline-primary" onClick={() => this.handleDeleteFriend(user, 'Excluido')}>
                                                    Delete
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
            </Fragment>
        );
    }
}

export default ListFriends;