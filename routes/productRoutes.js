const express = require('express')
const productRouter = express.Router()
const { authenticate, authorizePermissions } = require('../middleware/authentication')
const {
    createProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controllers/productController')

productRouter.get('/', authenticate, getAllProduct)
productRouter.get('/:id', authenticate, getProduct)

productRouter.post('/createProduct', authenticate, authorizePermissions('admin', 'owner'), createProduct)
productRouter.post('/uploadImage', authenticate, authorizePermissions('admin', 'owner'), uploadImage)

productRouter.patch('/updateProduct', authenticate, authorizePermissions('admin', 'owner'), updateProduct)
productRouter.delete('/deleteProduct', authenticate, authorizePermissions('admin', 'owner'), deleteProduct)

module.exports = productRouter


