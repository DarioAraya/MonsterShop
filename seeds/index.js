const mongoose = require('mongoose');
const Product = require('./product');
const Monster = require('../models/monster');


mongoose.connect('mongodb://localhost:27017/monster-shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async() => {
 await Monster.deleteMany({});
 for(let i = 0; i<Product.length;i++){
    const mon = new Monster({name: `${Product[i].name}`, price:`${Product[i].price}`, img:`${Product[i].img}`, discount:`${Product[i].discount}`})
    await mon.save();
 }
 

}

seedDB();