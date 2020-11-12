import * as yup from "yup";

export default yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(8, "Username must be 8 characters long"),
  
    email: yup
    .string()
    .email("Must be valid email address")
    .required("Must include email address"),
  
    password: yup
    .string()
    .required("Password is required ")
    .min(8, "Password must be at least 8 characters long"),
  
  terms: yup.boolean(),
});