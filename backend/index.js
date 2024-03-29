const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
var session = require('express-session');
const bodyParser = require('body-parser');

const categoryRoute = require("./routes/apis/Category");
const productRoute = require("./routes/apis/Product");
const authRoute = require("./routes/apis/Auth");
const userRoute = require("./routes/apis/User");
const orderRoute = require("./routes/apis/Order");

const homeRoute = require("./routes/Home");

const middleware = require('./middleware/middleware'); 

dotenv.config();
const app = express();

app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect mongodb
mongoose.connect(process.env.MONGODB_URL, () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Connected to MongoDB");
    } else {
        console.log("Error connecting to MongoDB " + mongoose.connection.readyState);
    }
})
mongoose.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

app.use(cors());
app.use(express.json());
app.use(morgan())
app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 }
  }));
  

//routers
app.use('/v1/category', categoryRoute);
app.use('/v1/product', productRoute);
app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);
app.use('/v1/order', orderRoute);

// thêm middleware vào app.use('/', homeRoute);
app.use('/', middleware.settingMiddleware, homeRoute);

let port = 8000;
app.listen(port, () => console.log('server is running in port ' + port));