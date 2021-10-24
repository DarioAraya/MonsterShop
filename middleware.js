const { monsterSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Monster = require('./models/monster');
const Review = require('./models/review.js');

module.exports.isLoggedIn = (req,res,next) =>{
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Primero debes iniciar sesión');
        return res.redirect('/login');
    }
    next();
}

// **********************************
// middleware - para mostrar errores
// **********************************
module.exports.validateMonster = (req, res, next) => {
    const { error } = monsterSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }

}


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }

}

module.exports.isAdmin = async (req, res, next) => {
    const { id } = req.params;
    if (req.user.admin !== true) {
        req.flash('error', 'Necesitas permisos para realizar esta acción.');
        if (!id) {
            res.redirect(`/monsters/`)
        } else {
            res.redirect(`/monsters/${id}`)
        }

    } else {
        next();
    }

}

module.exports.isAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
     req.flash('error','Necesitas permisos para realizar esta acción.')
     return res.redirect(`/monsters/${id}`);
    }
    next();
}