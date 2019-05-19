import axios from 'axios';

export const addFriend = accounts => {
    return axios
        .post('http://localhost:4200/api/add_friend', {
            account_to: accounts.account_to,
            account_login_id: accounts.account_login_id
        })
        .then(res => {
            return res.data;
        })
}