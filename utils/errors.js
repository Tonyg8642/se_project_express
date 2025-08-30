const BAD_REQUEST_ERROR_CODE = 400;       // invalid data
const UNAUTHORIZED_ERROR_CODE = 401;      // auth errors (bad token, bad login)
const FORBIDDEN_ERROR_CODE = 403;         // forbidden actions (delete not owned)
const NOT_FOUND_ERROR_CODE = 404;         // not found
const CONFLICT_ERROR_CODE = 409;          // duplicate email
const INTERNAL_SERVER_ERROR_CODE = 500;   // generic server error

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
};
