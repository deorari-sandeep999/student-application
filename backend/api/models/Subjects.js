'use strict';

var mongoose = require('mongoose');
var Subjects = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    },
    subject: {
        type: String,
        required: true,
        default: ''
    },
    marks: {
        type: Number,
        required: true,
        default: ''
    }
}, {
    timestamps: true
});

var Subjects = mongoose.model('Subjects', Subjects);
module.exports = Subjects;