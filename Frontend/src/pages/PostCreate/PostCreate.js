import CreatePost from "../../components/Header/CreatePost/CreatePost";
import Header from "../../components/Header/Header";
import "./PostCreate.css";

function PostCreate() {
  return (
    <div>
      <Header />
      <div className="PostCreate">
        <div className="title_container">
          <h1 className="title">Créez votre propre post !</h1>
        </div>
        <form className="form">
          <label>
            <textarea cols="150" rows="5" className="input" />
          </label>
          <input type="submit" value="+" className="btn" onClick={CreatePost} />
        </form>
      </div>
    </div>
  );
}

export default PostCreate;
