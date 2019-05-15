import axios from 'axios';

export const registerAdress = adress => {
    return axios
        .post('http://localhost:4200/api/adress', {
            street: adress.street,
            num: adress.num,
            neighborhood: adress.neighborhood,
            city: adress.city,
            uf: adress.uf,
            zipcode: adress.zipcode
        })
        .then( res => {
            return res.data;
        });
}

export const registerUser = user => {
    return axios
        .post('http://localhost:4200/api/user', {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            birthday: user.birthday,
            adress_id: user.adress_id,
            CPF: user.CPF
        })
        .then( res => {
            return res.data;
        });
}

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

export const getAccountBankById = user_id => {
    return axios
        .get('http://localhost:4200/api/account_bank_by_id', {
            params: {
                user_id: user_id
            }
        })
        .then( res => {
            return res.data;;
        })
}

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

export const updateCurrentDebitBalance = (user_id, value) => {
    return axios
        .post('http://localhost:4200/api/update_debit_balance' , {
            user_id: user_id,
            value: value
        })
        .then( res=> {
            return res.data;
        })
}
