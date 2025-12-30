import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const placeOrder = async (req, res) => {
      const { address } = req.body;
      console.log("address:", address);
      const userId = req.userId;

      try {
            // Get user's cart
            const cart = await Cart.findOne({ user: userId });

            if (!cart) {
                  return res.status(400).json({ message: "You don't have an account yet" });
            }

            if (cart.items.length < 1) {
                  return res.status(400).json({ message: "Your cart is empty" });
            }

            // Create new order
            const order = new Order({
                  customer: userId,
                  items: cart.items.map((item) => ({
                        productId: item.product,
                        product: item.variation,
                        quantity: item.quantity,
                  })),
                  totalAmount: cart.totalAmount,
                  totalQuantity: cart.totalQuantity,
                  collectionPoint: address,
            });

            await order.save();

            // Clear user's cart after placing order
            await Cart.findOneAndDelete({ user: userId });

            res.status(201).json({ message: "Order placed successfully", order });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error while placing order" });
      }
};

export const getUserOrders = async (req, res) => {
      try {
            const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 }); //sort in ascending order which means from latest Orders.
            res.status(200).json(orders);
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error fetching orders" });
      }
};

export const getOrderById = async (req, res) => {
      try {
            const order = await Order.findById(req.params.orderId).populate("customer", "name email");

            if (!order) {
                  return res.status(404).json({ message: "Order not found" });
            }

            res.status(200).json(order);
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error fetching order details" });
      }
};

export const cancelOrder = async (req, res) => {
      try {
            const orderId = req.params.orderId;

            if (!orderId) {
                  return res.status(404).json({ message: "Order not found" });
            }

            await Order.findOneAndDelete({ id: orderId });
            res.status(200).json({ message: "order cancelled succefully" });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error fetching order details" });
      }
};

/* 
    Only Admins have access 
    to the folowing Routes
*/
export const getAllOrders = async (req, res) => {
      try {
            const orders = await Order.find()
                  .populate({ path: "customer", model: "User", select: "name email" })
                  .populate({
                        path: "items.productId",
                        model: "Product",
                        select: "name category",
                  })
                  .sort({ createdAt: -1 });
            // console.log("All Orders: ", orders);
            res.status(200).json(orders);
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error fetching all orders" });
      }
};

export const updateOrderStatus = async (req, res) => {
      try {
            const order = await Order.findById(req.params.id);

            if (!order) {
                  return res.status(404).json({ message: "Order not found" });
            }

            order.isDelivered = req.body.isDelivered;
            order.deliveredAt = req.body.isDelivered ? Date.now() : null;

            await order.save();
            res.status(200).json({ message: "Order status updated", order });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error updating order status" });
      }
};
