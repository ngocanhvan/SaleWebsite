const OrderAdmin = require("../models/OrderAdminModel");
const Product = require("../models/productModel");
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
    const promises = orderItems.map(async (item) => {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {quantity: -item.quantity, sold: item.quantity},
        },
        {
          new: true,
        }
      );
    });
    await Promise.all(promises);
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
  const {currentPage, keySearch, itemsPerPage} = req.body;
  try {
    let options = {};
    if (keySearch) {
      options = {
        customerName: new RegExp(keySearch, "i"),
      };
    }
    const orders = await OrderAdmin.find(options).sort({createdAt: -1});

    const page = currentPage || 1;
    const limit = itemsPerPage || 10;
    const skip = (page - 1) * limit;

    const totalOrders = await OrderAdmin.countDocuments(options);
    const data = orders.slice(
      skip,
      parseInt(skip.toString()) + parseInt(limit.toString())
    );
    res.json({
      status: true,
      orders: data,
      totalOrders,
      page,
      limit,
    });
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

const deleteOrder = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id);
  try {
    const deleteOrder = await OrderAdmin.findByIdAndDelete(id);
    res.json({
      status: true,
      msg: "Delete order successfully",
      deleteOrder,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
// const OrderAdmin = require("../models/OrderAdminModel");
// const Product = require("../models/productModel");
// const validateMongoDbId = require("../utils/validateMongoDbId");
// const asyncHandler = require("express-async-handler");

// const createOrder = asyncHandler(async (req, res) => {
//   const { customerName, orderItems } = req.body;
//   try {
//     let insufficientQuantityProducts = [];

//     // Validate each item to ensure there is enough quantity available
//     for (const item of orderItems) {
//       const product = await Product.findById(item.product);
//       if (!product) {
//         return res.status(404).json({ status: false, msg: `Product with ID ${item.product} not found` });
//       }
//       if (product.quantity < item.quantity) {
//         insufficientQuantityProducts.push({ product: product.name, availableQuantity: product.quantity });
//       }
//     }

//     if (insufficientQuantityProducts.length > 0) {
//       return res.status(400).json({
//         status: false,
//         msg: "Insufficient quantity for some products",
//         details: insufficientQuantityProducts
//       });
//     }

//     const totalPrice = orderItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );

//     const newOrder = await OrderAdmin.create({
//       customerName,
//       orderItems,
//       totalPrice,
//     });

//     const promises = orderItems.map(async (item) => {
//       await Product.findByIdAndUpdate(
//         item.product,
//         {
//           $inc: { quantity: -item.quantity, sold: item.quantity },
//         },
//         {
//           new: true,
//         }
//       );
//     });

//     await Promise.all(promises);

//     res.json({
//       status: true,
//       msg: "Create order successfully",
//       order: newOrder,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       msg: error.message
//     });
//   }
// });

// const getAllOrders = asyncHandler(async (req, res) => {
//   const { currentPage, keySearch, itemsPerPage } = req.body;
//   try {
//     let options = {};
//     if (keySearch) {
//       options = {
//         customerName: new RegExp(keySearch, "i"),
//       };
//     }
//     const orders = await OrderAdmin.find(options).sort({ createdAt: -1 });

//     const page = currentPage || 1;
//     const limit = itemsPerPage || 10;
//     const skip = (page - 1) * limit;

//     const totalOrders = await OrderAdmin.countDocuments(options);
//     const data = orders.slice(
//       skip,
//       parseInt(skip.toString()) + parseInt(limit.toString())
//     );
//     res.json({
//       status: true,
//       orders: data,
//       totalOrders,
//       page,
//       limit,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       msg: error.message
//     });
//   }
// });

// const updateOrder = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const updateOrder = await OrderAdmin.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.json(updateOrder);
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       msg: error.message
//     });
//   }
// });

// const deleteOrder = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const deleteOrder = await OrderAdmin.findByIdAndDelete(id);
//     res.json({
//       status: true,
//       msg: "Delete order successfully",
//       deleteOrder,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       msg: error.message
//     });
//   }
// });

// module.exports = {
//   createOrder,
//   getAllOrders,
//   updateOrder,
//   deleteOrder,
// };

