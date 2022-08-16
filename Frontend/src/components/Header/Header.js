import "./Header.css";
import { Link } from "react-router-dom";
import logo3 from "../../images/logo3.png";

const Header = () => {
  return (
    <header className="Header">
      <img src={logo3} alt="logo" className="logo" />
      <nav>
        <ul className="nav_link">
          <li className="links">
            <Link to="/" className="link">
              Accueil
            </Link>
          </li>
          <li className="links">
            <Link to="/ajout-article" className="link">
              Ajouter un article
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
