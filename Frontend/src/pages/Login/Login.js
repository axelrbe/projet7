import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import LoginSignup from "../../components/LoginSignup/LoginSignup";

// import { useState } from "react";

function Login() {
  // const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  return (
    <div>
      <LoginSignup />
      <div className="Login">
        <div className="title_container">
          <h1>Connectez-vous !</h1>
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
            console.log(user);
            axios
              .post("http://localhost:3001/api/auth/login", user)
              .then(function (response) {
                console.log(response);
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
            <form className="form" onSubmit={handleSubmit}>
              <input
                className="input"
                placeholder="Renseigner votre email ici..."
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              {errors.email}
              <input
                className="input"
                placeholder="Renseigner votre mot de passe ici..."
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              {errors.password}
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
