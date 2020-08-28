'use strict';

module.exports = function (express) {
    var router = express.Router();
    var studentController = require('../controllers/StudentController');
    router.post('/add-student', studentController.addStudent);
    router.get('/list-student', studentController.listStudent);
    router.post('/delete-subject', studentController.deleteSubject);
    router.post('/search', studentController.searchStudent);
    router.post('/filter', studentController.filterStudent);
    router.post('/update-student', studentController.updateStudent);
    return router;
}