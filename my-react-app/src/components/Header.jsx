import argentBankLogo from "../assets/img/argentBankLogo.png";
import "../styles/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer l'utilisateur et le token depuis Redux
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // Déconnexion
    navigate("/"); // Redirection vers la page d'accueil
  };

  return (
    <header className="header">
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img src={argentBankLogo} alt="Argent Bank Logo" />
        </Link>
        <div className="main-nav-items">
          {token && user ? (
            // Si l'utilisateur est connecté, afficher son nom et "Sign Out"
            <>
              <FontAwesomeIcon icon={faCircleUser} size="1x" color="black" />
              <span className="main-nav-item">{user.userName}</span>
              <button className="main-nav-button" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} size="1x" color="black" />
                <p className="main-nav-item">Sign Out</p>
              </button>
            </>
          ) : (
            // Si l'utilisateur n'est pas connecté, afficher "Sign In"
            <Link className="main-nav-item" to="/signin">
              <FontAwesomeIcon icon={faCircleUser} size="1x" color="black" />
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

