const Category = require('../models/Category');

async function settingMiddleware(req, res, next) {
    try {
        const categories = await Category.find();
        res.locals.categories = categories;
        next();
    }catch(err) {
        next();
    }
}

module.exports = {
    settingMiddleware: settingMiddleware
};