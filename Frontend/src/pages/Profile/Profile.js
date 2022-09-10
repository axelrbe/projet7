import Header from "../../components/Header/Header";
import "./Profile.css";

const Profile = () => {
  return (
    <div>
      <Header />
      <div className="infos__container">
        <div className="email__container">
          <p className="email">email: </p>
          <i className="fa-solid fa-pen-to-square modif__icon" />
        </div>
        <div className="pseudo__container">
          <p className="pseudo">pseudo: </p>
          <i className="fa-solid fa-pen-to-square modif__icon" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
