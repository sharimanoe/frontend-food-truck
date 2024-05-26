import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import defaultPicture from "../../assets/defaultUser.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/aboutUs">
        <p>About US</p>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/products">
            <p>Product Page</p>
          </Link>

          <Link to="/orders">
            <p>My Orders</p>
          </Link>

          <button onClick={logOutUser}>Logout</button>

          <Link to="/profile">
            <button>Profile</button>
            <img
              src={defaultPicture}
              style={{ width: 50, height: 50, borderRadius: 25 }}
              alt="profile"
            />
          </Link>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
