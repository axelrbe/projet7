const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;
const fs = require("fs");

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
    imageUrl: imagePost,
    userId: req.body.userId,
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
        "imageUrl",
        "createdAt",
        "updatedAt",
        "userId",
      ],
    });
    return res.status(200).json({ data: posts });
  } catch (err) {
    return res.status(501).json({ err });
  }
};

exports.readOne = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({
      where: { id },
    });
    return res.status(200).json({ data: post });
  } catch (err) {
    return res.status(501).json({ err });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const postModified = {
    title: req.body.title,
    description: req.body.description,
  };
  if (req.file) {
    postModified.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  const post = await Post.findOne({
    where: { id },
  });
  if (post.userId != req.auth.userId && !req.auth.isAdmin) {
    res.status(401).json({ message: "Not authorized" });
  } else {
    if (req.file && post.imageUrl) {
      const imgUrl = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${imgUrl}`, () => {
        post
          .update(postModified)
          .then(() => res.status(200).json({ message: "Post modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      });
    } else {
      post
        .update(postModified)
        .then(() => res.status(200).json({ message: "Post modifié!" }))
        .catch((error) => res.status(401).json({ error }));
    }
  }
};

exports.deletePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findOne({
    where: { id },
  });
  if (post.userId != req.auth.userId && !req.auth.isAdmin) {
    res.status(401).json({ message: "Not authorized" });
  } else {
    const imgUrl = post.imageUrl.split("/images/")[1];
    fs.unlink(`images/${imgUrl}`, () => {
      post
        .destroy()
        .then(() => {
          res.status(200).json({ message: "Post supprimé !" });
        })
        .catch((error) => res.status(401).json({ error }));
    });
  }
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
