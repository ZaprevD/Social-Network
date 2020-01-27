
logger = (req, res, next) => {
    console.log(`New Request! URL : ${req.url} , Method: ${req.method}`);
    next();
}

wrongRoute = (req, res, next) => {
    let error = new Error("This route does not exists please try with anotherone");
    error.status = 404;
    next(error);
}

errorHandler = (err, req, res, next) => {
    var errorObj = {
        status: err.status,
        error: {
            message: err.message
        }
    };

    res.status(err.status).json(errorObj);
};
module.exports = { logger, wrongRoute, errorHandler }