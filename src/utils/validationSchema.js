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

// Validation schema for passenger fields (used for adult, child, infant)
const passengerSchema = (isPassportRequired, isBirthdayRequired) =>
  Yup.object({
    title: Yup.string().required("Title is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),

    // date_of_birth:Yup.date().required("Date of Birth is required"),
    date_of_birth: Yup.date().when([], {
      is: () => isBirthdayRequired,
      then: (schema) => schema.required("Date of Birth is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    passport_no: isPassportRequired
      ? Yup.string()
          .matches(/^[A-Z0-9]{6,9}$/, "Invalid Passport No. format")
          .required("Passport No. is required")
      : Yup.string().notRequired(),

    passport_expiry: isPassportRequired
      ? Yup.date().required("Passport Expiry Date is required")
      : Yup.date().notRequired(),
  });

const baseGstSchema = {
  gst_company_email: Yup.string()
    .email("Invalid email format")
    .required("Company Email is required"),

  gst_company_contact_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits")
    .required("Company Contact Number is required"),

  gst_company_address: Yup.string()
    .min(5, "Address must be at least 5 characters long")
    .required("Company Address is required"),

  gst_number: Yup.string()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
      "Invalid GST Number format"
    )
    .required("GST Number is required"),

  gst_company_name: Yup.string()
    .min(3, "Company Name must be at least 3 characters long")
    .required("Company Name is required"),
};

const gstFormSchema = (isGSTMandatory) => {
  return Yup.object().shape(
    isGSTMandatory
      ? baseGstSchema
      : Object.keys(baseGstSchema).reduce((schema, key) => {
          schema[key] = Yup.string().optional();
          return schema;
        }, {})
  );
};

// Validation schema for AddForm (contact details form)
const addFormSchema = Yup.object({
  cell_country_code: Yup.string().required("Cell Code "),
  country_code: Yup.string().required("Country Code is required"),
  city: Yup.string().required("City required"),
  contact_no: Yup.string()
    .matches(/^[0-9]{10}$/, "10 digits required")
    .required("Phone No. is required"),
  country: Yup.string().required("Country required"),
  address: Yup.string().required("Address is required"),
  // postal_code: Yup.string().required("Postal code required"),
  // street: Yup.string().required("Street required"),
  // state: Yup.string().required("State required"),
  // nationality: Yup.string().required("Nationality required"),
  email: Yup.string().email("Invalid email").required("Email required"),
});

export const validationSchema = (
  isGSTMandatory,
  isPassportRequired,
  isBirthdayRequired
) => {
  // console.log("yup:",isBirthdayRequired);
  return Yup.object().shape({
    adult: Yup.array().of(
      passengerSchema(isPassportRequired, isBirthdayRequired)
    ),
    child: Yup.array().of(
      passengerSchema(isPassportRequired, isBirthdayRequired)
    ),
    infant: Yup.array().of(
      passengerSchema(isPassportRequired, isBirthdayRequired)
    ),
    gstForm: isGSTMandatory ? gstFormSchema(true) : Yup.object().optional(),
    ...addFormSchema.fields,
  });
};

export const helicopterBookingValidationSchema = Yup.object({
  fullName: Yup.string().required("Please Enter Full Name"),
  phoneNumber: Yup.string().required("Please Enter Phone Number"),
  email: Yup.string()
    .required("Please Enter Email")
    .email("Please Enter Valid Email"),
  from: Yup.string().required("Please Enter Origin"),
  to: Yup.string().required("Please Enter Destination"),
  date: Yup.string().required("Please Enter Date"),
  time: Yup.string().required("Please Enter Time"),
  adults: Yup.number().required("Please Enter Number of Adults").positive(),
  message: Yup.string().required("Please Enter Message"),
  children: Yup.number().notRequired().positive(),
});

export { passengerSchema, gstFormSchema, addFormSchema };
