import { Link } from "react-router-dom";
import "./navbar.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation ,useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
 const location = useLocation()
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  const handleSignOut = async () => {
    dispatch({ type: "LOGOUT_START" });
    try {
      await axios.get("http://localhost:8800/api/auth/logout");

      dispatch({ type: "LOGOUT_SUCCESS" });
      navigate("/")
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE" });
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking.com</span>
        </Link>
        {user ? (
          <div className="Ubutton">
            <span className="user">{user.username}</span>
            <button className="logoutB" onClick={handleSignOut}>
              logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register"  state={{prevUrl:location.pathname}}>
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login" state = {{prevUrl :location.pathname }}>
              <button className="navButton">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
