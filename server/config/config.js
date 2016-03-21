var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
    development: {
        db: 'mongodb://localhost/mftm',
        rootPath: rootPath,
        port: process.env.PORT || 3000
    },
    production: {
        db: 'mongodb://admin:admin@ds021289.mlab.com:21289/mftm',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};
