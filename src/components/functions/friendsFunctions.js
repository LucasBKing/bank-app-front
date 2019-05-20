import axios from 'axios';

export const addFriend = accounts => {
    return axios
        .post('http://localhost:4200/api/add_friend', {
            account_to: accounts.account_to,
            account_login_id: accounts.account_login_id,
            action_id: accounts.action_id
        })
        .then(res => {
            return res.data;
        })
}

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

export const updateRequestFriend = account => {
    return axios
        .post('http://localhost:4200/api/update_request_friend' , {
            account_to: account.account_to,
            account_login_id: account.account_login_id,
            status: account.status,
            action_id: account.action_id
        })
        .then( res => {
            return res.data;
        })
}

export const getFriendsRequests = account => {
    return axios
        .get('http://localhost:4200/api/get_friends_requests', { 
            params: { 
                user_id: account.user_id,
                account_login_id: account.login_id
            } 
        })
        .then( res=> { 
            return res.data 
        });
}

export const getListOfPossibleFriends = account => {
    return axios
        .get('http://localhost:4200/api/list_of_possible_friends', { 
            params: { 
                user_id: account.user_id,
                account_login_id: account.account_login_id
            } 
        })
        .then( res=> { 
            return res.data 
        });
}