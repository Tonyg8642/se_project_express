const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.message("Invalid URL");
  }
  return value;
};

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    weather: Joi.string().required().valid("hot", "warm", "cold"),
    imageUrl: Joi.string().required().custom(validateURL),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateCreateItem,
  validateItemId,
  validateUpdateUser,
};
