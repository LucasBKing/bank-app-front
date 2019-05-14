import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        let token = localStorage.usertoken;
        if(token) {
            let decoded = jwt_decode(token)
            this.setState({
                name: decoded.dataValues.login
            })
        } else {
            this.props.history.push('/');
        }
        
    }

    handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }

    render() {
        return (
            <Fragment>
                <h1>Dashboard</h1>
                <p>Hello Sr. { this.state.name }</p>
                <Button onClick={this.handleLogout}>
                    Logout
                </Button>
            </Fragment>
        );
    }
}

export default Dashboard;