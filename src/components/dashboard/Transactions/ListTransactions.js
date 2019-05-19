import React, { Component, Fragment } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import { getTransactions } from '../../functions/transactionsFunctions';
import Datetime from 'react-datetime';

class ListTransactions extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            list_transactions: [],
            account_bank_id: props.account_bank_id
        }
    }

    componentDidMount() {
        getTransactions(this.state.account_bank_id).then(list_transactions => {
            list_transactions.map(transaction => {
                let created = new Date(transaction.Created)

                let newTransaction = {
                    value: transaction.value,
                    by_who: transaction.account_bank_id,
                    to_who: transaction.to_who,
                    year: created.getFullYear(),
                    month: created.getMonth() + 1,
                    day: created.getDay(),
                    hours: created.getHours(),
                    minutes: created.getMinutes(),
                    seconds: created.getSeconds(),
                    status: transaction.status ? 'ok' : 'cancelled'
                }

                this.setState({
                    list_transactions: [...this.state.list_transactions, newTransaction]
                })
            })
        })
    }

    render() {
        let { list_transactions } = this.state;
        return(
            <Fragment>
                
                { list_transactions
                ?
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Value</th>
                            <th>By</th>
                            <th>To</th>
                            <th>Created</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {
                        list_transactions.map((transaction, key) => {
                            return <tbody key={key}>
                                        <tr>
                                            <td>{key}</td>
                                            <td>{transaction.value}</td>
                                            <td>{transaction.by_who}</td>
                                            <td>{transaction.to_who}</td>
                                            <td>{transaction.day}/{transaction.month}/{transaction.year} {transaction.hours}:{transaction.minutes}:{transaction.seconds}</td>
                                            <td>{transaction.status}</td>
                                        </tr>
                                    </tbody>
                        })
                    }
                </Table>
                :
                null
                }
                
            </Fragment>
        );
    }

}

export default ListTransactions;