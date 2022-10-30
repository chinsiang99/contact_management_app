const expressErrorHandler = (err, req, res, next) => {

    // check whether has status code, if not then return 500 status code
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        status: statusCode,
        error: err.message
    })
};

module.exports = { expressErrorHandler };