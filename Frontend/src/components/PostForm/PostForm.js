import { Formik } from "formik";
import axios from "axios";
import Thumb from "../Thumb/Thumb";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import JwtService from "../../services/JwtService";
import "./PostForm.css";

// Form gère la création et la modification
const PostForm = ({ postInfo }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="form__container">
      <Formik
        initialValues={{
          description: postInfo.description || "",
          title: postInfo.title || "",
        }}
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
          let formData = new FormData();
          formData.append("title", newPost.title);
          formData.append("description", newPost.description);
          if (newPost.file) {
            formData.append("image", newPost.file);
          }
          let url = "";
          let notif = "";
          if (!id) {
            url = "http://localhost:3001/api/posts/";
            notif = "Votre post a bien été ajouté !";
            formData.append("userId", JwtService.getTokenDecrypted().userId);
          } else {
            url = `http://localhost:3001/api/posts/update/${id}`;
            notif = "Votre post a bien été modifié !";
          }
          axios
            .post(url, formData, {
              headers: { Authorization: "Bearer " + JwtService.getToken() },
            })
            .then(function (response) {
              alert(notif);
              navigate("/accueil");
              newPost.title = "";
              newPost.description = "";
              newPost.file = "";
              postInfo.imageUrl = "";
              console.log(response);
              setSubmitting(false);
            })
            .catch(function (error) {
              console.log(error);
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form className="form__post" onSubmit={handleSubmit}>
            <input
              className="post__input"
              placeholder="Ecrivez un titre ici..."
              type="text"
              name="title"
              onChange={handleChange}
              value={values.title}
            />
            <span className="errors">{errors.title}</span>
            <textarea
              className="post__textarea"
              placeholder="Ecrivez votre commentaire ici..."
              name="description"
              maxLength="350"
              onChange={handleChange}
              value={values.description}
            ></textarea>
            <span className="errors">{errors.description}</span>
            <label htmlFor="file" className="post__label">
              Ajoutez une image...
            </label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0]);
              }}
              className="post__img"
            />
            {values.file ? (
              <Thumb file={values.file} />
            ) : postInfo.imageUrl ? (
              <Thumb imageUrl={postInfo.imageUrl} />
            ) : (
              ""
            )}
            <button className="btn" type="submit" disabled={isSubmitting}>
              Envoyer
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PostForm;
