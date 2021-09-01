import expresValidator from 'express-validator';

const {body} = expresValidator;

export const commentValidation = [
    body("comment").exists().withMessage("comment is a mandatory field!"),
    body("rate").exists().withMessage("rate is a mandatory field!"),
  
  ]