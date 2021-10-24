const Review = require('../models/review');
const Monster = require('../models/monster');

// **********************************
// Post Review - registra una valoracion de producto
// **********************************
module.exports.newComment = async (req, res) => {
    const monster = await Monster.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    monster.reviews.push(review);
    await review.save();
    await monster.save();
    req.flash('success', 'Se añadio tu reseña!');
    res.redirect(`/monsters/${monster._id}`);
}

// **********************************
// DELETE Review - elimina una review del producto
// **********************************
module.exports.deleteComment = async (req, res) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(id);
    await Monster.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Reseña eliminada!');
    res.redirect(`/monsters/${id}`);
}