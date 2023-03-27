import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import NotesIcon from '@mui/icons-material/Notes';
import { Link } from "react-router-dom";
import "./user.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


export default function ViewCategory() {

  const [category, setCategory] = useState({});
  document.title = `Category ${category.name}`;
  const [loading, setLoading] = useState(false);
  // get id from url
  const id = window.location.pathname.split("/")[2];

  const getCategory = async () => {
    setLoading(true);
    // axios config header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(`https://nhat-desu-server.onrender.com/v1/category/${id}`, config);
    setLoading(false);
    setCategory(res.data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const description = e.target[1].value;
    const image = e.target[2].value;
    const newCategory = {
      name,
      description,
      image,
    };
    // axios config header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      await axios.put(`https://nhat-desu-server.onrender.com/v1/category/${id}`, newCategory, config);
      getCategory();
      alert("Category updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleDelete = async () => {
    // axios config header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      await axios.delete(`https://nhat-desu-server.onrender.com/v1/category/${id}`, config);
      alert("category deleted successfully");
      window.location.replace("/category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit category</h1>
        <Link to="/add-category">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={category.image}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {category.name}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">infor detail</span>
            <div className="userShowInfo">
              <NotesIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {category.description}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                product use: {
                  category.products ? category.products.length : 0
                }
              </span>
            </div>
            <span className="userShowTitle">Product Details</span>
            {/* map in category.products */}
            {
              category.products && category.products.map((product) => (
                <div className="userShowInfo">
                  <img 
                    style={{width: "50px", height: "50px"}}
                    src={product.image}
                    alt={product.description}
                  />
                  <Link to={`/product/${product.id}`}>
                    <span className="userShowInfoTitle">
                      {product.name}
                    </span>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={
            (e) => {
              e.preventDefault();
              handleUpdate(e);
            }
          }>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>name</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  defaultValue={category.name}
                  required
                />
                {/* dalue={category.username}
                  required
                /> */}
              </div>
              <div className="userUpdateItem">
                <label>description</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  defaultValue={category.description}
                  required
                />
                {/* dalue={category.email}
                  required
                /> */}
              </div>
              <div className="userUpdateItem">
                <label>image</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  defaultValue={
                    category.image
                  }
                  // Value={
                  //   user.phone ? user.phone : ""
                  // }
                  required
                />
              </div>
            

            </div>

            <div className="userUpdateRight">
              <button className="userUpdateButton">Update category</button>
              <button className='userDeleteUser' onClick={ handleDelete }>
                Delete category {category.name}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Link to="/category">
        <button className="button-back">Back to category</button>
      </Link>
    </div>
  );
}
