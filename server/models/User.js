var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstname: {type:String, required:'{PATH} is required!'},
    lastname: {type:String, required:'{PATH} is required!'},
    username: {
        type: String,
        required:'{PATH} is required!',
        unique:true
    },
    salt: {type:String, required:'{PATH} is required!'},
    hashed_password: {type:String, required:'{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashed_password;
    },
    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'admin');
            User.create({
                firstname: 'admin',
                lastname: 'admin',
                username: 'admin',
                salt: salt,
                hashed_password: hash,
                roles: ['admin']
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'test');
            User.create({
                firstname: 'test',
                lastname: 'test',
                username: 'test',
                salt: salt,
                hashed_password: hash,
                roles: []
            });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;