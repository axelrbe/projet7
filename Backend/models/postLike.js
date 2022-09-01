module.exports = (sequelize, Sequelize) => {
  const PostLike = sequelize.define("postLike", {});
  return PostLike;
};
