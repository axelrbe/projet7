const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

exports.createPost = (req, res, next) => {
  let imagePost = "";
  if (req.file) {
    imagePost = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  Post.create({
    title: req.body.title,
    description: req.body.description,
  })
    .then(() => {
      res.status(201).json({ message: "post enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.readAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "likes",
        "createdAt",
        "updatedAt",
      ],
    });
    return res.status(200).json({ data: posts });
  } catch (err) {
    return res.status(501).json({ err });
  }
};

exports.findOne = (req, res) => {};

exports.update = (req, res) => {};

exports.deletePost = (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => {
            res.status(200).json({ message: "Post supprimé !" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likePost = async (req, res, next) => {
  const userId = req.body.userId;
  const postId = req.params.id;
  const PostLikes = db.postLikes;

  let message = "";
  let action = "";
  const post = await Post.findOne({ where: { id: postId } });
  let likes = post.likes;
  const allreadyLiked = await PostLikes.findOne({ where: { userId, postId } });
  if (allreadyLiked) {
    likes--;
    PostLikes.destroy({ where: { userId, postId } });
    action = "deleted";
    message = "Like supprimé";
  } else {
    likes++;
    PostLikes.create({
      postId,
      userId,
    });
    action = "added";
    message = "Like Ajouté";
  }
  console.log(likes);
  await Post.update(
    { likes },
    {
      where: {
        id: postId,
      },
    }
  );
  return res.status(200).json({ message, action });
};
