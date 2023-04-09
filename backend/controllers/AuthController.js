const User = require('../models/User');
const bcrypt = require('bcrypt');

const AuthController = {
    login: async (req, res) => {
        // render
        res.render('pages/login');
    },
    myaccount: async (req, res) => {
        var sess = req.session;
        if (!sess.daDangNhap) {
            return res.redirect('/login');
        }
        return res.render('pages/myaccount');
    },
    updateUser: async (req, res) => {
        try {
            var sess = req.session;
            if (!sess.daDangNhap) {
                return res.redirect('/login');
            }
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const id = sess.username.id;
            const newUser = req.body;
            newUser.password = hashed;
            console.log(newUser);
            const user = await User.findByIdAndUpdate(id, {
                $set: newUser
            }, {new: true});
            sess.username = user;
            res.redirect('/account');
        }
        catch(err) {
            return res.status(500).json(err);
        }
    },
    logoutUser: async (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },

}

module.exports = AuthController;