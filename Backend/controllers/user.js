const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
        pseudo: req.body.pseudo,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
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
              { userId: user[0].dataValues.id },
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
const test = (a, b, c, d) => {
  console.log("@@@@@@@@ 1 @@@@@@@@ - ", a);
  if (b) {
    console.log("@@@@@@@@ 2 @@@@@@@@ - ", b);
  }
  if (c) {
    console.log("@@@@@@@@ 3 @@@@@@@@ - ", b);
  }
  if (d) {
    console.log("@@@@@@@@ 4 @@@@@@@@ - ", b);
  }
};
