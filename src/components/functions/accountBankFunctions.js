import axios from 'axios';

export const registerAccountBank = account => {
    return axios
        .post('http://localhost:4200/api/account_bank', {
            account_type: account.account_type,
            balance: account.balance,
            user_id: account.user_id            
        })
        .then( res => {
            return res.data;
        });
}

export const getAccountBankById = user_id => {
    return axios
        .get('http://localhost:4200/api/account_bank_by_id', {
            params: {
                user_id: user_id
            }
        })
        .then( res => {
            return res.data;
        })
}

export const getUserByAccountBankId = account_bank_id => {
    return axios
    .get('http://localhost:4200/api/user_by_account_bank_id', {
        params: {
            account_bank_id: account_bank_id
        }
    })
    .then( res => {
        return res.data;
    })
}

