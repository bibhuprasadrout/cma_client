import Navbar from "../Navbar/navbar";
const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        <div className="container mt-3">{children}</div>
      </div>
    </>
  );
};
export default Layout;
