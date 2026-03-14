const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    // Add logic to validate payment method if necessary
    const { paymentMethod, transactionId } = req.body;
    let deliveryCharge = req.body.deliveryCharge || 0;

    if (paymentMethod === "COD") {
       deliveryCharge = 50; 
    }

    const order = new Order({
        ...req.body,
        deliveryCharge
    });
    
    await order.save();
    res.send({ success: true, order });
  } catch (err) {
      console.error("Create order error", err);
      res.status(500).send({ success: false, message: "Failed to place order." });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
      res.status(500).send({ success: false, message: "Error fetching order" });
  }
};

// Admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.send(orders);
    } catch (err) {
        res.status(500).send({ success: false, message: "Error fetching orders" });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.send({ success: true, order });
    } catch (err) {
        res.status(500).send({ success: false, message: "Error updating order" });
    }
};

// User Tracking
exports.getOrdersByPhone = async (req, res) => {
    try {
        const { phone } = req.params;
        const orders = await Order.find({ phone }).sort({ createdAt: -1 });
        res.send(orders);
    } catch (err) {
        res.status(500).send({ success: false, message: "Error fetching orders" });
    }
};
