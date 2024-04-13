import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useToast from "../../customHooks/useToast";

const Navbar = ({ title = "CMA" }) => {
  const { user, setUser } = useContext(AuthContext);
  const [toastProps, setToastProps] = useState([]);
  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
    setToastProps(["success", "Succesfully Logged out.", 2000]);
  };
  const Toast = useToast(() => toastProps);
  return (
    <>
      <div>
        {Toast}
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container-fluid">
            <Link to="/" className="link navbar-brand">
              {title}
            </Link>
            <div className="navbar-expand-sm">
              <ul className="navbar-nav me-auto">
                {user ? (
                  <>
                    <li className="nav-item">
                      <Link to="/all-contacts" className="link nav-link">
                        All contacts
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/create-contact" className="link nav-link">
                        Create
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-danger" onClick={logoutUser}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/register" className="link nav-link">
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login" className="link nav-link">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Navbar;
