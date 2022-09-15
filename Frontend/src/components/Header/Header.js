import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo3 from "../../images/logo3.png";
import "./Header.css";

const Header = () => {
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
    <header className="Header">
      <img src={logo3} alt="logo" className="header__logo" />
      <nav>
        {checkWidth < 768 && (
          <button className="floating__btn" onClick={openNav}>
            <i className="fa-solid fa-list"></i>
          </button>
        )}
        <ul className={`header__links ${isOpen ? "links__active" : ""}`}>
          <li className="header__li">
            <Link to="/accueil" className="header__link">
              Accueil
            </Link>
          </li>
          <li className="header__li">
            <Link to="/ajout-article" className="header__link">
              Ajouter
            </Link>
          </li>
          <li className="header__li">
            <Link to="/modifier-profil" className="header__link">
              <i className="fa-solid fa-user user__profil" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
