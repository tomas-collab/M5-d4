import expresValidator from 'express-validator';

const {body} = expresValidator;

export const postValidation = [
    body("name").exists().withMessage("Title is a mandatory field!"),
    body("surname").exists().withMessage("Title is a mandatory field!"),
    body("email").exists().withMessage("Category is a mandatory field!"),
    body("date").exists().withMessage("Name is a mandatory field!"),
    body("avatar").exists().withMessage("Name is a mandatory field!"),
  ]

