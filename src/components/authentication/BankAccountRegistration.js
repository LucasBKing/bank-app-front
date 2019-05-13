import React, {Component, Fragment} from 'react';
import { registerAccountBank } from '../functions/userFunctions';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

class BankAccountRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: this.props.location.state.user_id,
            user_name: this.props.location.state.user_name,
            account_type: '',
            balance: 0.0,

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
            console.log(res);
        })
    }

    render() {
        return(
            <Fragment>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <FormControl>
                    <InputLabel htmlFor="account_type">Account type</InputLabel>
                    <Select
                        value={this.state.account_type}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'account_type',
                            id: 'account_type'
                        }}
                    >
                        <MenuItem value={"Bronze"}>Bronze</MenuItem>
                        <MenuItem value={"Silver"}>Silver</MenuItem>
                        <MenuItem value={"Gold"}>Gold</MenuItem>
                        <MenuItem value={"Platinum"}>Platinum</MenuItem>
                    </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" size="medium" color="primary">
                        Send 
                    </Button>
                </form>
            </Fragment>          
        );
    }
}

export default BankAccountRegistration;