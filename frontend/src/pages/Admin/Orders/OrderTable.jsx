const OrderTable = ({ orders, handleClick }) => {
      return (
            <table className="order-table">
                  <thead>
                        <tr>
                              <th>order</th>
                              <th>customer</th>
                              <th>shipping info</th>
                              <th>payment status</th>
                              <th>date</th>
                        </tr>
                  </thead>
                  <tbody>
                        {orders.map((order, index) => (
                              <tr onClick={() => handleClick(order._id)} key={order._id}>
                                    <td>
                                          #PO-{index < 100 ? `00${index + 1}` : index + 1}-{order._id}
                                    </td>
                                    <td>{order.customer.name}</td>
                                    <td>
                                          <span className={order.orderStatus.toLowerCase()}>{order.orderStatus}</span>
                                    </td>
                                    <td>
                                          <span className={order.paymentStatus.toLowerCase()}>
                                                {order.paymentStatus}
                                          </span>
                                    </td>
                                    <td>{order.createdAt.split("T")[0]}</td>
                              </tr>
                        ))}
                  </tbody>
            </table>
      );
};

export default OrderTable;
