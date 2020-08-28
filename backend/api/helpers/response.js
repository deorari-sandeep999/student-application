module.exports = function (code, status, message, data, token) {
    var response = {};
    response.code = code;
    response.status = status;
    response.message = message;
    response.data = data;
    return response;
}