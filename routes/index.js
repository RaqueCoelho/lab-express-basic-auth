'use strict';
const express = require('express');
const router = express.Router();

const routerGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/mainprivate', routerGuard, (req, res, next) => {
  res.render('mainprivate');
});

module.exports = router;
