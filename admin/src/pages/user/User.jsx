import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AtatarDefault from './avatar.jpg';
import { Link } from "react-router-dom";
import "./user.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


export default function User() {

  const [user, setUser] = useState({});
  document.title = `view user ${user.username}`;
  const [loading, setLoading] = useState(false);
  // get id from url
  const id = window.location.pathname.split("/")[2];

  const getUser = async () => {
    setLoading(true);
    // axios config header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(`http://localhost:8000/v1/user/${id}`, config);
    setLoading(false);
    setUser(res.data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const phone = e.target[2].value;
    const address = e.target[3].value;
    const user = {
      username,
      email,
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
      await axios.put(`http://localhost:8000/v1/user/${id}`, user, config);
      getUser();
      alert("User updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
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
      await axios.delete(`http://localhost:8000/v1/user/${id}`, config);
      window.location.replace("/users");
      alert("User deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={AtatarDefault}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {user.username}
              </span>
              <span className="userShowUserTitle">
                {
                  user.admin ? "Admin" : "User"
                }
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.username}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {
                  // format date
                  new Date(user.createdAt).toDateString()
                }
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {
                  user.phone ? user.phone : "No phone number"
                }
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.email}
              </span>
            </div>
            <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {
                  user.address ? user.address : "No address"
                }
              </span>
            </div>
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
                <label>Username</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  defaultValue={user.username}
                  required
                />
                {/* dalue={user.username}
                  required
                /> */}
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  defaultValue={user.email}
                  required
                />
                {/* dalue={user.email}
                  required
                /> */}
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  defaultValue={
                    user.phone ? user.phone : ""
                  }
                  // Value={
                  //   user.phone ? user.phone : ""
                  // }
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  defaultValue={
                    user.address ? user.address : ""
                  }
                  // Value={
                  //   user.address ? user.address : ""
                  // }
                  required
                />
              </div>

            </div>

            <div className="userUpdateRight">
              <button className="userUpdateButton">Update</button>
              <button className='userDeleteUser' onClick={ handleDelete }>
                Delete user {user.username}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Link to="/users">
        <button className="button-back">Back to users</button>
      </Link>
    </div>
  );
}
