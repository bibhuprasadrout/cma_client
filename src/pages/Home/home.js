import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate;
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && nav("/login", { replace: true });
  }, []);
  return (
    <>
      <div>
        <div className="pageHead">
          <div className="jumbotron">
            <h1 className="display-4">{`${
              user?.name.charAt(0).toUpperCase() + user?.name.slice(1)
            }, Hi their!`}</h1>
            <p className="lead">You can create new contacts here.</p>
            <p className="lead">
              <Link to="/create-contact" className="btn btn-primary btn-lg">
                Create contact
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
