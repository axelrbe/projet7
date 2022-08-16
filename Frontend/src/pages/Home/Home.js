import Header from "../../components/Header/Header";
import "./Home.css";
import { useState, useEffect } from "react";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/posts/readAll")
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.data);
      });
  }, []);

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
                {post.title}
                <i className="fa-regular fa-thumbs-up"></i>
                <i className="fa-regular fa-thumbs-down"></i>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Home;
