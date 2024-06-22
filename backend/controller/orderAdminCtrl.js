const OrderAdmin = require("../models/OrderAdminModel");
const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const {customerName, orderItems} = req.body;
  try {
    const totalPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const newOrder = await OrderAdmin.create({
      customerName,
      orderItems,
      totalPrice,
    });
    res.json({
      status: true,
      msg: "Create order successfully",
      order: newOrder,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await OrderAdmin.find();
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id);
  try {
    const updateOrder = await OrderAdmin.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateOrder);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
};
