import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Category from "./pages/category/Category";
import NewCategory from "./pages/newCategory/NewCategory";
import ViewCategory from "./pages/viewCategory/Category";
import Login from "./pages/login/Login";
import OrderList from "./pages/order/orderList/OrderList";
import Order from "./pages/order/order/Order";
// import Login from "./pages/login/Login";


function App() {
  
  return (
    <Router>
      <Topbar />
      <div className="container">
        
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/category" element={<Category />} />
          <Route path="/add-category" element={<NewCategory />} />
          <Route path="/category/:categoryId" element={<ViewCategory />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/:id" element={<Order />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
