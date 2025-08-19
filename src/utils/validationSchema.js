import * as Yup from "yup";
import { phoneNumberRegex } from "./regex";

export const registrationSchema = Yup.object({
  full_name: Yup.string()
    .min(2, "Full Name is too short!")
    .max(50, "Full Name is too long!")
    .required("Please Enter Full Name")
    .trim()
    .test(
      "no-spaces",
      "Name cannot be just spaces",
      (value) => value.trim() !== ""
    ),
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Valid Email"),

  password: Yup.string()
    .min(6, "Password Must be 6 Characters Long!")
    .max(20, "Password is Too Long!")
    .required("Please Enter Password")
    .trim()
    .test(
      "no-spaces",
      "Password cannot be just spaces",
      (value) => value.trim() !== ""
    ),
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

export const activityFormSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  activity: Yup.string().required("Please select an activity"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const passengerSchema = (isPassportRequired, isBirthdayRequired) =>
  Yup.object({
    title: Yup.string().trim(),
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
  cell_country_code: Yup.string().trim(),
  country_code: Yup.string().trim(),
  city: Yup.string().trim().required("City required"),
  contact_no: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, "10 digits required")
    .required("Phone No. is required"),
  country: Yup.string().trim(),
  address: Yup.string().trim().required("Address is required"),
  email: Yup.string().trim().email("Invalid email").required("Email is Required"),
});

export const validationSchema = (
  isGSTMandatory,
  isPassportRequired,
  isBirthdayRequired
) => {
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

export const destinationWeddingFirstStep = Yup.object({
  fullName: Yup.string().required("Please Enter Full Name"),
  phoneNumber: Yup.string().required("Please Enter Phone Number"),
  email: Yup.string()
    .required("Please Enter Email")
    .email("Please Enter Valid Email"),
  date: Yup.string().required("Please Enter Date"),
});

export const taxiFormValidationSchema = Yup.object({
  fullName: Yup.string().required("Please Enter Your Full Name"),
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Email"),
  phoneNumber: Yup.string().required("Please Enter Phone Number"),
  taxiType: Yup.string().required("Please Select Taxi Type"),
  pickup: Yup.string().required("Please Enter Pickup Location"),
  drop: Yup.string().required("Please Enter Drop Location"),
  date: Yup.string().required("Please Enter Date and time "),
  capacity: Yup.string().required("Please Enter Capacity"),
});

export const basicInformationValidationSchema = Yup.object({
  weddingSide: Yup.string().required("Please Select Wedding Side"),
  destination: Yup.string().required("Please Select Wedding Destination"),
  numberOfGuests: Yup.string().required("Please Select Number Of Guests"),
  budget: Yup.string().required("Please Select Wedding Budget"),
});

export const additionalInformationValidationSchema = Yup.object({
  weddingTheme: Yup.string().required("Please Select Wedding Theme"),
  propertyType: Yup.string().required("Please Select Property Type"),
  foodType: Yup.array().required("Please Select at least one Food"),
  entryVehicle: Yup.string().required("Please Select Entry Vehicle"),
  musicTheme: Yup.string().required("Please Select Music Theme"),
  eventType: Yup.array().required("Please select at least one Event Type"),
  clothing: Yup.array().required("Please Select at least one Clothing Type"),
  additionalServices: Yup.array().optional().notRequired(),
});

export const selfDriveValidationSchema = Yup.object({
  fullName: Yup.string().required("Please Enter Full Name"),
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Email"),
  phoneNumber: Yup.string().required("Please Enter Phone Number"),
  fromDate: Yup.string().required("Please Select From Date"),
  toDate: Yup.string().required("Please Select To Date"),
});

export const LeadPassengerValidation = (validationInfo) => {
  return Yup.object().shape({
    guests: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required(),
        Title: Yup.string().required("Title is required"),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),

        Age: Yup.number()
          .required("Age is required")
          .test("age-validation", "Age does not match type", function (value) {
            const { type } = this.parent;
            if (type === "adult" && value < 12) {
              return this.createError({
                message: "Adults must be at least 12 years old",
              });
            }
            if (type === "child" && value >= 12) {
              return this.createError({
                message: "Children must be under 12 years old",
              });
            }
            return true;
          }),

        // PAN required only if type is adult
        PAN: Yup.string().when("type", {
          is: (type) => {
            return (
              type === "adult"
            );
          },
          then: (schema) => schema.required("PAN is required"),
          otherwise: (schema) => schema.notRequired(),
        }),

        GuardianDetail: Yup.object().when("type", {
          is: "child",
          then: () =>
            Yup.object().shape({
              Title: Yup.string().required("Guardian title is required"),
              FirstName: Yup.string().required(
                "Guardian first name is required"
              ),
              LastName: Yup.string().required("Guardian last name is required"),
              PAN: Yup.string().required("Guardian PAN is required"),
            }),
          otherwise: () =>
            Yup.object().shape({
              Title: Yup.string().notRequired(),
              FirstName: Yup.string().notRequired(),
              LastName: Yup.string().notRequired(),
              PAN: Yup.string().notRequired(),
            }),
        }),

        // GST fields (optional)
        GSTCompanyName: Yup.string().notRequired(),
        GSTCompanyAddress: Yup.string().notRequired(),
        GSTCompanyContactNumber: Yup.string()
          .matches(/^[0-9]{10}$/, "Enter valid 10-digit contact number")
          .notRequired(),
        GSTCompanyEmail: Yup.string().email("Invalid email").notRequired(),
        GSTNumber: Yup.string().notRequired(),

        // Passport fields
        PassportNo: Yup.string().when([], {
          is: () => validationInfo?.PassportMandatory,
          then: (schema) => schema.required("Passport number is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
        PassportIssueDate: Yup.date()
          .nullable()
          .when([], {
            is: () => validationInfo?.PassportMandatory,
            then: (schema) =>
              schema.required("Passport issue date is required"),
            otherwise: (schema) => schema.nullable(),
          }),
        PassportExpDate: Yup.date()
          .nullable()
          .when([], {
            is: () => validationInfo?.PassportMandatory,
            then: (schema) =>
              schema.required("Passport expiry date is required"),
            otherwise: (schema) => schema.nullable(),
          }),
      })
    ),
  });
};

export const CommonFieldValidation = Yup.object({
  Email: Yup.string().trim().email("Invalid email").required("Email required"),
  Phoneno: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, "10 digits required")
    .required("Phone No. is required"),
});

// combined Validation schema for prebook
export const getCombinedValidationSchema = (validationInfo) => {
  return Yup.object({
    commonFields: CommonFieldValidation,
    guestForms: Yup.array().of(
      LeadPassengerValidation(validationInfo)
    )
  });
};

export { passengerSchema, gstFormSchema, addFormSchema,getCombinedValidationSchema };
