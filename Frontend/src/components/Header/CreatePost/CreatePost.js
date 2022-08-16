import { useEffect, useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/posts/createPost")
      .then((res) => setPosts(res.data));
  });

  return <div key={posts.id}>{posts}</div>;
};

export default CreatePost;
