import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar">
      <li className="navbar__item">
        <NavLink className="navbar__link" to={"/games"}>
          Games
        </NavLink>
      </li>
      {localStorage.getItem("gamer_token") !== null ? (
        <li className="navbar__item">
          <button
            className="navbar__link"
            onClick={() => {
              localStorage.removeItem("gamer_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className="navbar__item">
            <NavLink className="navbar__link" to={"/login"}>
              Login
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink className="navbar__link" to={"/register"}>
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
