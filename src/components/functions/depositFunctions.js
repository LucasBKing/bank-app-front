import axios from 'axios';

export const insertDeposit = (user_id, value) => {
    return axios
        .post('http://localhost:4200/api/insert_deposit' , {
            user_id: user_id,
            value: value
        })
        .then( res => {
            return res.data;
        })
}
export const getCurrentDebitBalance = account_bank_id => {
    return axios
        .get('http://localhost:4200/api/get_current_debit_balance' , {
            params: {
                account_bank_id: account_bank_id
            }
        })
        .then( res => {
            return res.data;
        })
}

export const updateCurrentDebitBalance = (user_id, value) => {
    return axios
        .post('http://localhost:4200/api/update_debit_balance' , {
            user_id: user_id,
            value: value
        })
        .then( res => {
            return res.data;
        })
}