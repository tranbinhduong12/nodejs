import "./newUser.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NewUser() {
  document.title = "New User";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const phone = e.target[3].value;
    const address = e.target[4].value;
    const user = {
      username,
      email,
      password,
      phone,
      address,
    };
    // axios config header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.post("http://localhost:8000/v1/auth/register", user);
      // move to user page
      if (res.data) {
        window.location.replace(`/user/${res.data.id}`);
      }
    }
    catch (error) {
      console.log(error);
    }

  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={ handleSubmit }>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username...." />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" name="email" placeholder="Email..." />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" name="password" placeholder="password..." />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" name="phone" placeholder="Phone number" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" name="address" placeholder="Address" />
        </div>

        <button className="newUserButton">Create new user</button>
      </form>
      <Link to="/users">
        <button className="button-back">Back to users</button>
      </Link>
    </div>
  );
}
