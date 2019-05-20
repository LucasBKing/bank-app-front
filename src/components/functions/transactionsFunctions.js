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

export const updateTransactionStatus = Id => {
    return axios
        .post('http://localhost:4200/api/udpate_transaction_status' ,{
            Id: Id
        })
        .then(res => {
            return res.data;
        })
}

export const insertTransaction = (to_who, account_bank_id, value) => {
    return axios
        .post('http://localhost:4200/api/insert_transaction' , {
            to_who: to_who,
            account_bank_id: account_bank_id,
            value: value
        })
        .then( res => {
            return res.data;
        })
}