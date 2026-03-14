const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.send({ success: true, order });
};

exports.getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.send(order);
};
