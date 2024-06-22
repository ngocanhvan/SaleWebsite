const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderAdminSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("OrderAdmin", orderAdminSchema);
