var auth = require('./auth'),
    users = require('../controllers/users'),
    recipes = require('../controllers/recipes'),
    ingredients = require('../controllers/ingredients'),
    equipment = require('../controllers/equipment'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Recipe = mongoose.model('Recipe'),
    Ingredient = mongoose.model('Ingredient'),
    Equipment = mongoose.model('Equipment');

module.exports = function(app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);
    app.delete('/api/users/:id', auth.requiresRole('admin'), function(req, res) {
        var status = users.deleteUser(req.params.id);
        res.send();
    });

    app.get('/api/recipes', recipes.getRecipes);
    app.post('/api/recipes', auth.requiresRole('admin'), recipes.createRecipe);
    app.put('/api/recipes', recipes.updateRecipe);
    app.delete('/api/recipes/:id', auth.requiresRole('admin'), function(req, res) {
        var status = recipes.deleteRecipe(req.params.id);
        res.send();
    });

    app.get('/api/ingredients', ingredients.getIngredients);
    app.post('/api/ingredients', auth.requiresRole('admin'), ingredients.createIngredient);
    app.put('/api/ingredients', ingredients.updateIngredient);
    app.delete('/api/ingredients/:id', auth.requiresRole('admin'), function(req, res) {
        var status = ingredients.deleteIngredient(req.params.id);
        res.send();
    });

    app.get('/api/equipment', equipment.getEquipment);
    app.post('/api/equipment', auth.requiresRole('admin'), equipment.createEquipment);
    app.put('/api/equipment', equipment.updateEquipment);
    app.delete('/api/equipment/:id', auth.requiresRole('admin'), function(req, res) {
        var status = equipment.deleteEquipment(req.params.id);
        res.send();
    });

    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/viewrecipe', recipes.getRecipe);

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