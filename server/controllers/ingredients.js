var Ingredient = require('mongoose').model('Ingredient'),
    ObjectId = require('mongoose').Types.ObjectId;

exports.getIngredients = function(req, res) {
    Ingredient.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.createIngredient = function(req, res) {
    var ingredientData = req.body;

    Ingredient.create(ingredientData, function(err,ingredient) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Ingredient');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(ingredient);
    })
};

exports.updateIngredient = function(req, res) {
    var ingredientUpdates = req.body;

    if(req.ingredients._id != ingredientUpdates._id) {
        res.status(403);
        return res.end();
    }

    req.ingredients.name = ingredientUpdates.name;
    req.ingredients.local = ingredientUpdates.local;

    req.ingredients.save(function(err) {
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(req.ingredients);
    });
};
