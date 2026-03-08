const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authorize, authenticate } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.me);
router.post('/users', authorize(['ADMIN', 'MANAGER']), authController.createUser);
router.get('/users', authorize(['ADMIN', 'MANAGER']), authController.getUsers);

module.exports = router;
