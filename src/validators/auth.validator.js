import { body } from "express-validator";

export const signUpValidator = [
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu tối thiểu 6 ký tự"),
  body("name").notEmpty().withMessage("Tên không được để trống"),
];

export const signInValidator = [
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Mật kInstruction hợp lệ"),
];
