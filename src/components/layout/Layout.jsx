import Header from "./Header.jsx";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <NavBar />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
