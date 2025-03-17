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
const passengerSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  gender: Yup.string().required("Gender is required"),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  date_of_birth: Yup.date().required("Date of Birth is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact_no: Yup.string()
    .matches(/^[0-9]{10}$/, "10 digits required")
    .required("Phone No. is required"),
  passport_no: Yup.string()
    .matches(/^[A-Z0-9]{6,9}$/, "Invalid format")
    .required("Passport No. required"),
  passport_expiry: Yup.date().required("Expiry Date required"),
});


// Validation schema for GST form, conditionally required based on isGSTMandatory flag
const gstFormSchema = (isGSTMandatory) => {
  

  if (!isGSTMandatory) {
    return Yup.object(
      Object.keys(baseSchema).reduce((schema, key) => {
        schema[key] = baseSchema[key].optional();
        return schema;
      }, {})
    );
  }

  return Yup.object(baseSchema);
};

// Validation schema for AddForm (contact details form)
const addFormSchema = Yup.object({
  cell_country_code: Yup.string().required("Cell Country Code is required"),
  country_code: Yup.string().required("Country Code is required"),
  city: Yup.string().required("City required"),
  contact_no: Yup.string()
    .matches(/^[0-9]{10}$/, "10 digits required")
    .required("Phone No. is required"),
  country: Yup.string().required("Country required"),
  house_number: Yup.string().required("House No. required"),
  postal_code: Yup.string().required("Postal code required"),
  street: Yup.string().required("Street required"),
  state: Yup.string().required("State required"),
  nationality: Yup.string().required("Nationality required"),
  email: Yup.string().email("Invalid email").required("Email required"),
});

// Main validation schema for the entire PassengerForm, using the individual schemas
export const validationSchema = (isGSTMandatory) => {
  return Yup.object().shape({
    adult: Yup.array().of(passengerSchema),
    child: Yup.array().of(passengerSchema),
    infant: Yup.array().of(passengerSchema),
    gstForm: isGSTMandatory ? gstFormSchema(true) : Yup.object().optional(),
    ...addFormSchema.fields,
  });
};

export { passengerSchema, passportSchema, gstFormSchema, addFormSchema };
