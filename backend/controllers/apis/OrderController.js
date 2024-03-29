const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const User = require('../../models/User');
const Product = require('../../models/Product');

const OrderController = {
    getOrders: async(req, res) => {
        try {
            // Lấy toàn bộ từ mới nhất đến cũ nhất
            const orders = await Order.find().sort({createdAt: -1});
            return res.status(200).json(orders);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    },
    // get user orders
    getUserOrders: async(req, res) => {
        try {
            const orders = await Order.find({userId: req.params.userId});
            return res.status(200).json(orders);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    },
    getOrder: async(req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            return res.status(200).json(order);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    },
    updateOrder: async(req, res) => {
        try {
            const order = await Order.findById(req.params.id);

            if(req.body.status) {
                order.status = req.body.status;
            }
            await order.save();
            return res.status(200).json(order);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    }

}

module.exports = OrderController;