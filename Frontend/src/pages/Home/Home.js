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

  useEffect((id) => {
    axios
      .delete(`http://localhost:3001/api/posts/`, { params: { id: { id } } })
      .then((res) => res.json())
      .catch((err) => err.response.data);
  });

  const handleDelete = (id) => {
    const newList = posts.filter((item) => item.id !== id);
    setPosts(newList);
  };

  return (
    <div>
      <Header />
      <div className="Home">
        <div className="title_container">
          <h1 className="title">Derniers posts publiés !</h1>
        </div>
        <ul className="nav_ul">
          {posts.map((post) => {
            return (
              <li key={post.id} className="nav_li">
                <span className="post">
                  {post.title} : {post.description}
                </span>
                <div className="icons_container">
                  <LikeDislike />
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
