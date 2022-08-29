import Header from "../../components/Header/Header";
import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/posts/readAll")
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.data);
      });
  }, []);

  const handleRemove = (id) => {
    axios.delete(`http://localhost:3001/api/posts/${id}`).then(() => {
      const newList = posts.filter((item) => item.id !== id);
      setPosts(newList);
    });
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
                {post.title} : {post.description}
                <div className="icons_container">
                  <i className="fa-regular fa-thumbs-up"></i>
                  <i className="fa-regular fa-thumbs-down"></i>
                  <button
                    className="delete_btn"
                    onClick={() => handleRemove(post.id)}
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
