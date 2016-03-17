var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('mtfm db opened');
    });

    var userSchema = mongoose.Schema({
        firstname: String,
        lastname: String,
        username: String,
        salt: String,
        hashed_password: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPassword(this.salt, passwordToMatch) === this.hashed_password;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if(collection.length == 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPassword(salt, 'admin');
            User.create({
                firstname: 'admin',
                lastname: 'admin',
                username: 'admin',
                salt: salt,
                hashed_password: hash,
                roles:['admin']
            });
            salt = createSalt();
            hash = hashPassword(salt, 'test');
            User.create({
                firstname: 'test',
                lastname: 'test',
                username: 'test',
                salt: salt,
                hashed_password: hash,
                roles:[]
            });
        }
    });

    var recipeSchema = mongoose.Schema({
        name: String,
        description: String,
        difficulty: String,
        equipment: [String],
        ingredients: [String],
        season: String,
        meal_type: String
    });

    var Recipe = mongoose.model('Recipe', recipeSchema);

    Recipe.find({}).exec(function(err, collection) {
        if(collection.length == 0) {
            Recipe.create({
                name: 'Cooked Mongoose',
                description: 'Deliciousness served to you',
                difficulty: 'Medium',
                equipment: ['Oven', 'Pan'],
                ingredients: ['Mongoose', 'Salt'],
                season: 'Winter',
                meal_type: 'Dinner'
            });
        }
    });
};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPassword(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}