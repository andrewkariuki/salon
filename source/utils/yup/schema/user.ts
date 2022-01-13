import * as yup from "yup";

export const emailNotLongEnough = "Email address must be at least 3 characters";
export const passwordNotLongEnough = "Password must be at least 3 characters";
export const firstNameNotLongEnough =
  "First name must be at least 3 characters";
export const lastNameNotLongEnough = "Last Name must be at least 3 characters";
export const invalidEmail = "email must be a valid email";

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

export const validUserSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: registerPasswordValidation,
  firstName: yup.string().min(3, firstNameNotLongEnough).max(150).required(),
  lastName: yup.string().min(3, lastNameNotLongEnough).max(150).required(),
});

const invalidLogin = "Invalid Email address or password. Please try again.";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .email(invalidLogin)
    .required(),
  password: yup.string().min(3, invalidLogin).max(255, invalidLogin).required(),
});

export const changePasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation,
});
