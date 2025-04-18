import * as Yup from "yup";
import { phoneNumberRegex } from "./regex";

export const registrationSchema = Yup.object({
  full_name: Yup.string()
    .min(2, "Full Name is too short!")
    .max(50, "Full Name is too long!")
    .required("Please Enter Full Name")
    .trim()
    .test('no-spaces', 'Name cannot be just spaces', (value) => value.trim() !== ''),
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Valid Email"),

  password: Yup.string()
    .min(6, "Password Must be 6 Characters Long!")
    .max(20, "Password is Too Long!")
    .required("Please Enter Password")
    .trim()
    .test('no-spaces', 'Password cannot be just spaces', (value) => value.trim() !== ''),
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



const passengerSchema = (isPassportRequired, isBirthdayRequired) =>
  Yup.object({
    title: Yup.string().trim().required("Title is required"),
    first_name: Yup.string().trim().required("First Name is required"),
    last_name: Yup.string().trim().required("Last Name is required"),
    date_of_birth: Yup.date().when([], {
      is: () => isBirthdayRequired,
      then: (schema) => schema.required("Date of Birth is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    passport_no: isPassportRequired
      ? Yup.string()
          .trim()
          .matches(/^[A-Z0-9]{6,9}$/, "Invalid Passport No. format")
          .required("Passport No. is required")
      : Yup.string().notRequired(),
    passport_expiry: isPassportRequired
      ? Yup.date().required("Passport Expiry Date is required")
      : Yup.date().notRequired(),
  });


  const baseGstSchema = {
    gst_company_email: Yup.string()
      .trim()
      .email("Invalid email format")
      .required("Company Email is required"),
  
    gst_company_contact_number: Yup.string()
      .trim()
      .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits")
      .required("Company Contact Number is required"),
  
    gst_company_address: Yup.string()
      .trim()
      .min(5, "Address must be at least 5 characters long")
      .required("Company Address is required"),
  
    gst_number: Yup.string()
      .trim()
      .matches(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
        "Invalid GST Number format"
      )
      .required("GST Number is required"),
  
    gst_company_name: Yup.string()
      .trim()
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
  cell_country_code: Yup.string().trim().required("Cell Code "),
  country_code: Yup.string().trim().required("Country Code is required"),
  city: Yup.string().trim().required("City required"),
  contact_no: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, "10 digits required")
    .required("Phone No. is required"),
  country: Yup.string().trim().required("Country required"),
  address: Yup.string().trim().required("Address is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email required"),
});


export const validationSchema = (isGSTMandatory, isPassportRequired ,isBirthdayRequired) => {
  return Yup.object().shape({
    adult: Yup.array().of(passengerSchema(isPassportRequired ,isBirthdayRequired)),
    child: Yup.array().of(passengerSchema(isPassportRequired ,isBirthdayRequired)),
    infant: Yup.array().of(passengerSchema(isPassportRequired ,isBirthdayRequired)),
    gstForm: isGSTMandatory ? gstFormSchema(true) : Yup.object().optional(),
    ...addFormSchema.fields,
  });
};

export { passengerSchema, gstFormSchema, addFormSchema };
