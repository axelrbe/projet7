import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <img src="" alt="logo" />
      <nav>
        <ul className="nav_link">
          <li className="links">
            <Link to="/">Accueil</Link>
          </li>
          <li className="links">
            <Link to="/ajout-article">Ajouter un article</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
