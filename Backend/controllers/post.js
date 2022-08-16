const { posts } = require("../models");
const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.createPost = (req, res, next) => {
  const post = new Post({
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDislike: [],
  });

  post
    .save()
    .then(() => {
      res.status(201).json({ message: "post enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
// Retrieve all Tutorials from the database.
exports.readAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title", "description", "createdAt", "updatedAt"],
    });
    return res.status(200).json({ data: posts });
  } catch (err) {
    return res.status(501).json({ err });
  }
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};
