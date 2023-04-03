import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useSelector } from "react-redux";
import "./login.css";

const Login = () => {

  const admin = useSelector((state) => state.user);
  if (admin.currentUser !== null && admin.currentUser['admin'] === true) {
    window.location.replace("/");
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    const loginAction = await login(dispatch, { username, password });
    if (loginAction != null) {
      if (loginAction['admin'] === true) {
        alert(`hello ${loginAction.username}`);
        window.location.replace("/");
      }else{
        alert(`you are not admin`)
      }
    }else{
      alert('login failed');
    }
  };

  return (
    <div className="container-login">
      <h1>
          Login admin account
      </h1>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>
        Login
      </button>
    </div>
  );
};

export default Login;
