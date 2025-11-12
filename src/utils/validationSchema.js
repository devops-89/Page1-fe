import * as Yup from "yup";
import { differenceInYears } from "date-fns";

import { phoneNumberRegex } from "./regex";

const getAge = (dob) => {
  if (!dob) return 0;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

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
// Disallow these characters anywhere in a name: . , / ( )
export const DISALLOWED_NAME_CHARS = /[^A-Za-z\s]/;

export const disallowedNameCharsMsg = "Name cannot contain special characters";

export const passengerSchema = (
  isNewPassportMandatory,
  isNewPanMandatory,
  isBirthdayRequired,
  isPassportFullDetailRequired,
  isPassportShow,
  isPassportShowForAdultChild,
  isSpiceJet,
  isSourceAirAsia,
  isTrueJetAndZoomAir,
  journey
) => {
  const nameNoBadChars = (label) =>
    Yup.string()
      .trim()
      .test("no-bad-chars", disallowedNameCharsMsg, (v) =>
        v ? !DISALLOWED_NAME_CHARS.test(v) : true
      )
      .label(label);
  const norm = (s) => (s || "").trim().replace(/\s+/g, "").toUpperCase();
  return Yup.object({
    title: Yup.string().trim(),
    first_name: nameNoBadChars("First Name")
      .required("First Name is required")
      .min(1, "First Name must be at least 2 characters long")
      .max(32, "First Name cannot exceed 32 characters"),
    middle_name: nameNoBadChars("Middle Name").notRequired(),
    last_name: nameNoBadChars("Last Name")
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters long")
      .max(32, "Last Name cannot exceed 32 characters")
      .test(
        "no-space-anywhere-trujet-zoomair",
        "Spaces are not allowed in Last Name.",
        function (value) {
          if (!isTrueJetAndZoomAir) return true;
          const raw =
            this.originalValue == null ? "" : String(this.originalValue);
          return /^[^\s]+$/.test(raw);
        }
      )
      .test(
        "spicejet-name-distinct",
        "First Name and Last Name must be different.",
        function (value) {
          if (!isSpiceJet) return true;
          const first = this.parent?.first_name;
          const norm = (s) =>
            (s || "").trim().replace(/\s+/g, "").toUpperCase();
          return !(norm(value) && norm(first) && norm(value) === norm(first));
        }
      ),

    date_of_birth: Yup.date().when([], {
      is: () => isBirthdayRequired || isSourceAirAsia,
      then: (schema) => schema.required("Date of Birth is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Other"])
      .required("Gender is required"),

    passport_no: Yup.string()
      .trim()
      .matches(/^[A-Z0-9]{6,9}$/, "Invalid Passport No. format")
      .when([], {
        is: () =>
          journey?.journey === "INTERNATIONAL" &&
          (isNewPassportMandatory ||
            isPassportShowForAdultChild ||
            isPassportShow),
        then: (schema) => schema.required("Passport No. is required"),
        otherwise: (schema) => schema.notRequired(),
      }),

    passport_expiry: Yup.date()
      .typeError("Invalid expiry date")
      .when([], {
        is: () =>
          journey?.journey === "INTERNATIONAL" &&
          (isNewPassportMandatory ||
            isPassportShowForAdultChild ||
            isPassportShow),
        then: (schema) => schema.required("Passport Expiry Date is required"),
        otherwise: (schema) => schema.notRequired(),
      }),

    passport_issue_date: isPassportFullDetailRequired
      ? Yup.date()
          .typeError("Invalid issue date")
          .required("Passport Issue Date is required")
      : Yup.date().nullable().notRequired(),

    passport_issue_country_code: isPassportFullDetailRequired
      ? Yup.string()
          .trim()
          .matches(/^[A-Z]{2}$/, "Use 2-letter ISO code (e.g., IN)")
          .required("Passport Issue Country Code is required")
      : Yup.string().trim().nullable().notRequired(),

    pan_no: Yup.string()
      .trim()
      .when("date_of_birth", (dob, schema) => {
        if (!isNewPanMandatory) return schema.notRequired();

        const age = dob ? differenceInYears(new Date(), new Date(dob)) : null;

        // Case 1: Adult (18+) — PAN mandatory, guardian PAN not allowed
        if (age >= 18)
          return schema
            .matches(
              /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
              "Invalid PAN format (e.g. ABCDE1234F)"
            )
            .required(
              "PAN is required. Parent/Guardian PAN will not be considered. Please contact Ops team if not available."
            );

        // Case 2: Teen (12–18) — PAN optional but validated if provided
        if (age >= 12 && age < 18)
          return schema.matches(
            /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
            "Invalid PAN format (e.g. ABCDE1234F)"
          );

        // Case 3: Below 12 — PAN optional (guardian handled separately)
        return schema.notRequired();
      }),
  });
};

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

export const gstFormSchema = (isGSTMandatory) => {
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
export const buildAddFormSchema = (isAirAsia, isLCC) =>
  Yup.object({
    cell_country_code: Yup.string().trim(),
    // country_code:
    //   isAirAsia && isLCC
    //     ? Yup.string().trim().required("Country Code is required")
    //     : Yup.string().trim(),
    country_code: Yup.string().trim().required("Country Code is required"),
    city: Yup.string().trim().required("City required"),
    contact_no: Yup.string()
      .trim()
      .matches(/^[0-9]{10}$/, "10 digits required")
      .required("Phone No. is required"),
    // country:
    //   isAirAsia && isLCC
    //     ? Yup.string().trim().required("Country is required")
    //     : Yup.string().trim(),
    // address: isLCC
    //   ? Yup.string().trim().required("Address is required")
    //   : Yup.string().trim(),
    // email: isLCC
    //   ? Yup.string().trim().email("Invalid email").required("Email is Required")
    //   : Yup.string().trim().email("Invalid email"),
    country: Yup.string().trim().required("Country is required"),

    address: Yup.string().trim().required("Address is required"),

    email: Yup.string()
      .trim()
      .email("Invalid email")
      .required("Email is Required"),
  });

export const validationSchema = (
  isGSTMandatory,
  isBirthdayRequired,
  isNewPassportMandatory,
  isNewPanMandatory,
  isPassportFullDetailRequired,
  isAirAsia,
  isLCC,
  isPassportShow,
  isPassportShowForAdultChild,
  isSpiceJet,
  isSourceAirAsia,
  isTrueJetAndZoomAir,
  journey
) => {
  const addFormSchema = buildAddFormSchema(isAirAsia, isLCC);
  return Yup.object().shape({
    adult: Yup.array().of(
      passengerSchema(
        isNewPassportMandatory,
        isNewPanMandatory,
        isBirthdayRequired,
        isPassportFullDetailRequired,
        isPassportShow,
        isPassportShowForAdultChild,
        isSpiceJet,
        isSourceAirAsia,
        isTrueJetAndZoomAir,
        journey
      )
    ),
    child: Yup.array().of(
      passengerSchema(
        isNewPassportMandatory,
        isNewPanMandatory,
        isBirthdayRequired,
        isPassportFullDetailRequired,
        isPassportShow,
        isPassportShowForAdultChild,
        isSpiceJet,
        false,
        isTrueJetAndZoomAir,
        journey
      )
    ),
    infant: Yup.array().of(
      passengerSchema(
        isNewPassportMandatory,
        isNewPanMandatory,
        isBirthdayRequired,
        isPassportFullDetailRequired,
        isPassportShow,
        false,
        isSpiceJet,
        false,
        isTrueJetAndZoomAir,
        journey
      )
    ),
    gstForm: isGSTMandatory ? gstFormSchema(true) : Yup.object().optional(),
    ...addFormSchema.fields,
  });
};

export const helicopterBookingValidationSchema = Yup.object({
  fullName: Yup.string()
    .required("Please Enter Full Name")
    .test(
      "len",
      "Full name must be at least 2 characters",
      (val) => !!val && val.trim().length >= 2
    )
    .test(
      "max-len",
      "Full name must be at most 156 characters",
      (val) => !!val && val.trim().length <= 156
    ),
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
  const nameRegex = new RegExp(
    `^[a-zA-Z${validationInfo.SpaceAllowed ? "\\s" : ""}${
      validationInfo.SpecialCharAllowed ? "!@#$%^&*()\\-+=.,'" : ""
    }]+$`
  );

  const nameSchema = Yup.string()
    .required("Name is required")
    .matches(nameRegex, "Invalid characters in name")
    .min(
      validationInfo.CharLimit ? validationInfo.PaxNameMinLength : 1,
      `Minimum ${validationInfo.PaxNameMinLength} characters`
    )
    .max(
      validationInfo.CharLimit ? validationInfo.PaxNameMaxLength : 100,
      `Maximum ${validationInfo.PaxNameMaxLength} characters`
    );

  return Yup.object().shape({
    guests: Yup.array()
      .of(
        Yup.object().shape({
          type: Yup.string().required(),
          Title: Yup.string().required("Title is required"),
          firstName: nameSchema.label("First name"),
          lastName: nameSchema.label("Last name"),

          Age: Yup.number()
            .required("Age is required")
            .test(
              "age-validation",
              "Age does not match type",
              function (value) {
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
              }
            ),

          // Adult PAN
          PAN: Yup.lazy((value, options) => {
            const { type } = options.parent;
            if (type === "adult" && validationInfo?.PanMandatory) {
              return Yup.string().required("PAN is required");
            }
            return Yup.string().notRequired();
          }),

          // Guardian Details for Child
          GuardianDetail: Yup.lazy((value, options) => {
            const { type } = options.parent;
            if (type === "child") {
              return Yup.object().shape({
                Title: Yup.string().required("Guardian title is required"),
                FirstName: Yup.string().required(
                  "Guardian first name is required"
                ),
                LastName: Yup.string().required(
                  "Guardian last name is required"
                ),
                PAN: validationInfo?.PanMandatory
                  ? Yup.string().required("Guardian PAN is required")
                  : Yup.string().notRequired(),
              });
            } else {
              return Yup.object().shape({
                Title: Yup.string().notRequired(),
                FirstName: Yup.string().notRequired(),
                LastName: Yup.string().notRequired(),
                PAN: Yup.string().notRequired(),
              });
            }
          }),

          GSTCompanyName: Yup.string().notRequired(),
          GSTCompanyAddress: Yup.string().notRequired(),
          GSTCompanyContactNumber: Yup.string()
            .matches(/^[0-9]{10}$/, "Enter valid 10-digit contact number")
            .notRequired(),
          GSTCompanyEmail: Yup.string().email("Invalid email").notRequired(),
          GSTNumber: Yup.string().notRequired(),

          // PassportNo: Yup.lazy(() =>
          //   validationInfo?.PassportMandatory
          //     ? Yup.string().required("Passport number is required")
          //     : Yup.string().notRequired()
          // ),
          // PassportIssueDate: Yup.lazy(() =>
          //   validationInfo?.PassportMandatory
          //     ? Yup.date().required("Passport issue date is required")
          //     : Yup.date().nullable()
          // ),
          // PassportExpDate: Yup.lazy(() =>
          //   validationInfo?.PassportMandatory
          //     ? Yup.date().required("Passport expiry date is required")
          //     : Yup.date().nullable()
          // ),
        })
      )
      .test(
        "unique-names",
        "Duplicate passenger names not allowed",
        function (guests) {
          if (validationInfo.SamePaxNameAllowed || !guests) return true;
          const names = guests.map(
            (p) => `${p.firstName?.trim()} ${p.lastName?.trim()}`
          );
          return new Set(names).size === names.length;
        }
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

// Combined Validation schema
export const getCombinedValidationSchema = (validationInfo) => {
  return Yup.object({
    commonFields: CommonFieldValidation,
    guestForms: Yup.array().of(LeadPassengerValidation(validationInfo)),
  });
};
