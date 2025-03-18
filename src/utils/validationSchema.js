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




export const passengerSchema = Yup.object({
  passengers: Yup.array().of(
    Yup.object({
      title: Yup.string().required("Title is required"),
      gender: Yup.string().required("Gender is required"),
      first_name: Yup.string().required("First Name is required"),
      middle_name: Yup.string().optional(),
      last_name: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      contact_no: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone Number is required"),
      date_of_birth: Yup.date().required("Date of Birth is required"),
    })
  ),

  passport: Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    passport_no: Yup.string()
      .matches(/^[A-Z0-9]{6,9}$/, "Invalid Passport Number format")
      .required("Passport Number is required"),
    passport_expiry: Yup.date().required("Passport Expiry Date is required"),
    passportIssueDate: Yup.date().required("Passport Issue Date is required"),
    passportIssueCountry: Yup.string().required(
      "Passport Issue Country is required"
    ),
  }),
});

export const gstForm = (IsGSTMandatory) => {
  return Yup.object({
    gst_company_name: IsGSTMandatory
      ? Yup.string().required("Company Name is required")
      : Yup.string().optional(),
    gst_number: IsGSTMandatory
      ? Yup.string()
          .matches(/^[0-9A-Z]{15}$/, "Invalid GST Number format")
          .required("GST Number is required")
      : Yup.string().optional(),
    gst_company_address: IsGSTMandatory
      ? Yup.string().required("Company Address is required")
      : Yup.string().optional(),
    gst_company_contact_number: IsGSTMandatory
      ? Yup.string()
          .matches(/^[0-9]{10}$/, "Invalid Contact Number format")
          .required("Company Contact Number is required")
      : Yup.string().optional(),
    gst_company_email: IsGSTMandatory
      ? Yup.string()
          .email("Invalid email address")
          .required("Company Email is required")
      : Yup.string().email("Invalid email address").optional(),
  });
};

export const validationSchema = (isGSTMandatory) => {
  return Yup.object().shape({
    ...passengerSchema.fields,
    gstForm: isGSTMandatory ? gstForm(true) : Yup.object().optional(),
    cell_country_code: Yup.string().required("Cell Country Code is required"),
    country_code: Yup.string().required("Country Code is required"),
    city: Yup.string().required("City is required"),
    contact_no: Yup.string().required("Contact No is required"),
    country: Yup.string().required("Country is required"),
    house_number: Yup.string().required("House Number is required"),
    postal_code: Yup.string().required("Postal Code is required"),
    street: Yup.string().required("Street is required"),
    state: Yup.string().required("State is required"),
    nationality: Yup.string().required("Nationality is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
};
