const HomeController = require('../controllers/HomeController');
const AuthController = require('../controllers/AuthController');
const CartController = require('../controllers/CartController');

const router = require('express').Router();

router.get('/', HomeController.index);
router.get('/category/:id', HomeController.category);
router.get('/contact', HomeController.contact);
router.get('/product/:id', HomeController.product);
router.get('/products', HomeController.productList);

router.get('/cart', CartController.cart);
router.post('/cart/:id/:productId', CartController.addToCart);
router.get('/cart/clear', CartController.removeFromCart);
router.get('/checkout', CartController.checkout);
router.post('/checkout', CartController.checkoutPost);
router.get('/checkoutSuccess', CartController.checkoutSuccess);
router.get('/order-history', CartController.orderHistory);

router.get('/login', AuthController.login);
router.get('/account', AuthController.myaccount);
router.post('/updateUser', AuthController.updateUser);
router.get('/logout', AuthController.logoutUser);

module.exports = router;