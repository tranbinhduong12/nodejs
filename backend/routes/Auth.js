const authController = require('../controllers/AuthController');
const router = require('express').Router();

//register
router.post('/register', authController.registerUser);

//login
router.post('/login', authController.loginUser);

//refresh
router.post('/refresh', authController.requestRefreshToken);

//logout
router.post('/logout', authController.logoutUser);

module.exports = router;