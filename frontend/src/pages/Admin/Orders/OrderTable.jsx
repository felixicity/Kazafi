import { orders } from "../../../utilities/orderData";

const OrderTable = ({ handleClick }) => {
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
                        {orders.map((order) => (
                              <tr onClick={() => handleClick(order.id)} key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customer}</td>
                                    <td>
                                          <span className={order.shipping}>{order.shipping}</span>
                                    </td>
                                    <td>
                                          <span className={order.payment}>{order.payment}</span>
                                    </td>
                                    <td>{order.date}</td>
                              </tr>
                        ))}
                  </tbody>
            </table>
      );
};

export default OrderTable;
