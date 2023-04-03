import { useState, useEffect } from "react";
import "./newProduct.css";
import { addProduct, getCategories } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function NewProduct() {
  // change name page
  document.title = "New Product";
  const [inputs, setInputs] = useState({});
  const categories = useSelector((state) => state.category.categories);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = await addProduct(inputs, dispatch);
    if (product.data) {
      window.location.replace("/product/" + product.data.id);
    }else{
      console.log('error')
    }
  };


  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Create a New Product</h1>
      <form className="addProductForm" onSubmit={ handleSubmit }>
        <div className="addProductItem">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="name product..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="text"
            id="file"
            name="image"
            placeholder="image link..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="description"
            type="text"
            placeholder="description..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="price product..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <select style={{ 'padding': '10px' }} name="category" onChange={handleChange} required >
            <option value="" hidden> PLEASE CHOOSE CATEGORY</option>
            {categories.map(cat =>
              <option key={cat.id} value={cat.id} defaultChecked>{cat.name}</option>
            )};
          </select>
        </div>

        <div className="addProductItem">
          <label>Quantity</label>
          <input name="quantity" type="number" placeholder="Quantity product" onChange={handleChange} required />
        </div>
        <div>
          <button className="productAddButton">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
