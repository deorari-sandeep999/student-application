'use strict';

var mongoose = require('mongoose');
var Students = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        default: ''
    },
    last_name: {
        type: String,
        required: true,
        default: ''
    },
    class: {
        type: Number,
        required: true,
        default: ''
    }
}, {
    timestamps: true
});

var Students = mongoose.model('Students', Students);
module.exports = Students;