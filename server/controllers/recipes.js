var Recipe = require('mongoose').model('Recipe');

exports.getRecipes = function(req, res) {
    Recipe.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};