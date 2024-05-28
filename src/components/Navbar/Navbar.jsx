import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import defaultPicture from "../../assets/defaultUser.png";
import defaultLogo from "../../assets/logo.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="bg-black p-4 flex justify-between items-center border-b-2 border-[#FFEDA3]">
      <div className="flex items-center space-x-4">
        <img src={defaultLogo} className="h-9" alt="Logo" />
        <Link to="/">
          <p className="text-[#FFEDA3] hover:text-[#39A9CB]">Home</p>
        </Link>

        <Link to="/aboutUs">
          <p className="text-[#FFEDA3] hover:text-[#39A9CB]">About Us</p>
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/products">
              <p className="text-[#FFEDA3] hover:text-[#39A9CB]">
                Product Page
              </p>
            </Link>

            <Link to="/orders">
              <p className="text-[#FFEDA3] hover:text-[#39A9CB]">My Orders</p>
            </Link>

            <button
              onClick={logOutUser}
              className="text-[#FFEDA3] bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
            >
              Logout
            </button>

            <Link to="/profile" className="flex items-center space-x-2">
              <p className="text-[#FFEDA3] hover:text-[#39A9CB]">Profile</p>
              <img
                src={defaultPicture}
                className="w-12 h-12 rounded-full"
                alt="profile"
              />
            </Link>

            <span className="text-[#FFEDA3]">{user && user.name}</span>
          </>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <p className="text-[#FFEDA3] hover:text-[#39A9CB]">Sign Up</p>
            </Link>

            <Link to="/login">
              <p className="text-[#FFEDA3] hover:text-[#39A9CB]">Log In</p>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
