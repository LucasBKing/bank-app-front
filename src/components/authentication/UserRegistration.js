import React, { Component, Fragment } from 'react';
import { TextField, Button } from '@material-ui/core';
import { registerUser } from '../functions/userFunctions';
import { withRouter, Redirect } from 'react-router-dom';

class UserRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // street: '',
            // num: '',
            // neighborhood: '',
            // city: '',
            // uf: '',
            // zipcode: '',
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            birthday: '',
            adress_id: 1,
            CPF: '',
            user_id: '',
            navigate: false        
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        
        // let adress = {
        //     street: this.state.street,
        //     num: this.state.num,
        //     neighborhood: this.state.neighborhood,
        //     city: this.state.city,
        //     uf: this.state.uf,
        //     zipcode: this.state.zipcode
        // }

        let user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            birthday: this.state.birthday,
            adress_id: 1,
            CPF: this.state.CPF
        }


        // registerAdress(adress).then(res => {
        //     this.setState({
        //         adress_id: res.insertId
        //     });
        // });

        registerUser(user).then(res => {
            this.setState({
                navigate: true,
                user_id: res.insertId
            });

        });
   
    }

    render() {
        let { navigate } = this.state;
        if (navigate === true) return <Redirect to={{
            pathname: '/login_registration',
            state: { user_id: this.state.user_id, user_name: this.state.first_name}
        }}/>;

        return (
            <Fragment>
                <h1>User Registration</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* User */}
                    <TextField
                        id="first_name"
                        label="First name"
                        value={this.state.first_name}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="last_name"
                        label="Last name"
                        value={this.state.last_name}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="email"
                        label="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="phone"
                        label="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="birthday"
                        label="birthday"
                        value={this.state.birthday}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="CPF"
                        label="CPF"
                        value={this.state.CPF}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    {/* Adress */}
                    {/* <TextField
                        id="street"
                        label="Street"
                        value={this.state.street}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="num"
                        label="Number"
                        value={this.state.num}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="neighborhood"
                        label="Neighborhood"
                        value={this.state.neighborhood}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="city"
                        label="City"
                        value={this.state.city}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="uf"
                        label="UF"
                        value={this.state.uf}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="zipcode"
                        label="Zipcode"
                        value={this.state.zipcode}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    /> */}
                    <Button type="submit" variant="contained" size="medium" color="primary">
                        Send 
                    </Button>
                </form>
            </Fragment>        
        );
    }
};

export default withRouter(UserRegistration);

