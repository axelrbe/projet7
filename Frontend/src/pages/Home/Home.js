import Header from "../../components/Header/Header";
import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import LikeDislike from "../../components/LikeDislike/LikeDislike";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/posts/readAll")
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.data);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/posts/`, { params: { id: id } })
      .then((res) => console.log(res.data))
      .catch((err) => err.response.data);

    const newList = posts.filter((item) => item.id !== id);
    setPosts(newList);
  };

  return (
    <div>
      <Header />
      <div className="Home">
        <div className="title_container">
          <h1 className="title">Liste des posts !</h1>
        </div>
        <ul className="nav_ul">
          {posts.map((post) => {
            return (
              <li key={post.id} className="nav_li">
                <p className="post">
                  {post.title} : {post.description}
                </p>
                <div className="icons_container">
                  <LikeDislike postId={post.id} _likes={post.likes} />
                  <button
                    className="delete_btn"
                    onClick={() => handleDelete(post.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Home;
