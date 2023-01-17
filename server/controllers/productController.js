const Product = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
        const { query } = req.query
        const product = await Product.find(query? { product: {$regex: `.*${query}.*`}}: {});
        res.status(200).json({
            product
        })
    } catch (error) {
        res.status(400).json({
            err: true
        })
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json({
            product
        })
    } catch (error) {   
        res.status(400).json({
            err: true
        })
    }

}

const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({
            product
        })
    } catch (error) {
        res.status(400).json({
            err: true
        })
    }
}

module.exports = {
    getProducts,
    addProduct,
    getSingleProduct
}