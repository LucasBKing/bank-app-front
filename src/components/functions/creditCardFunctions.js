import axios from 'axios';

export const getAccountCreditCardByAccountBankId = account_bank_id => {
    return axios
        .get('http://localhost:4200/api/credit_card_by_account_bank_id', {
            params: {
                account_bank_id: account_bank_id
            }
        })
        .then( res => {
            return res.data;
        })
}

export const updateCurrentCreditCardBalance = (credit_card_id, value) => {
    return axios
        .post('http://localhost:4200/api/update_credit_card_balance' , {
            credit_card_id: credit_card_id,
            value: value
        })
        .then( res => {
            return res.data;
        })
}

export const createCreditCard = credit_card_values => {
    return axios
        .post('http://localhost:4200/api/create_credit_card', {
            code: credit_card_values.code,
            balance: credit_card_values.balance,
            credit_line: credit_card_values.credit_line,
            password_cd: credit_card_values.password_cd,
            due_date: credit_card_values.due_date,
            account_bank_id: credit_card_values.account_bank_id
        })
        .then(res => {
            return res.data;
        })
}
