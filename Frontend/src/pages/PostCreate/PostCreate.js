import Header from "../../components/Header/Header";
import "./PostCreate.css";
import PostForm from "../../components/PostForm/PostForm";

function PostCreate() {
  return (
    <div>
      <Header />
      <div className="PostCreate">
        <div className="title__container">
          <h1 className="title">Créez votre propre post !</h1>
        </div>
        <PostForm postInfo={{}} />
      </div>
    </div>
  );
}

export default PostCreate;
