const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = {
        email: req.body.email,
        password: hash,
        pseudo: req.body.pseudo,
      };
      User.create(newUser)
        .then((data) => {
          const user = data.dataValues;
          return res.status(201).json({
            message: "Utilisateur créé !",
            token: jwt.sign(
              {
                userId: user.id,
                isAdmin: user.isAdmin,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      console.log(error, req.body);
      return res.status(500).json({ error });
    });
};

exports.login = (req, res, next) => {
  User.findAll({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user[0]) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user[0].dataValues.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            token: jwt.sign(
              {
                userId: user[0].dataValues.id,
                isAdmin: user[0].dataValues.isAdmin,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => {
          return res.status(501).json({ error });
        });
    })
    .catch((error) => {
      return res.status(502).json({ error });
    });
};

exports.getInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.auth.userId,
      },
      attributes: ["pseudo", "email", "password"],
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(502).json({ error });
  }
};

exports.modifyInfo = async (req, res, next) => {
  const userId = req.auth.userId;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  const userModified = {};
  if (req.body.email) {
    userModified.email = req.body.email;
  } else if (req.body.pseudo) {
    userModified.pseudo = req.body.pseudo;
  } else if (req.body.password) {
    userModified.password = req.body.password;
  } else {
    return res.status(403).json({ error: "Aucune informations à modifier" });
  }

  await user
    .update(userModified)
    .then(() => res.status(200).json({ message: "Données modifié!" }))
    .catch((error) => res.status(401).json({ error }));
};
