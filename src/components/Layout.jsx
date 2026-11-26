import { Link, Outlet, useLocation, useNavigate } from "react-router";
import MenuDrawer from "./MenuDrawer/MenuDrawer.jsx";
import { useAuth } from "../AuthContext";
import "./Layout.css";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, userRole, setUserRole } = useAuth();
  const isEmployeePage = pathname === "/employee";

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/");
  }

  return (
    <div className={`site-layout${isEmployeePage ? " employee-layout" : ""}`}>
      <header className="site-nav">
        <Link className="site-brand" to="/">Autokorjaamo</Link>
        {!isEmployeePage && (
          <nav className="site-page-nav" aria-label="Main navigation">
            <Link to="/">Home</Link>
            {isAuthenticated && userRole === "employee" && <Link to="/employee">Employee page</Link>}
            {isAuthenticated && <Link to="/upload">Upload</Link>}
            {isAuthenticated && <Link to="/profile">Profile</Link>}
          </nav>
        )}
        <nav className="site-account-nav" aria-label="Account navigation">
          {isAuthenticated ? (
            <button type="button" onClick={handleLogout}>Log out</button>
          ) : (
            <Link to="/login">Log in/Register</Link>
          )}
        </nav>
        {!isEmployeePage && <MenuDrawer />}
      </header>
      <div className={`site-content${isEmployeePage ? " employee-content" : ""}`}>
        <Outlet />
      </div>
      {!isEmployeePage && (
        <footer className="site-footer">
          <div>
            <strong>Autokorjaamo</strong>
            <span>Address, Phone, email@example.com</span>
          </div>
          <div>
            <span>Opening hours: Mon–Fri 8–20</span>
            <span>© 2026 Autokorjaamo</span>
          </div>
        </footer>
      )}
    </div>
  );
}