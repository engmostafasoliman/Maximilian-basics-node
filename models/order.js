const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: [
        {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            imageUrl: { type: String },
            quantity: { type: Number, required: true }
        }
    ],
    user: {
        name: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    date: { type: Date }
});

module.exports = mongoose.model("Order", orderSchema);
