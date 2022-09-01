import "./LoginSignup.css";
import { Link } from "react-router-dom";
import logo3 from "../../images/logo3.png";
import { useEffect, useState } from "react";

const LoginSignup = () => {
  const [checkWidth, setCheckWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setCheckWidth(window.innerWidth);
  };

  const openNav = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  useEffect(() => {
    window.addEventListener("resize", handleClick);

    return () => {
      window.removeEventListener("resize", handleClick);
    };
  }, []);

  return (
    <header className="login__header">
      <img src={logo3} alt="logo" className="login__logo" />
      <nav>
        {checkWidth < 768 && (
          <button className="floating__btn" onClick={openNav}>
            <i className="fa-solid fa-list"></i>
          </button>
        )}
        <ul className={`login__links ${isOpen ? "active" : ""}`}>
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
