const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProductId, validateProductData } = require('../middleware/validation');
const {protect, restrictTo} = require('../middleware/auth');

//protection for all routes
router.use(protect);

// GET /products
router.get('/', productController.getAllProducts);

// GET /products/:id
router.get('/:id', validateProductId, productController.getProductById);

// POST/ products
router.post('/', validateProductData, productController.createProduct);

// DELETE /products/:id
router.delete('/:id',validateProductId, restrictTo('admin'),productController.deleteProduct);

module.exports = router;