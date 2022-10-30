const expressErrorHandler = (err, req, res, next) => {
    // console.error(err);
    res.status(500).json({
        status: 500,
        error: err.message
    })
};

module.exports = { expressErrorHandler };