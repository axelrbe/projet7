import { useEffect, useState } from "react";
import "./UserModif.css";
import JwtService from "../../services/JwtService";
import axios from "axios";
import { Formik } from "formik";
import bcrypt from "bcryptjs";

const UserModif = ({ email, pseudo, password }) => {
  const [firstInput, setFirstInput] = useState(false);
  const [secondInput, setSecondInput] = useState(false);
  const [thirdInput, setThirdInput] = useState(false);
  const [showFirstInput, setShowFirstInput] = useState(false);
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [showThirdInput, setShowThirdInput] = useState(false);
  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const [showThirdPassword, setShowThirdPassword] = useState(false);

  const switchShowFirstInput = () => {
    setShowFirstInput(!showFirstInput);
  };

  const switchShowSecondInput = () => {
    setShowSecondInput(!showSecondInput);
  };

  const switchShowThirdInput = () => {
    setShowThirdInput(!showThirdInput);
  };

  const toggleFirstPassword = () => {
    showFirstPassword
      ? setShowFirstPassword(false)
      : setShowFirstPassword(true);
  };

  const toggleSecondPassword = () => {
    showSecondPassword
      ? setShowSecondPassword(false)
      : setShowSecondPassword(true);
  };

  const toggleThirdPassword = () => {
    showThirdPassword
      ? setShowThirdPassword(false)
      : setShowThirdPassword(true);
  };

  const updateUserInfo = (stateName, stateValue) => {
    console.log(stateValue);
    switch (stateName) {
      case "email":
        setFirstInput(stateValue.email);
        setShowFirstInput(false);
        break;
      case "pseudo":
        setSecondInput(stateValue.pseudo);
        setShowSecondInput(false);
        break;
      case "password":
        setThirdInput("");
        setShowThirdInput(false);
        break;
      default:
        console.log("erreur inconnue");
    }
  };

  useEffect(() => {
    setFirstInput(email);
    setSecondInput(pseudo);
  }, [email, pseudo]);

  return (
    <div>
      <div className="infos__container">
        <div className="email__container">
          <p className="email">email: {firstInput}</p>
          <button className="usermodify__icon" onClick={switchShowFirstInput}>
            <i className="fa-solid fa-pen-to-square" />
          </button>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Champ requis";
            }
            return errors;
          }}
          onSubmit={(newEmail, { setSubmitting }) => {
            const cryptedPassword = bcrypt.compareSync(
              newEmail.password,
              password
            );
            if (!cryptedPassword) {
              alert("Mot de passe incorrect !");
              return;
            } else {
              axios({
                method: "post",
                url: "http://localhost:3001/api/auth/modifyInfo/",
                data: newEmail,
                headers: { Authorization: "Bearer " + JwtService.getToken() },
              })
                .then(function (response) {
                  alert("Votre email à bien été modifié !");
                  updateUserInfo("email", newEmail);
                  console.log(response);
                  setSubmitting(false);
                })
                .catch(function (error) {
                  console.log(error);
                  setSubmitting(false);
                });
            }
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form
              className={`modify__area ${
                showFirstInput ? "input__active" : ""
              }`}
              onSubmit={handleSubmit}
            >
              <input
                className="input__form"
                placeholder="Modifiez votre email..."
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              <span className="error">{errors.email}</span>
              <div
                className={`confirm__container ${
                  values.email.length >= 1 ? "input__active" : ""
                }`}
              >
                <input
                  className="confirm"
                  placeholder="Confirmer votre mot de passe..."
                  type={showFirstPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
                <span className="show__password" onClick={toggleFirstPassword}>
                  <i className="fa-solid fa-eye" />
                </span>
              </div>
              <button type="submit" className="submit__btn">
                <i className="fa-solid fa-paper-plane" />
              </button>
            </form>
          )}
        </Formik>
        <div className="pseudo__container">
          <p className="pseudo">pseudo: {secondInput}</p>
          <button className="usermodify__icon" onClick={switchShowSecondInput}>
            <i className="fa-solid fa-pen-to-square" />
          </button>
        </div>
        <Formik
          initialValues={{
            pseudo: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.pseudo) {
              errors.pseudo = "Champ requis";
            }
            return errors;
          }}
          onSubmit={(newPseudo, { setSubmitting }) => {
            const cryptedPassword = bcrypt.compareSync(
              newPseudo.password,
              password
            );
            if (!cryptedPassword) {
              alert("Mot de passe incorrect !");
              return;
            } else {
              axios({
                method: "post",
                url: "http://localhost:3001/api/auth/modifyInfo/",
                data: newPseudo,
                headers: { Authorization: "Bearer " + JwtService.getToken() },
              })
                .then(function (response) {
                  alert("Votre pseudo à bien été modifié !");
                  updateUserInfo("pseudo", newPseudo);
                  console.log(response);
                  setSubmitting(false);
                })
                .catch(function (error) {
                  console.log(error);
                  setSubmitting(false);
                });
            }
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form
              className={`modify__area ${
                showSecondInput ? "input__active" : ""
              }`}
              onSubmit={handleSubmit}
            >
              <input
                className="input__form"
                placeholder="Modifiez votre pseudo..."
                name="pseudo"
                onChange={handleChange}
                value={values.pseudo}
              />
              <span className="error">{errors.pseudo}</span>
              <div
                className={`confirm__container ${
                  values.pseudo.length >= 1 ? "input__active" : ""
                }`}
              >
                <span className="show__password" onClick={toggleSecondPassword}>
                  <i className="fa-solid fa-eye" />
                </span>
                <input
                  className="confirm"
                  placeholder="Confirmer votre mot de passe..."
                  type={showSecondPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
              </div>
              <button type="submit" className="submit__btn">
                <i className="fa-solid fa-paper-plane" />
              </button>
            </form>
          )}
        </Formik>
        <div className="pseudo__container">
          <p className="pseudo">Modifiez votre mot de passe ?</p>
          <button className="usermodify__icon" onClick={switchShowThirdInput}>
            <i className="fa-solid fa-pen-to-square" />
          </button>
        </div>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = "Champ requis";
            }
            return errors;
          }}
          onSubmit={(newPassword, { setSubmitting }) => {
            console.log(newPassword, password);
            const cryptedPassword = bcrypt.compareSync(
              newPassword.confirmPassword,
              password
            );
            if (!cryptedPassword) {
              alert("Mot de passe incorrect !");
              return;
            } else {
              axios({
                method: "post",
                url: "http://localhost:3001/api/auth/modifyInfo/",
                data: newPassword,
                headers: { Authorization: "Bearer " + JwtService.getToken() },
              })
                .then(function (response) {
                  alert("Votre mot de passe à bien été modifié !");
                  updateUserInfo("password", "");
                  console.log(response);
                  setSubmitting(false);
                })
                .catch(function (error) {
                  console.log(error);
                  setSubmitting(false);
                });
            }
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form
              className={`modify__area ${
                showThirdInput ? "input__active" : ""
              }`}
              onSubmit={handleSubmit}
              key={thirdInput}
            >
              <input
                className="input__form"
                placeholder="Modifiez votre mot de passe..."
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              <span className="error">{errors.password}</span>
              <div
                className={`confirm__container ${
                  values.password.length >= 1 ? "input__active" : ""
                }`}
              >
                <span className="show__password" onClick={toggleThirdPassword}>
                  <i className="fa-solid fa-eye" />
                </span>
                <input
                  className="confirm"
                  placeholder="Confirmer votre mot de passe..."
                  type={showThirdPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
              </div>
              <button type="submit" className="submit__btn">
                <i className="fa-solid fa-paper-plane" />
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserModif;
