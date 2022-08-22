import "./LoginSignup.css";
import { Link } from "react-router-dom";
import logo3 from "../../images/logo3.png";

const LoginSignup = () => {
  return (
    <header className="Header">
      <img src={logo3} alt="logo" className="logo" />
      <nav>
        <ul className="nav_link">
          <li className="links">
            <Link to="/" className="link">
              Connexion
            </Link>
          </li>
          <li className="links">
            <Link to="/inscription" className="link">
              Inscription
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LoginSignup;
