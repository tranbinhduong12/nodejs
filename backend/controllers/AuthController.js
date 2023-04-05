const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cart = require('../models/Cart');
const dotenv = require('dotenv');

let refreshTokens = [];
dotenv.config();

var data
const authController = {
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            
            //create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                password: hashed,
                
            });
            //save new user to database
            const user = await newUser.save();
            const cart = await new Cart({
                userId: user.id,
                products: []
            });

            user.cart = cart.id;
            await user.save();
            await cart.save();
            
            await cart.save();
            return res.status(200).json(user);
        } catch (err) {
            console.log(data)
            return res.status(500).json(err);
        }
    },
    //generate accessToken
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30d" }
        );
    },

    //generate refreshToken
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },
    //LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Wrong password' });
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                    path: '/',
                });
                const { password, ...userWithPasswords } = user._doc;
                return res.status(200).json({ ...userWithPasswords, accessToken });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // req refreshToken
    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'You are not authenticated' });
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json({ message: 'Refresh token is not valid' });
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if(err) {
                console.error(err);
            }
            refreshTokens = refreshTokens.filter(token => token !== refreshToken);
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/',
            });
            res.status(200).json({ accessToken: newAccessToken });
        });
    },
    //logout
    logoutUser: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        res.clearCookie('refreshToken');
        return res.status(200).json({ message: 'Logged out' });
    }
}

module.exports = authController;
    