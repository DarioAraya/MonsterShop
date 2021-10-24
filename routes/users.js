const express = require('express');
const router = express.Router();
const user = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');

router.route('/register')
    .get(user.renderRegister)
    .post(catchAsync(user.newUser));

router.route('/login')
    .get(user.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.authenticate);

router.get('/logout', user.logout);

module.exports = router;