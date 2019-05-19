import axios from 'axios';

export const getTransactions = account_bank_id  => {
    return axios
    .get('http://localhost:4200/api/get_transactions', {
        params: {
            account_bank_id: account_bank_id
        }
    })
    .then( res => {
        return res.data;
    })
}