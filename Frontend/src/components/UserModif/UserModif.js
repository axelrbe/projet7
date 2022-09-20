import { useState } from "react";
import "./UserModif.css";
import JwtService from "../../services/JwtService";
import axios from "axios";
import { Formik } from "formik";
import bcrypt from "bcryptjs";

const UserModif = ({ email, pseudo, password }) => {
  const [firstInput, setFirstInput] = useState(false);
  const [secondInput, setSecondInput] = useState(false);
  const [thirdInput, setThirdInput] = useState(false);
  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const [showThirdPassword, setShowThirdPassword] = useState(false);

  const showFirstInput = () => {
    firstInput ? setFirstInput(false) : setFirstInput(true);
  };

  const showSecondInput = () => {
    secondInput ? setSecondInput(false) : setSecondInput(true);
  };

  const showThirdInput = () => {
    thirdInput ? setThirdInput(false) : setThirdInput(true);
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

  return (
    <div>
      <div className="infos__container">
        <div className="email__container">
          <p className="email">email: {email}</p>
          <button className="usermodify__icon" onClick={showFirstInput}>
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
              className={`modify__area ${firstInput ? "input__active" : ""}`}
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
          <p className="pseudo">pseudo: {pseudo}</p>
          <button className="usermodify__icon" onClick={showSecondInput}>
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
              className={`modify__area ${secondInput ? "input__active" : ""}`}
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
          <button className="usermodify__icon" onClick={showThirdInput}>
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
            const cryptedPassword = bcrypt.compareSync(
              newPassword.password,
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
              className={`modify__area ${thirdInput ? "input__active" : ""}`}
              onSubmit={handleSubmit}
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
