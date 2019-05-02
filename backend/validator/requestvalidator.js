const joi = require('joi');

/**
 * Joi Validation schema for validating requests  for leaves.
 */
exports.CreateRequestValidator = {
  leavetype: joi.string().required(),
  startdate: joi.date().required(),
  enddate: joi.date().required(),
  totaldays: joi.number().required(),
  requestdate: joi.date().required(),
  requeststatus: joi.string().required(),
  approvalmessage: joi.string().required(),
  
  requestmessage: joi.string().required(),
  
};