import { createContext, useEffect, useState } from "react";
import useToast from "../customHooks/useToast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const nav = useNavigate();
  const Toast = useToast(() => toastProps);
  const [user, setUser] = useState(null);
  const [toastProps, setToastProps] = useState([]);
  const [updateContact, setUpdateContact] = useState({});

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user"));
    if (userObj) setUser(userObj);
  }, []);

  const loginUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        setToastProps(["success", "Logged in successfully.", 2000]);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
      } else {
        setToastProps(["error", result.error, 2000]);
      }
    } catch (err) {
      setToastProps(["error", err, 2000]);
    }
  };

  const registerUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        setToastProps([
          "success",
          "Successfully registered user. Login to continue.",
          2000,
        ]);
        nav("/login", { replace: true });
      } else {
        setToastProps(["error", result.error, 2000]);
      }
    } catch (err) {
      setToastProps(["error", err, 2000]);
    }
  };

  useEffect(() => {
    checkUserIsLoggedIn();
  }, [user]);

  const checkUserIsLoggedIn = async () => {
    // if (!localStorage.getItem("token")) nav("/login", { replace: true });
    if (user)
      try {
        const res = await fetch("http://localhost:8000/api/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          nav("/me", { replace: true });
        } else {
          nav("/login", { replace: true });
          setToastProps(["error", result.error, 2000]);
        }
      } catch (err) {
        setToastProps(["error", err, 2000]);
      }
  };
  return (
    <AuthContext.Provider
      value={{
        loginUser,
        registerUser,
        user,
        setUser,
        updateContact,
        setUpdateContact,
      }}
    >
      {Toast}
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
