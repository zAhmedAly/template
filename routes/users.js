const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Something went wrong: Failed to register user',
        result: {}
      });
    } else {
      res.json({
        success: true,
        msg: 'You are now registered and can now login',
        result: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          token: null
        }
      });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found', result: {} });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(
          { userId: user._id, userEmail: user.email },
          config.secret,
          {
            expiresIn: 1 * 60 * 60 // 1h token validation
          }
        );
        res.json({
          success: true,
          msg: 'You are now logged in',
          result: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: 'JWT ' + token
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password', result: {} });
      }
    });
  });
});

// Profile
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    //console.log(req.user);
    res.json({
      success: true,
      msg: 'User profile',
      result: {
        id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        token: null
      }
    });
  }
);

module.exports = router;
