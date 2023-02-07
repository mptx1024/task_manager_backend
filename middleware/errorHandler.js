const errorHandler = (err, req, res, next) => {
    // logEvents(
    //     // logEvents accepts two parameter: 1. message 2.logFileName
    //     // When using ' throw new Error("There is an error!")' the err.message is 'there is an error!'
    //     `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    //     'errLog.log'
    // );

    console.log(`In Error Handler-> err.stack: ${err.stack}`);
    const status = res.statusCode ? res.statusCode : 500; // server error
    // isError: this is needed from FE RTK query apiSlices; so if there is any unexpected error, the RTK query would catch the isError
    res.status(status).json({ message: err.message, isError: true });
    
};

module.exports = errorHandler;
