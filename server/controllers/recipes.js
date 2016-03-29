var Recipe = require('mongoose').model('Recipe'),
    ObjectId = require('mongoose').Types.ObjectId;

exports.getRecipes = function(req, res) {
    Recipe.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.getRecipe = function(req, res) {
    Recipe.findOne({_id: ObjectId(req.body._id)}, function (err, recipe) {
        if (err) return err;
        res.send(recipe);
    });
};

exports.createRecipe = function(req, res) {
    var recipeData = req.body;

    Recipe.create(recipeData, function(err,recipe) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Recipe');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(recipe);
    })
};

exports.deleteRecipe = function(id) {
    Recipe.findOne({_id: id}, function (err, recipe) {
        if(err){
            return err;
        } else{
            if(!recipe){
                // the given user does not exist
                return 404;
            } else{
                recipe.remove(err);
                return 200;
            }
        }
    });
};

exports.updateRecipe = function(req, res) {
    var recipeUpdates = req.body;

    if(req.recipes._id != recipeUpdates._id) {
        res.status(403);
        return res.end();
    }

    req.recipes.name = recipeUpdates.name;
    req.recipes.summary = recipeUpdates.summary;
    req.recipes.description = recipeUpdates.description;
    req.recipes.difficulty = recipeUpdates.difficulty;
    req.recipes.ingredients = recipeUpdates.ingredients;
    req.recipes.equipment = recipeUpdates.equipment;
    req.recipes.meal_type = recipeUpdates.meal_type;
    req.recipes.img_url = recipeUpdates.meal_type;

    req.recipes.save(function(err) {
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(req.recipes);
    });
};
