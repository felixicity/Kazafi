import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import { generateReceiptPDF } from "../utils/printReceipt.js";
import { sendOrderStatus } from "../utils/sendMail.js";

export const placeOrder = async (req, res) => {
      const userId = req.userId;
      const { address, shippingMethod } = req.body;

      try {
            // Get user's cart
            const cart = await Cart.findOne({ user: userId });

            if (!cart) {
                  return res.status(400).json({ message: "You don't have an account yet" });
            }

            if (cart.items.length < 1) {
                  return res.status(400).json({ message: "Your cart is empty" });
            }

            const shippingFee = shippingMethod === "delivery" ? 1020 : 0;

            // Create new order
            const order = new Order({
                  customer: userId,
                  items: cart.items.map((item) => ({
                        productId: item.product,
                        product: item.variation,
                        quantity: item.quantity,
                        isReviewed: false,
                  })),
                  totalAmount: cart.totalAmount + shippingFee,
                  totalQuantity: cart.totalQuantity,
                  shippingAddress: address,
                  shippingMethod: shippingMethod,
                  shippingFee: shippingFee,
            });

            await order.save();

            res.status(201).json({ message: "Order placed successfully", order });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error while placing order" });
      }
};

export const getUserOrders = async (req, res) => {
      try {
            const orders = await Order.find({ customer: req.userId }).sort({ createdAt: -1 }); //sort in ascending order which means from latest Orders.
            // console.log("orders:", orders);
            res.status(200).json(orders);
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error fetching orders" });
      }
};

export const getOrderById = async (req, res) => {
      console.log(req.params.orderId);

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

// export const getRecentOrders = async (req, res) => {
//       try {
//             // get the most recent 5 orders for the logged-in user
//             //sort it by at most a month ago
//             const orders = await Order.find({ customer: req.userId }).sort({ createdAt: -1 }).limit(5);
//             // console.log(orders);
//             res.status(200).json(orders);
//       } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: "Server error fetching recent orders" });
//       }
// };

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
      console.log("Admin want to get all Orders");
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
            const { status } = req.body;
            const order = await Order.findById(req.params.orderId);

            if (!order) {
                  return res.status(404).json({ message: "Order not found" });
            }

            if (status === "delivered") {
                  order.isDelivered = true;
                  order.deliveredAt = Date.now();
            }

            order.status = status;

            await order.save();
            sendOrderStatus(order);
            res.status(200).json({ message: "Order status updated", order });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error updating order status" });
      }
};

export const printOrderReceipt = async (req, res) => {
      console.log("Getting ready to print receipt...");
      try {
            const order = await Order.findById(req.params.orderId).populate({
                  path: "items.productId",
                  model: "Product",
                  select: "name",
            });

            if (!order) return res.status(404).send("Order not found");

            const pdfBuffer = await generateReceiptPDF(order);

            console.log("receipt printed !!");

            res.set({
                  "Content-Type": "application/pdf",
                  "Content-Disposition": `attachment; filename=kazafi-receipt-${order._id}.pdf`,
            });
            return res.status(200).send(Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer));
      } catch (error) {
            res.status(500).send("Error generating PDF");
      }
};
