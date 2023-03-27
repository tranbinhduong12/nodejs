const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
var session = require('express-session');

const categoryRoute = require("./routes/Category");
const productRoute = require("./routes/Product");
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/User");
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/Order");


dotenv.config();
const app = express();

app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

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
app.use('/v1/cart',cartRoute);
app.use('/v1/order', orderRoute);

let port = 8000;
app.listen(port, () => console.log('server is running in port ' + port));