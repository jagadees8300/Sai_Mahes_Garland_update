const express = require("express");
const router = express.Router();
const { createOrder, getOrder, getAllOrders, updateOrderStatus, getOrdersByPhone } = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/all", getAllOrders); // For admin dashboard
router.get("/user/:phone", getOrdersByPhone); // For user tracking
router.get("/:id", getOrder); 
router.put("/:id/status", updateOrderStatus); // For admin to update status

module.exports = router;
