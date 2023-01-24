const mongoose = require('mongoose');


const schema = mongoose.Schema;

const orderSchema = new schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
    quantity: { type: Number, default: 1} 
});

module.exports = mongoose.model('order', orderSchema);