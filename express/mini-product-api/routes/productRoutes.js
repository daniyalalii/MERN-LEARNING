const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProductId, validateProductData } = require('../middleware/validation');

// GET /products
router.get('/', productController.getAllProducts);

// GET /products/:id
router.get('/:id', validateProductId, productController.getProductById);

// POST/ products
router.post('/', validateProductData, productController.createProduct);

// DELETE /products/:id

router.delete('/:id',validateProductId, productController.deleteProduct);

module.exports = router;