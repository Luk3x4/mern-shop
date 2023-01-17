const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    cart: [
        // {
        //     product: {
        //         type: String,
        //         required: true,
        //     },
        //     product_image: {
        //         type: String,
        //         required: true,
        //     },
        //     product_price: {
        //         type: Number,
        //         required: true
        //     },
        //     category: {
        //         type: String,
        //         required: true
        //     }
        // }
    ]
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)