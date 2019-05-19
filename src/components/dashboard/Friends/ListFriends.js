import React, { Component, Fragment } from 'react';
import { ListGroup } from 'react-bootstrap';
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
                <ListGroup variant="flush">
                {
                    list.map((user, key) => {
                        return <ListGroup.Item key={key}>Name: {user.first_name} {user.last_name} Email: {user.email}</ListGroup.Item>
                    })
                }
                </ListGroup>
                :
                <ListGroup variant="flush">
                    <ListGroup.Item>You dont have friends yet!</ListGroup.Item>
                </ListGroup>
                }
            </Fragment>
        );
    }
}

export default ListFriends;