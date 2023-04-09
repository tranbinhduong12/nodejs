import "./newCategory.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NewUser() {
  document.title = "New category";
  const handleSubmit = (e) => {
    e.preventDefault();
    // get data from form
    const category = {
      name: e.target.name.value,
      image: e.target.image.value,
      description: e.target.description.value,
    };
    // axios config header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const newUser = axios.post(`http://localhost:8000/v1/category`, category, config);
      // move to user page
      alert("New category created successfully");
    }
    catch (error) {
      console.log(error);
    }
    // clear form
    e.target.name.value = "";
    e.target.image.value = "";
    e.target.description.value = "";

  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New category</h1>
      <form className="newUserForm" onSubmit={ handleSubmit }>
        <div className="newUserItem">
          <label>name category</label>
          <input type="text" name="name" placeholder="name category...." />
        </div>
        <div className="newUserItem">
          <label>image</label>
          <input type="text" name="image" placeholder="link image..." />
        </div>
        <div className="newUserItem">
          <label>description</label>
          <input type="text" name="description" placeholder="description..." />
        </div>
        <button className="newUserButton">Create new category</button>
      </form>
      <Link to="/category">
        <button className="button-back">Back to list category</button>
      </Link>
    </div>
  );
}
