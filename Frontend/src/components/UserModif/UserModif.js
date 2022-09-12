import { useState } from "react";
import "./UserModif.css";
import JwtService from "../../services/JwtService";
import axios from "axios";
import { Formik } from "formik";

const UserModif = ({ email, pseudo }) => {
  const [firstInput, setFirstInput] = useState(false);
  const [secondInput, setSecondInput] = useState(false);

  const showFirstInput = () => {
    firstInput ? setFirstInput(false) : setFirstInput(true);
  };

  const showSecondInput = () => {
    secondInput ? setSecondInput(false) : setSecondInput(true);
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
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Champ requis";
            }
            return errors;
          }}
          onSubmit={(newEmail, { setSubmitting }) => {
            axios({
              method: "post",
              url: "http://localhost:3001/api/auth/modifyInfo/",
              data: newEmail,
              headers: { Authorization: "Bearer " + JwtService.getToken() },
            })
              .then(function (response) {
                console.log(response);
                setSubmitting(false);
              })
              .catch(function (error) {
                console.log(error);
                setSubmitting(false);
              });
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
              {errors.email}
              <button
                type="submit"
                className="submit__btn"
                disabled={isSubmitting}
              >
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
          }}
          validate={(values) => {
            const errors = {};
            if (!values.pseudo) {
              errors.pseudo = "Champ requis";
            }
            return errors;
          }}
          onSubmit={(newPseudo, { setSubmitting }) => {
            const userId = JwtService.getTokenDecrypted().userId;
            let formPseudo = new FormData();
            formPseudo.append("email", newPseudo.pseudo);
            axios
              .post("http://localhost:3001/api/auth/modifyInfo", { userId })
              .then(function (response) {
                console.log(response);
                setSubmitting(false);
              })
              .catch(function (error) {
                console.log(error);
                setSubmitting(false);
              });
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form
              className={`modify__area ${secondInput ? "input__active" : ""}`}
              onSubmit={handleSubmit}
            >
              <input
                className="input__form"
                placeholder="Modifiez votre email..."
                name="pseudo"
                onChange={handleChange}
                value={values.pseudo}
              />
              {errors.pseudo}
              <button
                type="submit"
                className="submit__btn"
                disabled={isSubmitting}
              >
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
