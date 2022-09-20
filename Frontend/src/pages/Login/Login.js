import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import LoginSignup from "../../components/LoginSignup/LoginSignup";
import JwtService from "../../services/JwtService";

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <LoginSignup />
      <div className="Login">
        <div className="title__container">
          <h1 className="title">Connectez-vous !</h1>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Champ requis";
            } else if (!values.password) {
              errors.password = "Champ requis";
            }
            return errors;
          }}
          onSubmit={(user, { setSubmitting }) => {
            axios
              .post("http://localhost:3001/api/auth/login", user)
              .then(function (response) {
                JwtService.setToken(response.data.token);
                navigate("/accueil");
                setSubmitting(false);
              })
              .catch(function (error) {
                alert("Adresse email ou mot de passe incorrect !");
                console.log(error);
                setSubmitting(false);
              });
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form className="form__user" onSubmit={handleSubmit}>
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
                Se connecter
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
