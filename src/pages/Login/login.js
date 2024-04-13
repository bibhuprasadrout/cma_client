import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useToast from "../../customHooks/useToast";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const [toastProps, setToastProps] = useState([]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setCred({ ...cred, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!cred.email || !cred.password) {
      setToastProps(["error", "Fill both email and password.", 2000]);
    } else {
      loginUser(cred);
    }
  };
  const Toast = useToast(() => toastProps);
  return (
    <>
      <div>
        {Toast}
        <div className="pageHead">
          <h3>LOGIN</h3>
        </div>
        <div className="pageBody">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Enter email and password to continue.</legend>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  autoComplete="off"
                  value={cred.email}
                  onChange={handleInput}
                />
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label mt-4"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  autoComplete="off"
                  value={cred.password}
                  onChange={handleInput}
                />
              </div>
              <div style={{ width: "100%" }}>
                <p
                  style={{
                    fontSize: "11px",
                    width: "fit-content",
                    margin: "0 auto",
                  }}
                >
                  Don't have an account ? <Link to="/register">Register</Link>{" "}
                  first to login.
                </p>
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
export default Login;
