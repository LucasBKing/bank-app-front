import React, {Component, Fragment} from 'react';
import { registerAccountBank } from '../functions/userFunctions';
import { Form, Button } from 'react-bootstrap';
import { Redirect, withRouter } from 'react-router-dom';

class BankAccountRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: this.props.location.state.user_id,
            user_name: this.props.location.state.user_name,
            account_type: '',
            balance: 0.0,
            navigate: false

        }
    }

    handleChange = (event) => {
        this.setState({
            account_type: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let bank_account = {
            account_type: this.state.account_type,
            balance: this.state.balance,
            user_id: this.state.user_id
        }

        registerAccountBank(bank_account).then(res => {
            this.setState({
                navigate: true
            });
        })
    }

    render() {
        let { navigate } = this.state;
        if (navigate === true) return <Redirect to={{
            pathname: '/dashboard',
        }}/>;
        return(
            <Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="account_type">
                        <Form.Label>Example select</Form.Label>
                        <Form.Control as="select" onChange={this.handleChange}>
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="Platinum">Platinum</option>
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="contained" size="medium" color="primary">
                        Send 
                    </Button>
                </Form>
            </Fragment>          
        );
    }
}

export default withRouter(BankAccountRegistration);