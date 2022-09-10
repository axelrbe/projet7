import { Formik } from "formik";
import axios from "axios";
import Thumb from "../Thumb/Thumb";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostForm = ({ postInfo }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
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
          formData.append("image", newPost.file);
          let url = "";
          let notif = "";
          if (!id) {
            url = "http://localhost:3001/api/posts/";
            notif = "Votre post a bien été ajouté !";
          } else {
            url = `http://localhost:3001/api/posts/update/${id}`;
            notif = "Votre post a bien été modifié !";
          }
          axios
            .post(url, formData)
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
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Ecrivez un titre ici..."
              type="text"
              name="title"
              onChange={handleChange}
              value={values.title}
            />
            {errors.title}
            <textarea
              className="textarea"
              placeholder="Ecrivez votre commentaire ici..."
              name="description"
              onChange={handleChange}
              value={values.description}
            ></textarea>
            {errors.description}
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
