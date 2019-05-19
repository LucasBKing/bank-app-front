import React, { Component, Fragment } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import { getUserById } from '../../functions/userFunctions';
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
                                
                                let newUser = {
                                    first_name: atts.first_name,
                                    last_name: atts.last_name,
                                    email: atts.email                               
                                }
                                
                                this.setState({
                                    list: [...this.state.list, newUser ]
                                })
                            })
                        })
                    }
                })
            }
        });
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