const express = require("express");
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderAdminCtrl");
const router = express.Router();

router.post("/create-order", authMiddleware, isAdmin, createOrder);
router.post("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
router.put("/:id", authMiddleware, isAdmin, updateOrder);
router.delete("/:id", authMiddleware, isAdmin, deleteOrder);

module.exports = router;
