import axios from 'axios';

export const registerAccountLogin = account => {
    return axios
        .post('http://localhost:4200/api/account_login', {
            login_name: account.login_name,
            password_login: account.password_login,
            user_id: account.user_id            
        })
        .then( res => {
            return res.data;
        });
}

export const loginAccount = account => {
    return axios
        .get('http://localhost:4200/api/login', {
            params: {
                login_name: account.login_name,
                password: account.password_login
            }
        })
        .then( res => {
            localStorage.setItem('usertoken', res.data);
            return res.data;
        });
}

export const getAccountLoginById = user_id => {
    return axios
        .get('http://localhost:4200/api/account_login_by_id', {
            params: {
                user_id: user_id
            }
        })
        .then( res => {
            return res.data;
        })
}

