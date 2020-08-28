'use strict';

var mongoose = require('mongoose'),
Student = mongoose.model('Students'),
Subject = mongoose.model('Subjects'),
Response = require('../helpers/response');

module.exports = {
    addStudent: addStudent,
    listStudent: listStudent,
    deleteSubject: deleteSubject,
    searchStudent: searchStudent,
    updateStudent: updateStudent,
    filterStudent: filterStudent
};

function addStudent(req, res) {
    async function addStudent() {
        if (!req.body.first_name && !req.body.last_name && !req.body.class ) {
            return res.json(Response(402, "failed", "Please fill all the required fields."));
        } else {
            var studentData = {
                "first_name": req.body.first_name,
                "last_name": req.body.last_name,
                "class": req.body.class
            };
            Student.insertMany(studentData)
            .then(result => {
                for (let i = 0; i < req.body.subjectDetails.length; i++) {
                    let subjectData = {
                        "student_id": result[0]._id,
                        "subject": req.body.subjectDetails[i].subject,
                        "marks": req.body.subjectDetails[i].marks
                    };
                    Subject.insertMany(subjectData)
                    .then(result1 => {
                    })
                }
                return res.json({
                    'code': 200,
                    'status': 'success',
                    "message": 'Student Added Successfully',
                    "data": result
                });
            })
        }
    }
    addStudent().then();
}

function listStudent(req, res) {
    async function listStudent() {
        Student.aggregate([
            { $lookup: { from: 'subjects', localField: "_id", foreignField: "student_id",as: "subjectsData" }},
            { $sort: {"first_name": 1}},
        ]).then(result => {
            return res.json({
                'code': 200,
                'status': 'success',
                "message": 'Student list get Successfully.',
                "data": result
            });
        });
    }
    listStudent().then();
}

function deleteSubject(req, res) {
    async function deleteSubject() {
        Subject.count({ student_id: req.body.student_id })
        .then(result => {
            if( result > 1) {
                try {
                    Subject.deleteOne({ _id: req.body.subject_id })
                    .then(result1 =>{
                        return res.json({
                            'code': 200,
                            'status': 'success',
                            "message": 'Subject Deleted Successfully.',
                            "data": result1
                        });
                    })
                } catch (err) {
                    return res.json(Response(402, "failed", "Something went wrong."));
                }
            } else if (result == 1) {
                try {
                    Subject.deleteOne({ _id: req.body.subject_id })
                    .then(result1 =>{
                        Student.deleteOne({ _id: req.body.student_id })
                        .then(result2 => {
                            return res.json({
                                'code': 200,
                                'status': 'success',
                                "message": 'Student and Subject Deleted Successfully.',
                                "data": result2
                            });
                        })
                    })
                } catch (err) {
                    return res.json(Response(402, "failed", "Something went wrong."));
                }
            }
        })
    }
    deleteSubject().then();
}

function searchStudent(req, res) {
    async function searchStudent() {
        Student.aggregate([
            { $match: { first_name: req.body.name }},
            { $lookup: { from: 'subjects', localField: "_id", foreignField: "student_id",as: "subjectsData" }}
        ]).then(result => {
            return res.json({
                'code': 200,
                'status': 'success',
                "message": 'Search Student list get Successfully.',
                "data": result
            });
        });
    }
    searchStudent().then();
}

function filterStudent(req, res) {
    async function filterStudent() {
        if (req.body.filter == 'class') {
            Student.aggregate([
                { $lookup: { from: 'subjects', localField: "_id", foreignField: "student_id",as: "subjectsData" }},
                { $sort: {"class": -1}},
            ]).then(result => {
                return res.json({
                    'code': 200,
                    'status': 'success',
                    "message": 'Students Filter by Class Successfully.',
                    "data": result
                });
            });   
        } else {
            Student.aggregate([
                { $lookup: { from: 'subjects', localField: "_id", foreignField: "student_id",as: "subjectsData" }},
                { $sort: {"subjects.subject": 1}},
            ]).then(result => {
                return res.json({
                    'code': 200,
                    'status': 'success',
                    "message": 'Students  Filter by Subject Successfully.',
                    "data": result
                });
            });
        }
    }
    filterStudent().then();
}

function updateStudent(req, res) {
    async function updateStudent() {
        Student.findOneAndUpdate(
            { _id: req.body.student_id },
            { $set: { first_name: req.body.first_name, last_name: req.body.last_name, class: req.body.class }}
        )
        .then(result => {
            Subject.findOneAndUpdate(
                { _id: req.body.subject_id },
                { $set: { subject: req.body.subject, marks: req.body.marks }}
            )
            .then(result1 => {
                return res.json({
                    'code': 200,
                    'status': 'success',
                    "message": 'Student Updated Successfully.',
                    "data": result
                });
            })
        })
    }
    updateStudent().then();
}
  