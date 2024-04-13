import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useToast from "../../customHooks/useToast";
import AuthContext from "../../context/AuthContext";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [toastProps, setToastProps] = useState([]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setCred({ ...cred, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!cred.name || !cred.email || !cred.password || !cred.confirmPassword) {
      setToastProps(["error", "All fields are required.", 2000]);
      return;
    }
    if (cred.password !== cred.confirmPassword) {
      setToastProps(["error", "Passwords do not match.", 2000]);
      return;
    }
    const userData = { ...cred, confirmPassword: undefined };
    registerUser(userData);
  };
  const Toast = useToast(() => toastProps);
  return (
    <>
      <div>
        {Toast}
        <div className="pageHead">
          <h3>REGISTER</h3>
        </div>
        <div className="pageBody">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Register here first to be able to login.</legend>

              <div className="form-group">
                <label htmlFor="name" className="form-label mt-4">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                  autoComplete="off"
                  value={cred.name}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label mt-4">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  autoComplete="off"
                  value={cred.email}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label mt-4">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                  value={cred.password}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="confirmPassword" className="form-label mt-4">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  autoComplete="off"
                  value={cred.confirmPassword}
                  onChange={handleInput}
                />
              </div>

              <div
                style={{
                  width: "100%",
                }}
              >
                <div style={{ width: "fit-content", margin: "0 auto" }}>
                  <p
                    style={{
                      fontSize: "11px",
                      width: "fit-content",
                      margin: "0 auto",
                    }}
                  >
                    Already have an account ? Go to{" "}
                    <Link to="/login">Login</Link>.
                  </p>
                </div>
                <div
                  style={{
                    width: "fit-content",
                    margin: "1rem auto",
                  }}
                >
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
