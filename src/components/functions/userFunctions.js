import axios from 'axios';

export const registerUser = user => {
    return axios
        .post('http://localhost:4200/api/user', {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            CPF: user.CPF
        })
        .then( res => {
            return res.data;
        });
}

export const getUserIdByAccountLogin = account_login_id => {
    return axios
        .get('http://localhost:4200/api/user_id_by_account_login_id', {
            params: {
                account_login_id: account_login_id
            }
        })
        .then( res => {
            return res.data;
        })
}


export const getListOfUsers = user_id => {
    return axios
        .get('http://localhost:4200/api/list_users', {
            params: {
                user_id: user_id
            }
        })
        .then(res => { 
            return res.data 
        });
}

export const getUserById = user_id => {
    return axios
        .get('http://localhost:4200/api/get_user', { 
            params: { 
                user_id: user_id
            } 
        })
        .then( res=> { 
            return res.data 
        });
}

export const getStatsUserRequest = account_login_id => {
    return axios
        .get('http://localhost:4200/api/get_stats_users_request', { 
            params: {
                account_login_id: account_login_id
            } 
        })
        .then( res=> { 
            return res.data 
        });  
}