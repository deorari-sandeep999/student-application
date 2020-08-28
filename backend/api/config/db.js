'use strict';

var mongoose = require('mongoose');
require('../models/Students');
require('../models/Subjects');

var Config = require('./config').get('local');
// var options = {
//     user: Config.DATABASE.username,
//     pass: Config.DATABASE.password
// };
mongoose.connect(Config.DATABASE.host + Config.DATABASE.dbname, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection failed"));
db.once('open', function () {
    console.log("Database conencted successfully and project Started!", Config.DATABASE.host + Config.DATABASE.dbname);
});

mongoose.set('debug', false);
