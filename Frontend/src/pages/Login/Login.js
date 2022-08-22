import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";

// import { useState } from "react";

function Login() {
  // const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  return (
    <div>
      <div className="Login">
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
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              {errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              {errors.password}
              <button type="submit" disabled={isSubmitting}>
                Se connecter
              </button>
            </form>
          )}
        </Formik>
        <Link to="/inscription" className="link">
          S'inscrire
        </Link>
      </div>
    </div>
  );
}

export default Login;
