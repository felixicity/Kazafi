import OrderTable from "./OrderTable";
import { useState } from "react";
import OrderDetails from "./OrderDetails";
import { useGetOrdersQuery } from "../../../slices/orderApiSlice";

const OrderDashboard = () => {
      // Get orders in my database
      const { data, isLoading, error } = useGetOrdersQuery();

      const [showOrderDetails, setShowOrderDetails] = useState(false);
      const [orderData, setOrderData] = useState(null);
      //   console.log(data);

      if (isLoading) return <p>Loading products...</p>;
      if (error) return <p>Something went wrong!</p>;

      const handleClick = async (orderId) => {
            setOrderData(data.filter((order) => order._id === orderId)[0]);
            setShowOrderDetails(true);
      };

      return (
            <div>
                  <h2>All orders</h2>
                  <OrderTable orders={data} handleClick={handleClick} />
                  {showOrderDetails && <OrderDetails orders={orderData} setShowOrderDetails={setShowOrderDetails} />}
            </div>
      );
};

export default OrderDashboard;
