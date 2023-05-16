const Product = require('../models/Product')

const createProduct = (req, res) => {
    res.send('create product')
}

const getAllProduct = (req, res) => {
    res.send('get all product')
}

const getProduct = (req, res) => {
    res.send('get product')
}

const updateProduct = (req, res) => {
    res.send('update product')
}

const deleteProduct = (req, res) => {
    res.send('delete product')
}

const uploadImage = (req, res) => {
    res.send('upload image product')
}

module.exports = {
    createProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}
