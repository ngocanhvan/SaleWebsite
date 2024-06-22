const express = require("express");
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const {
  createOrder,
  getAllOrders,
  updateOrder,
} = require("../controller/orderAdminCtrl");
const router = express.Router();

router.post("/create-order", authMiddleware, isAdmin, createOrder);
router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
router.put("/:id", authMiddleware, isAdmin, updateOrder);

module.exports = router;
