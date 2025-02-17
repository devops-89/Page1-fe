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




export const passengerSchema = Yup.object({
  passengers: Yup.array().of(
    Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobileNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile Number is required"),
    })
  ),
  panCard: Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    panNumber: Yup.string()
      .length(10, "PAN Number must be 10 characters")
      .required("PAN Number is required"),
    dob: Yup.date().required("Date of Birth is required"),
  }),
  passport: Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    passportNumber: Yup.string().required("Passport Number is required"),
    passportExpiryDate: Yup.date().required("Passport Expiry Date is required"),
    passportIssueDate: Yup.date().required("Passport Issue Date is required"),
    passportIssueCountryCode: Yup.string().required(
      "Passport Issue Country Code is required"
    ),
    passportIssueCountry: Yup.string().required(
      "Passport Issue Country is required"
    ),
  }),
});


export const gstForm = (IsGSTMandatory) => {
  return Yup.object({
    GSTCompanyAddress: IsGSTMandatory
      ? Yup.string().required("Company Address is required")
      : Yup.string().optional(),
    GSTCompanyContactNumber: IsGSTMandatory
      ? Yup.string().required("Company Contact Number is required")
      : Yup.string().optional(),
    GSTCompanyName: IsGSTMandatory
      ? Yup.string().required("Company Name is required")
      : Yup.string().optional(),
    GSTNumber: IsGSTMandatory
      ? Yup.string().required("GST Number is required")
      : Yup.string().optional(),
    GSTCompanyEmail: IsGSTMandatory
      ? Yup.string()
          .email("Invalid email address")
          .required("Company Email is required")
      : Yup.string().email("Invalid email address").optional(),
  });
};


export const validationSchema = (isGSTMandatory) => {
  return Yup.object({
    passengers: passengerSchema.passengers,
    panCard: passengerSchema.panCard,
    passport: passengerSchema.passport,
    gstForm: isGSTMandatory
      ? gstForm(true) 
      : Yup.object().nullable(),  
  });
};


export const helicopter = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  from: Yup.string().required("From location is required"),
  to: Yup.string().required("To location is required"),
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
  adults: Yup.number()
    .min(1, "At least 1 adult required")
    .required("Number of adults is required"),
  children: Yup.number()
    .min(0, "Cannot be negative")
    .required("Number of children is required"),
  message: Yup.string(),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the Terms and Conditions"
  ),
});

export const holidayPackageSchema = Yup.object({
  destination: Yup.string().required("Destination is required"),
  duration: Yup.string().required("Duration is required"),
  month: Yup.string().required("Month is required"),
  packagetype: Yup.string().required("Package Type is required"),
  packagecategory: Yup.string().required("Package Category is required"),
});
