const Monster = require('../models/monster');
const {cloudinary} = require('../cloudinary');


// **********************************s
// INDEX - mostrar multiples productos
// **********************************

module.exports.index = async (req, res) => {
    const monsters = await Monster.find({});
    res.render('monsters/index', { monsters })
}

// **********************************
// NEW - mostrar un formulario
// **********************************
module.exports.renderNewForm = (req, res) => {

    res.render('monsters/new');
}

// **********************************
// CREATE - crear un nuevo producto
// **********************************
module.exports.createNewProduct = async (req, res, next) => {
    const monster = new Monster(req.body.monster);
    monster.img = req.files.map(f => ({ url: f.path, filename: f.filename }))
    await monster.save();
    console.log(monster);
    req.flash('success', 'Se añadio un nuevo producto!');
    res.redirect(`monsters/${monster.id}`);
}

// **********************************
// Listar - mostrar productos permitiendolos editar
// **********************************
//module.exports.listarProducts = async (req, res) => {
//    const monsters = await Monster.find({});
//    res.render('monsters/listar', { monsters });
//}


// **********************************
// SHOW - muestra un producto especifico
// **********************************
module.exports.showProducts = async (req, res,) => {
    const monster = await Monster.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    });
    if (!monster) {
        req.flash('error', 'No se pudo encontrar ese producto!');
        res.redirect('/monsters');
    }
    res.render('monsters/details', { monster });
}

// *******************************************
// EDIT - muestra un formulario de edicion de producto
// *******************************************
module.exports.editProducts = async (req, res) => {
    const monster = await Monster.findById(req.params.id)
    if (!monster) {
        req.flash('error', 'No se pudo encontrar ese producto!');
        res.redirect('/monsters');
    }
    res.render('monsters/edit', { monster });
}

// *******************************************
// PUT - modifica un producto
// *******************************************
module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const monster = await Monster.findByIdAndUpdate(id, { ...req.body.monster });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    monster.img.push(...imgs);
    await monster.save()
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await monster.updateOne({ $pull: { img: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Se modifico el producto!');
    res.redirect(`/monsters/${monster._id}`);
}

// *******************************************
// DELETE - Elimina un producto
// *******************************************
module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Monster.findByIdAndDelete(id);
    req.flash('success', 'Se elimino el producto!');
    res.redirect('/monsters');
}