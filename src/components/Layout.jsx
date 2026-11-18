import { Link, Outlet, useNavigate } from "react-router";
import MenuDrawer from "./MenuDrawer/MenuDrawer.jsx";
import { useAuth } from "../AuthContext";
import "./Layout.css";

export default function Layout() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  function handleLogout() {
    setIsAuthenticated(false);
    navigate("/");
  }

  return (
    <div className="site-layout">
      <header className="site-nav">
        <Link className="site-brand" to="/">Autokorjaamo</Link>
        <nav className="site-page-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          {isAuthenticated && <Link to="/upload">Upload</Link>}
          {isAuthenticated && <Link to="/profile">Profile</Link>}
        </nav>
        <nav className="site-account-nav" aria-label="Account navigation">
          {isAuthenticated ? (
            <button type="button" onClick={handleLogout}>Log out</button>
          ) : (
            <Link to="/login">Log in/Register</Link>
          )}
        </nav>
        <MenuDrawer />
      </header>
      <div className="site-content">
        <Outlet />
      </div>
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
    </div>
  );
}
