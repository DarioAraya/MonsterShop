const express = require('express');
const router = express.Router({ mergeParams: true });
const review = require('../controllers/reviews');

const Review = require('../models/review');
const Monster = require('../models/monster');
const { isLoggedIn, isAdmin, validateReview, isAuthor } = require('../middleware');


const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');



router.post('/', isLoggedIn,validateReview, isLoggedIn, catchAsync(review.newComment))


router.delete('/:reviewId', isLoggedIn ,isAuthor,catchAsync(review.deleteComment))

module.exports = router;