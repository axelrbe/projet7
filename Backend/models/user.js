module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    pseudo: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    },
  });
  return User;
};
