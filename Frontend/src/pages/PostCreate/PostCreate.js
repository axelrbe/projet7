import Header from "../../components/Header/Header";
import "./PostCreate.css";
import { Formik } from "formik";
import axios from "axios";

function PostCreate() {
  return (
    <div>
      <Header />
      <div className="PostCreate">
        <div className="title_container">
          <h1 className="title">Créez votre propre post !</h1>
        </div>
        <Formik
          initialValues={{ description: "", title: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.description) {
              errors.description = "Champ requis";
            } else if (!values.title) {
              errors.title = "Champ requis";
            }
            return errors;
          }}
          onSubmit={(newPost, { setSubmitting }) => {
            console.log(newPost);
            axios
              .post("http://localhost:3001/api/posts/", newPost)
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
                name="title"
                onChange={handleChange}
                value={values.title}
              />
              {errors.title}
              <textarea
                name="description"
                onChange={handleChange}
                value={values.description}
              ></textarea>
              {errors.description}
              <button type="submit" disabled={isSubmitting}>
                Envoyer
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PostCreate;
