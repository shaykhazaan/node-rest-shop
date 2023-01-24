const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orders');
const isAuth = require('../../middleware/check-auth');

// incoming request for /orders
router.get('/', isAuth, orderController.getAllOrders);

router.post('/', isAuth, orderController.createOrder);

router.get('/:orderId', isAuth, orderController.getOrder);

router.delete('/:orderId', isAuth, orderController.deleteOrder);

module.exports = router;