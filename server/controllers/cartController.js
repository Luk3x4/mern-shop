const User = require('../models/userModel')
const Product = require('../models/productModel')

const getCartData = async (req, res) => {
    try {
        const { email } = req.user
        const cart = await User.findOne({email}).select('cart')
        res.status(200).json({
            cart
        })
    } catch (error) {
        res.status(400).json({
            err: true
        })
    }
}

const deleteCartData = async (req, res) => {
    try{
        const { email } = req.user
        const { id } = req.params
        const user = await User.findOne({email})
        user.cart = user.cart.filter(item => item._id != id)
        await user.save()
        res.status(200).json({
            user
        })
    }catch(err){
        res.status(400).json({
            err: true
        })
    }
}

const addCartData = async (req, res) =>{
    try {
        const { id } = req.body
        const { email } = req.user
        const user = await User.findOne({ email })
        const productData = await Product.findById(id)
        const productAlreadyExists = user.cart.some(item => item.product == productData.product)
        if(productAlreadyExists){
            throw "პროდუქტი უკვე დამატებულია კალათში"
        }
        
        user.cart.push(productData)
        await user.save()
        res.status(200).json({
            user
        })

    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

module.exports = {
    getCartData,
    deleteCartData,
    addCartData
}