function errorHandler(err, req, res, next) {
  console.error(err); // always log the error

  const status = err.statusCode || 500;

  res.status(status).send({
    message:
      status === 500
        ? "An error occurred on the server"
        : err.message,
  });
}

module.exports = errorHandler;
