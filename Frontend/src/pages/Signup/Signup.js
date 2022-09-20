import "./Signup.css";
import axios from "axios";
import { Formik } from "formik";
import LoginSignup from "../../components/LoginSignup/LoginSignup";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  return (
    <div>
      <LoginSignup />
      <div className="Signup">
        <div className="title__container">
          <h1 className="title">Connectez-vous !</h1>
        </div>
        <Formik
          initialValues={{ email: "", password: "", pseudo: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Champ requis";
            } else if (!values.password) {
              errors.password = "Champ requis";
            } else if (!values.pseudo) {
              errors.pseudo = "Champ requis";
            }
            return errors;
          }}
          onSubmit={(user, { setSubmitting }) => {
            axios
              .post("http://localhost:3001/api/auth/signup", user)
              .then(function (response) {
                console.log(response);
                alert("Votre compte a bien été créé !");
                navigate("/accueil");
                setSubmitting(false);
              })
              .catch(function (error) {
                console.log(error);
                setSubmitting(false);
              });
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form className="form__user" onSubmit={handleSubmit}>
              <input
                className="user__input"
                placeholder="Créer votre pseudo ici..."
                type="text"
                name="pseudo"
                onChange={handleChange}
                value={values.pseudo}
              />
              <span className="errors">{errors.pseudo}</span>
              <input
                className="user__input"
                placeholder="Renseigner votre email ici..."
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              <span className="errors">{errors.email}</span>
              <input
                className="user__input"
                placeholder="Renseigner votre mot de passe ici..."
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              <span className="errors">{errors.password}</span>
              <button className="btn" type="submit" disabled={isSubmitting}>
                S'inscrire
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
