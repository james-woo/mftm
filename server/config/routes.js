var auth = require('./auth'),
    users = require('../controllers/users'),
    recipes = require('../controllers/recipes'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Recipe = mongoose.model('Recipe');

module.exports = function(app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/recipes', recipes.getRecipes);
    app.post('/api/recipes', recipes.createRecipe);
    app.put('/api/recipes', recipes.updateRecipe);

    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);
    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });

    app.all('/api/*', function(req, res) {
        res.sendStatus(404);
    });

    app.get('*', function(req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });

};