import * as Yup from "yup";
import { phoneNumberRegex } from "./regex";

export const registrationSchema = Yup.object({
  full_name: Yup.string()
    .min(2, "Full Name is too short!")
    .max(50, "Full Name is too long!")
    .required("Please Enter Full Name"),
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Valid Email"),

  password: Yup.string()
    .min(6, "Password Must be 6 Characters Long!")
    .max(20, "Password is Too Long!")
    .required("Please Enter Password"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Valid Email"),

  password: Yup.string()
    .min(6, "Password Must be 6 Characters Long!")
    .max(20, "Password is Too Long!")
    .required("Please Enter Password"),
});

export const forgetPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Valid Email"),
});

export const passwordSchema = Yup.object({
  password: Yup.string("Please Enter Passwor").min(
    2,
    "Password must be 8 characters long"
  ),
});





export const pancard = Yup.object({
  fullName: Yup.string()
    .matches(/^[a-zA-Z ]+$/, "Only alphabets and spaces are allowed")
    .required("Full Name is required"),
  panNumber: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
    .required("PAN Number is required"),
  dob: Yup.date()
    .required("Date of Birth is required"),
  })



  export const passport = Yup.object({
    passportNo: Yup.string()
      .matches(/^[A-Z0-9]+$/, "Invalid passport number format")
      .required("Passport Number is required"),
    passportExpiry: Yup.date()
      .required("Passport Expiry Date is required"),
    passportIssueDate: Yup.date()
      .required("Passport Issue Date is required"),
    passportIssueCountryCode: Yup.string()
      .length(2, "Country code must be 2 characters")
      .required("Country Code is required"),
  })




  export const gstForm = (IsGSTMandatory) => {
    return Yup.object({
      GSTCompanyAddress: IsGSTMandatory
        ? Yup.string().required('Company Address is required')
        : Yup.string().optional(),
      GSTCompanyContactNumber: IsGSTMandatory
        ? Yup.string().required('Company Contact Number is required')
        : Yup.string().optional(),
      GSTCompanyName: IsGSTMandatory
        ? Yup.string().required('Company Name is required')
        : Yup.string().optional(),
      GSTNumber: IsGSTMandatory
        ? Yup.string().required('GST Number is required')
        : Yup.string().optional(),
      GSTCompanyEmail: IsGSTMandatory
        ? Yup.string().email('Invalid email address').required('Company Email is required')
        : Yup.string().email('Invalid email address').optional(),
    });
  };
  