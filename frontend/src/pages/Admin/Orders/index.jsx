import OrderTable from "./OrderTable";
import { useState } from "react";
import { orders } from "../../../utilities/orderData";
import OrderDetails from "./OrderDetails";

const OrderDashboard = () => {
      const [showOrderDetails, setShowOrderDetails] = useState(false);
      const [orderData, setOrderData] = useState(null);

      const handleClick = (orderId) => {
            setOrderData(orders.filter((order) => order.id == orderId));
            setShowOrderDetails(true);
      };
      return (
            <div>
                  <h2>All orders</h2>
                  <OrderTable handleClick={handleClick} />
                  {showOrderDetails && <OrderDetails orderData={orderData} setShowOrderDetails={setShowOrderDetails} />}
            </div>
      );
};

export default OrderDashboard;
