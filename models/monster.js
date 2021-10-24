const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

ImageSchema.virtual('thumbnail2').get(function () {
    return this.url.replace('/upload', '/upload/w_660');
});

const MonsterSchema = new Schema({
    name: String,
    price: Number,
    img: [ImageSchema]
    ,
    discount: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

MonsterSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Monster', MonsterSchema);