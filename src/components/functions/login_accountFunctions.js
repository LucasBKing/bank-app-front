import axios from 'axios';

export const getFriendsList = account_login_id => {
    return axios
        .get('http://localhost:4200/api/friends_list', { 
            params: { 
                account_login_id: account_login_id
            } 
        })
        .then( res=> { 
            return res.data 
        });
}