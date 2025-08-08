import { transactions } from "../../../utilities/transactionData";

const TransactionTable = () => {
      return (
            <table className="transaction-table">
                  <thead>
                        <tr>
                              <th>Payment Id</th>
                              <th>Customer Id</th>
                              <th>Payment method</th>
                              <th>Payment status</th>
                              <th>Amount</th>
                              <th>Date</th>
                        </tr>
                  </thead>
                  <tbody>
                        {transactions.map((transaction) => (
                              <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.customer}</td>
                                    <td>{transaction.method}</td>
                                    <td>
                                          <span className={transaction.status}>{transaction.status}</span>
                                    </td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.date}</td>
                              </tr>
                        ))}
                  </tbody>
            </table>
      );
};

export default TransactionTable;
