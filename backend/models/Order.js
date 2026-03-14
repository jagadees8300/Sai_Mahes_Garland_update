const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  customerName: String,
  phone: String,
  address: String,
  orderDate: Date,
  deliveryDate: String,
  status: { type: String, default: "Pending" }, // Pending, Accepted, Shipped, Delivered
  paymentMethod: { type: String, enum: ["COD", "UPI"], required: true },
  transactionId: { type: String, default: null }, // Required for UPI
  deliveryCharge: { type: Number, default: 0 },
  orderId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
