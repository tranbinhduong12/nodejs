const OrderController = require('../../controllers/apis/OrderController');

const router = require('express').Router();

//get orders
router.get('/', OrderController.getOrders);

// get orders by user
router.get('/user/:userId', OrderController.getUserOrders);

//get order
router.get('/:id', OrderController.getOrder);

//update order
router.put('/:id', OrderController.updateOrder);

module.exports = router;