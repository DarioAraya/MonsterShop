const User = require('../models/user');

// **********************************
// muestra un formulario de registro
// **********************************
module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

// **********************************
// Crear al nuevo usuario
// **********************************
module.exports.newUser = async (req, res) => {
    try {
        
        const { email, username, password } = req.body;
        const user = new User({ email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Bienvenido a Monster Shop, ${username}!`);
            res.redirect('/monsters');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }

}

// **********************************
// muestra un formulario de inicio de sesion
// **********************************
module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

// **********************************
// Autenticar y redirigir
// **********************************
module.exports.authenticate = (req, res) => {
    req.flash('success', `Bienvenido de nuevo!`);
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

// **********************************
// cerrar sesion
// **********************************
module.exports.logout = (req, res) => {
    req.logOut();
    res.redirect('/');
}