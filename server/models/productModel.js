const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    product_image: {
        type: String,
        // required: true,
    },
    product_price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', Schema)