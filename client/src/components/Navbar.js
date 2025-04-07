import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <nav>
        <Link to="/">Home</Link>
        {user && (
          <>
            <label onClick={() => setDropdownOpen(!dropdownOpen)}>
              Benvenuto {user.nome}!
            </label>
            {dropdownOpen && (
              <ul>
                <li><Link to="/user-profile">Profilo Utente</Link></li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </>
        )}
    </nav>
  );
};

export default Navbar;
