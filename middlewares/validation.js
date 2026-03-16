const { celebrate, Joi } = require("celebrate");

// ---------- AUTH VALIDATION ----------

// Signup: name, avatar, email, password
const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().uri().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

// Signin: email, password
const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// ---------- USER VALIDATION ----------

// Update user: name, avatar
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().uri().required(),
  }),
});

// ---------- ITEM VALIDATION ----------

// Create item: name, imageUrl, weather
const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    imageUrl: Joi.string().uri().required(),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

// Validate :itemId in routes
const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateUserUpdate,
  validateCardBody,
  validateId,
};