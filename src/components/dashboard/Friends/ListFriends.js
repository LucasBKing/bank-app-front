import React, { Component, Fragment } from 'react';
import { ListGroup } from 'react-bootstrap';
import { getFriendsList, getUserById } from '../../functions/userFunctions';

class ListFriends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.account_id,
            account_login_id: props.account_login_id,
            list: []
        }
    }

    componentDidMount() {
        let account = {
            user_id: this.state.user_id,
            
        }
        getFriendsList(this.state.user_id).then(res => {
            if(res) {
                // res.map(users => {
                //     getUserById(users.account_to).then(user => {
                //         user.map( atts => {
                //             let newUser = {
                //                 first_name: atts.first_name,
                //                 last_name: atts.last_name,
                //                 status: users.status
                //             }
                            
                //             this.setState({
                //                 list: [...this.state.list, newUser ]
                //             })
                //         })
                //     })
                // })
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
                        return <ListGroup.Item key={key}>Name: {user.first_name} {user.last_name} Status: {user.status}</ListGroup.Item>
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