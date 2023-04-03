import PublishIcon from '@mui/icons-material/Publish';
import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import axios from 'axios';

export default function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({});
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    category: "",
    category_id: "",
  });

  // get categories
  const getCategories = async () => {
    try {
      // config header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.get("https://nhat-desu-server.onrender.com/v1/category", config);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  
  document.title = `${product.name}`;

  // get product by id using asiox
  const getProduct = async () => {
    try {
      // config header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await userRequest.get(`https://nhat-desu-server.onrender.com/v1/product/${productId}`, config);

      const data = {
        name: res.data.name ? res.data.name : "",
        description: res.data.description ? res.data.description : "",
        price: res.data.price ? res.data.price : "",
        quantity: res.data.quantity ? res.data.quantity : "",
        image: res.data.image ? res.data.image : "",
        category: res.data.category['name'] ? res.data.category['name'] : "",
        category_id: res.data.category['id'] ? res.data.category['id'] : "",
      };
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handdeSubmit = async (e) => {
    e.preventDefault();
    // get value from inputs 
    const newProduct = {
      name: inputs.name ? inputs.name : product.name,
      description: inputs.description ? inputs.description : product.description,
      price: inputs.price ? inputs.price : product.price,
      quantity: inputs.quantity ? inputs.quantity : product.quantity,
      image: inputs.image ? inputs.image : product.image,
      category: inputs.category ? inputs.category : product.category_id,
    };
    // update product using axios
    const res = await updateProduct(productId, newProduct, dispatch);
    if (res) {
      getProduct();
      alert("update product success");
    }else{
      alert("update product fail");
    }
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
      </div>
      <div className="productTop">
        {/* <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div> */}
        <div className="productTopRight">
          <Link to="/products">
            <button className="productBackButton">
              Back to Products
            </button>
          </Link>
          <div className="productInfoTop">
            <img src={product.image} alt="" className="productInfoImg" />
            <span className="productName">{product.name}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Created At:</span>
              <span className="productInfoValue">{
                new Date(product.createdAt).toDateString()
              }</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">price:</span>
              <span className="productInfoValue">{product.price} VND</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">category:</span>
              <span className="productInfoValue">{product.category}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">quantity:</span>
              <span className="productInfoValue">{product.quantity} SP</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">description: </span>
              <span className="productInfoValue">{product.description}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handdeSubmit}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input name="name" onChange={handleChange} type="text" defaultValue={
              product.name ? product.name : ""
            } />
            <label>Product Description</label>
            <input name='description' onChange={handleChange} type="text" defaultValue={
              product.description ? product.description : ""
            } />
            <label>Price</label>
            <input name="price" onChange={handleChange} type="text" defaultValue={
              product.price ? product.price : ""
            } />
            <label>quantity</label>
            <input name="quantity" onChange={handleChange} type="text" defaultValue={
              product.quantity ? product.quantity : ""
            } />
            <label>Category</label>
            <select name="category" onChange={handleChange} >
              {categories.map((category) => (
                <option key={category.id} value={category.id} selected={category.id === product.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <div className='imgPriview'>
                <img src={product.image} alt="" className="productUploadImg" />
              </div>
              <label htmlFor="file">
                <PublishIcon />
              </label>
              <input type="text" name="image" id="file" placeholder="image" defaultValue={product.image} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
