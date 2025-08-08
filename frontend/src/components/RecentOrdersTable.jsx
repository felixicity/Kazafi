const RecentOrdersTable = () => (
      <div className="orders-card">
            <h2 className="card-title">Recent Orders</h2>
            <table className="orders-table">
                  <thead>
                        <tr>
                              <th>Order ID</th>
                              <th>Customer</th>
                              <th>Status</th>
                              <th>Total</th>
                        </tr>
                  </thead>
                  <tbody>
                        <tr>
                              <td>#KAZ-1201</td>
                              <td>John Doe</td>
                              <td className="status">
                                    <span className="delivered">delivered</span>
                              </td>
                              <td>₦12,000</td>
                        </tr>
                  </tbody>
            </table>
      </div>
);

export default RecentOrdersTable;
