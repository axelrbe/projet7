import "./LoginSignup.css";
import { Link } from "react-router-dom";
import logo3 from "../../images/logo3.png";

const LoginSignup = () => {
  return (
    <header className="login__header">
      <img src={logo3} alt="logo" className="login__logo" />
      <nav>
        <ul className="login__links">
          <li className="login__li">
            <Link to="/" className="login__link">
              Connexion
            </Link>
          </li>
          <li className="login__li">
            <Link to="/inscription" className="login__link">
              Inscription
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LoginSignup;
