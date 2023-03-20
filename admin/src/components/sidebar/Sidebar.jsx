import "./sidebar.css";
import LineStyleIcon from '@mui/icons-material/LineStyle';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CategoryIcon from '@mui/icons-material/Category';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const admin = useSelector((state) => state.user);
  if (admin.currentUser === null || admin.currentUser['admin'] === false) {
    return (<></>)
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className="sidebarListItem">
                <ShoppingCart className="sidebarIcon" />
                orders
              </li>
            </Link>
          </ul>
        </div>
        {/* Categories manage */}
        
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">User manage</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Users
              </li>
            </Link>
            {/* Link to create user */}
            <Link to="/newUser" className="link">
              <li className="sidebarListItem">
                <PersonAddAltIcon className="sidebarIcon" />
                Create user
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Categories manage</h3>
          <ul className="sidebarList">
            <Link to="/category" className="link">
              <li className="sidebarListItem">
                <CategoryIcon className="sidebarIcon" />
                Categories
              </li>
            </Link>
            {/* Link to create user */}
            <Link to="/add-category" className="link">
              <li className="sidebarListItem">
                <PlaylistAddIcon className="sidebarIcon" />
                Create a new Categorie
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Product manage</h3>
          <ul className="sidebarList">
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/newproduct" className="link">
              <li className="sidebarListItem">
                <PostAddIcon className="sidebarIcon" />
                Create a new Product
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Chat bot manage</h3>
          <ul className="sidebarList">
            <Link to="/chats" className="link">
              <li className="sidebarListItem">
                <MailOutlineIcon className="sidebarIcon" />
                Tag manager
              </li>
            </Link>
            <Link to="/add-tag" className="link">
              <li className="sidebarListItem">  
                <ChatBubbleOutlineIcon className="sidebarIcon" />
                Create new tag
              </li>
            </Link>
            <Link to="/training" className="link">
              <li className="sidebarListItem">
                <DynamicFeedIcon className="sidebarIcon" />
                Tranning process
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
