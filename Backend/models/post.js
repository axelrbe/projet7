module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.TEXT },
    imageUrl: { type: Sequelize.STRING },
    likes: { type: Sequelize.INTEGER, defaultValue: 0 },
  });
  return Post;
};
