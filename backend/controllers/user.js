const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    user = new User({
      email: req.body.email,
      password: hash,
    });
    user.save().then(createdUser => {
      res.status(201).json({
        message: "User created",
        result: createdUser
      })
    }).catch(err => {
      res.status(500).json({
        message: "Invalid authentication credentials!"
      })
    });
  })
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Auth failed (email)"
      })
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password) // return a Promise
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth failed (password)"
      })
    }
    // const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, "secret_long_string", { expiresIn: '1h' });
    const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, process.env.JWT_KEY, { expiresIn: '1h' });
    res.status(200).json({
      token: token,
      expiresIn: '3600',
      userId: fetchedUser._id
    });
  }).catch(err => {
    return res.status(401).json({
      message: "Invalid authentication credentials!"
    })
  })
}
