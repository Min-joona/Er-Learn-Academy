const Joi = require('joi');

const schemas = {
  register: Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'password strength')
      .message('Password must contain at least one uppercase letter, one lowercase letter, and one number')
      .required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  settings: Joi.object({
    name: Joi.string().trim().min(2).max(50).optional(),
    currentPassword: Joi.string().optional(),
    newPassword: Joi.string().min(8).max(128)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'password strength')
      .message('Password must contain at least one uppercase letter, one lowercase letter, and one number')
      .optional(),
  }).min(1).message('At least one field required'),

  enroll: Joi.object({
    courseSlug: Joi.string().required(),
    instructionLanguage: Joi.string().valid('Tigrigna', 'English', 'Arabic').required(),
    placementScore: Joi.number().min(0).required(),
    totalQuestions: Joi.number().min(1).required(),
  }),

  purchase: Joi.object({
    courseSlug: Joi.string().required(),
  }),

  progress: Joi.object({
    courseSlug: Joi.string().required(),
    progress: Joi.number().min(0).max(100).required(),
  }),

  courseSlug: Joi.object({
    slug: Joi.string().required(),
  }),

  courseCreate: Joi.object({
    slug: Joi.string().pattern(/^[a-z0-9-]+$/).required(),
    title: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().min(0).default(0),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    flag: Joi.string().optional(),
    titleTi: Joi.string().optional(),
    levels: Joi.array().items(Joi.string()).optional(),
    instructionLanguages: Joi.array().items(Joi.string()).optional(),
    focus: Joi.array().items(Joi.string()).optional(),
    modules: Joi.array().items(Joi.string()).optional(),
  }),
};

function validate(schemaName) {
  const schema = schemas[schemaName];
  if (!schema) throw new Error(`Unknown schema: ${schemaName}`);
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      const messages = error.details.map((d) => d.message.replace(/"/g, ''));
      return res.status(400).json({ message: 'Validation failed', errors: messages });
    }
    req.validated = value;
    next();
  };
}

module.exports = { validate, schemas };
