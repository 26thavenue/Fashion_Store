const express = require('express')

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getMenProducts,
  getWomenProducts
}= require('../controllers/product')

const productRouter = express.Router()

productRouter.get('/', getProducts)
productRouter.get('/men', getMenProducts)
productRouter.get('/women', getWomenProducts)
productRouter.get('/:id', getProduct)
productRouter.post('/', createProduct)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter