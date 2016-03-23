var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

// keep alive
setInterval(function(){
    http.get("http://mftm.herokuapp.com");
}, 900000);

app.listen(config.port);
console.log('Listening on port ' + config.port);