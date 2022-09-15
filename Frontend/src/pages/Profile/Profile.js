import Header from "../../components/Header/Header";
import "./Profile.css";
import UserModif from "../../components/UserModif/UserModif";
import { useEffect, useState } from "react";
import axios from "axios";
import JwtService from "../../services/JwtService";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/api/auth/getInfo",
      headers: { Authorization: "Bearer " + JwtService.getToken() },
    }).then((res) => {
      setUser(res.data.user);
    });
  }, []);

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <div>
      <Header />
      <UserModif
        email={user.email}
        pseudo={user.pseudo}
        password={user.password}
      />
      <div className="logout__container">
        <button className="logout__btn" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
