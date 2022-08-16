import Header from "../../components/Header/Header";
import "./PostCreate.css";

function PostCreate() {
  return (
    <div className="PostCreate">
      <Header />
      <h1>Création d'article</h1>
      <form>
        <label>
          <input type="text" name="name" placeholder="Ecrivez ici !" />
        </label>
        <input type="submit" value="Ajouter" />
      </form>
    </div>
  );
}

export default PostCreate;
