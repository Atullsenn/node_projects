const express = require('express');
const route = express.Router();
const product = require('../controllers/productController');
const uploadMiddleware = require('../middilewares/uploadImages');


route.post('/createProduct', uploadMiddleware.uploadMultipleImage, product.createProduct);
route.post('/updateProduct', product.updateProduct);


module.exports = route;