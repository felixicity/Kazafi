import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const placeOrder = async (req, res) => {
      try {
            const userId = req.userId;
            const { shippingAddress, paymentMethod } = req.body;

            // Get user's cart
            const cart = await Cart.findOne({ user: userId }).populate("items.product");

            if (!cart || cart.items.length === 0) {
                  return res.status(400).json({ message: "Your cart is empty" });
            }

            // Calculate total price
            const totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

            // Create new order
            const order = new Order({
                  user: userId,
                  items: cart.items.map((item) => ({
                        product: item.product._id,
                        quantity: item.quantity,
                        price: item.product.price,
                  })),
                  shippingAddress,
                  paymentMethod,
                  totalAmount: totalPrice,
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
            const order = await Order.findById(req.params.id).populate("user", "name email");

            if (!order) {
                  return res.status(404).json({ message: "Order not found" });
            }

            res.status(200).json(order);
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
            const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
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
