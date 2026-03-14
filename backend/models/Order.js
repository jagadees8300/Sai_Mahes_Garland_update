const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  customerName: String,
  phone: String,
  address: String,
  orderDate: Date,
  deliveryDate: String,
  status: Number,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
