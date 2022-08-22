import "./Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
// import { useState } from "react";

function Signup() {
  // const [posts, setPosts] = useState([]);

  return (
    <div>
      <div className="Signup">
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
            console.log(user);
            axios
              .post("http://localhost:3001/api/auth/signup", user)
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="pseudo"
                onChange={handleChange}
                value={values.pseudo}
              />
              {errors.pseudo}
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

export default Signup;
