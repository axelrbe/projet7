import axios from "axios";
import "./Delete.css";
import JwtService from "../../services/JwtService";

const Delete = ({ postId, index, onPostDeleted }) => {
  const handleDelete = () => {
    axios({
      method: "post",
      url: `http://localhost:3001/api/posts/${postId}`,
      headers: { Authorization: "Bearer " + JwtService.getToken() },
    })
      .then(() => {
        alert("Votre post à bien été supprimé !");
        onPostDeleted(index);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button className="delete_btn" onClick={handleDelete}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default Delete;
