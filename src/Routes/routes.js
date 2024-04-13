import { useContext } from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage/landingPage.js";
import Home from "../pages/Home/home.js";
import AuthContext from "../context/AuthContext.js";
import Register from "../pages/Register/register.js";
import Login from "../pages/Login/login.js";
import CreateContact from "../pages/CreateContact/createContact.js";
import AllContacts from "../pages/AllContacts/allContacts.js";

const Routes = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Switch>
        <Route
          path="/"
          element={user ? <Navigate to="/me" /> : <LandingPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/me" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/me" /> : <Login />}
        />
        <Route
          path="/me"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-contact"
          element={user ? <CreateContact /> : <Navigate to="/login" />}
        />
        <Route
          path="/all-contacts"
          element={user ? <AllContacts /> : <Navigate to="/login" />}
        />
      </Switch>
    </>
  );
};
export default Routes;
