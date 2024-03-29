const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    paymentId: String,
    orderId: String,
    status: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
