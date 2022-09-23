const dbConfig = require("../db-config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.js")(sequelize, Sequelize);
db.posts = require("./post.js")(sequelize, Sequelize);
db.postLikes = require("./postLike.js")(sequelize, Sequelize);

db.posts.belongsTo(db.users, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.postLikes.belongsTo(db.posts, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.postLikes.belongsTo(db.users, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = db;
