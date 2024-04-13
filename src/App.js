import { useContext, useEffect } from "react";
import Layout from "./components/Layout/layout.js";
import { AuthContextProvider } from "./context/AuthContext.js";
import Routes from "./Routes/routes.js";

const App = () => {
  return (
    <>
      <div>
        <AuthContextProvider>
          <Layout>
            <Routes />
          </Layout>
        </AuthContextProvider>
      </div>
    </>
  );
};

export default App;
