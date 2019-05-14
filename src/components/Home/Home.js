import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Login from '../authentication/Login';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            modalShow: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false });

        return(
            <Fragment>
                <ButtonToolbar>
                    <Button
                        variant="primary"
                        onClick={() => this.setState({ modalShow: true })}
                        >
                        Login
                    </Button>

                    <Login
                        show={this.state.modalShow}
                        onHide={modalClose}
                    />
                </ButtonToolbar>
            </Fragment>
        );
    }
    
}

export default Home;