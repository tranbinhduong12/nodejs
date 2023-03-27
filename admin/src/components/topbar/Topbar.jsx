import React from "react";
import "./topbar.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from "react-redux";
import { Button, Menu, MenuItem } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import avatarAdmin from "./images.png";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function Topbar() {
  const admin = useSelector((state) => state.user);
  if (admin.currentUser === null || admin.currentUser['admin'] === false) {
    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutUser(dispatch);
    window.location.replace("/login");
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Nhat Shop</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            {/* <span className="topIconBadge">2</span> */}
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            {/* <span className="topIconBadge">2</span> */}
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          {/* drop down when click to image */}
          {/* if admin has exits */}
          {admin.currentUser !== null && admin.currentUser['admin'] === true && (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button 
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      boxShadow: "none",
                    }}
                    variant="contained" 
                    {...bindTrigger(popupState)}>
                    <img src={avatarAdmin} alt="" className="topAvatar" />
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>
                      {admin.currentUser['username']}
                    </MenuItem>
                    <Link 
                      to={`/user/${admin.currentUser['_id']}`} 
                      style={{textDecoration: "none", color: "black"}}
                    >
                        <MenuItem onClick={popupState.close}>
                          view profile
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          )}
        </div>
      </div>
    </div>
  );
}
