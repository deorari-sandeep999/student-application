'use strict';

const config = {
    local: {
        DATABASE: {
            dbname: 'student_application_task',
            host: 'mongodb://localhost:27017/',
            port: 0,
            username: 'root',
            password: 'root'
        },
    },
};
module.exports.get = function get(env) {
    return config[env] || config.default;
}
