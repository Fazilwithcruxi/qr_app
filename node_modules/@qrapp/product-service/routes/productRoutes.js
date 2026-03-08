const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate); // all routes require auth

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.delete('/:id', authorize(['ADMIN', 'MANAGER']), productController.deleteProduct);
router.get('/:id/generate', productController.generateCode);

module.exports = router;
