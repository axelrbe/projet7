import "./UserModif.css";

const UserModif = ({ email, pseudo }) => {
  return (
    <div>
      <div className="infos__container">
        <div className="email__container">
          <p className="email">email: {email}</p>
          <button className="usermodify__icon">
            <i className="fa-solid fa-pen-to-square" />
          </button>
        </div>
        <input
          className="modify__area"
          placeholder="Modifiez votre email..."
        ></input>
        <div className="pseudo__container">
          <p className="pseudo">pseudo: {pseudo}</p>
          <button className="usermodify__icon">
            <i className="fa-solid fa-pen-to-square" />
          </button>
        </div>
        <input
          className="modify__area"
          placeholder="Modifiez votre pseudo..."
        ></input>
      </div>
    </div>
  );
};

export default UserModif;
