const express = require('express');
const router = express.Router();
const monster = require('../controllers/monsters');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAdmin, validateMonster } = require('../middleware');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review');
const Monster = require('../models/monster');


router.route('/')
    .get(catchAsync(monster.index))
    .post(isLoggedIn, upload.array('image') ,validateMonster, isAdmin, catchAsync(monster.createNewProduct));


router.get('/new', isLoggedIn, isAdmin, monster.renderNewForm);
router.get('/listar', isLoggedIn, isAdmin, catchAsync(monster.listarProducts));

router.route('/:id')
    .get(catchAsync(monster.showProducts))
    .put(isLoggedIn, isAdmin,upload.array('image'),validateMonster, catchAsync(monster.updateProduct))
    .delete(isLoggedIn, isAdmin, catchAsync(monster.deleteProduct));


router.get('/:id/edit', isLoggedIn, isAdmin, catchAsync(monster.editProducts));


module.exports = router;