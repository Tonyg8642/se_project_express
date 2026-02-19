function errorHandler(err, req, res, next) {
  console.error(err);

  // ensure err is always an object
  const safeError = err || {};

  const status =
    typeof safeError.statusCode === "number"
      ? safeError.statusCode
      : 500;

  const message =
    status === 500
      ? "An error occurred on the server"
      : safeError.message || "An error occurred";

  res.status(status).send({ message });
}

module.exports = errorHandler;