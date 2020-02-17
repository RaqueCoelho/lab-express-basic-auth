'use strict';
const express = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs');

const User = require('../models/user');

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  let userId;
  User.findOne({ username })
    .then(userRouter => {
      if (userRouter) {
        userId = userRouter._id;
        return bcryptjs.compare(password, userRouter.passwordHash);
      } else {
        return Promise.reject(new Error('Username does not exist.'));
      }
    })
    .then(response => {
      if (response) {
        req.session.userRouter = userId;
        res.redirect('/');
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  bcryptjs
    .hash(password, 10)
    .then(hashPlusSalt => {
      return User.create({
        username,
        passwordHash: hashPlusSalt
      });
    })
    .then(user => {
      req.session.userId = user._id;
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
