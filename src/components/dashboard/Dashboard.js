import React, { Component, Fragment } from 'react';


class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }
    }

    render() {
        return (
            <Fragment>
                <h1>Dashboard</h1>
            </Fragment>
        );
    }
}

export default Dashboard;