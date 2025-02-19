import React, { useState, useEffect } from "react";
import { Container, Button, Grid2, Typography, Box } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import PassengerFields from "./PassengerFields";
import PanCardForm from "./PancardForm";
import PassportForm from "./PassportForm";
import { validationSchema } from "@/utils/validationSchema";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import GstForm from "./GstForm";
import { setToast } from "@/redux/reducers/toast";
import { useDispatch } from "react-redux";

const PassengerForm = ({ flightDetails, state }) => {
  const dispatch = useDispatch();
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [isPanRequired, setIsPanRequired] = useState(false);
  const [isPassportRequired, setIsPassportRequired] = useState(false);
  const [isGSTMandatory, setIsGSTMandatory] = useState(false);

  useEffect(() => {
    const storedState = localStorage.getItem(state);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      const storedAdultCount = parsedState?.adult || 1;
      const storedChildCount = parsedState?.child || 0;
      const storedInfantCount = parsedState?.infant || 0;

      setAdultCount(storedAdultCount);
      setChildCount(storedChildCount);
      setInfantCount(storedInfantCount);
    }

    setIsPanRequired(
      flightDetails[0]?.Results?.IsPanRequiredAtBook ||
        flightDetails[0]?.Results?.IsPanRequiredAtTicket
    );
    setIsPassportRequired(
      flightDetails[0]?.Results?.IsPassportRequiredAtBook ||
        flightDetails[0]?.Results?.IsPassportRequiredAtTicket
    );

    if (flightDetails[0]?.Results?.GSTAllowed) {
      setIsGSTMandatory(flightDetails[0]?.Results?.IsGSTMandatory || false);
    }
  }, [flightDetails]);

  const totalPassengers = adultCount + childCount + infantCount;

  const initialValues = {
    passengers: Array.from({ length: totalPassengers }, (_, index) => ({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      mobileNumber: "",
      countryCode: "",
      type:
        index < adultCount
          ? "Adult"
          : index < adultCount + childCount
          ? "Child"
          : "Infant",
    })),
    panCard: {
      fullName: "",
      panNumber: "",
      dob: "",
    },
    passport: {
      fullName: "",
      passportNumber: "",
      passportExpiryDate: "",
      passportIssueDate: "",
      passportIssueCountryCode: "",
      passportIssueCountry: "",
    },
    gstForm: {
      GSTCompanyAddress: "",
      GSTCompanyContactNumber: "",
      GSTCompanyName: "",
      GSTNumber: "",
      GSTCompanyEmail: "",
    },
  };

  const handleSubmit = (values) => {
    const { passengers } = values;

    const checkDuplicatePassengers = (passengers) => {
      const seen = new Set();
      for (let passenger of passengers) {
        const uniqueKey = `${passenger.firstName}-${passenger.lastName}-${passenger.email}`;
        if (seen.has(uniqueKey)) {
          return true;
        }
        seen.add(uniqueKey);
      }
      return false;
    };

    if (checkDuplicatePassengers(passengers)) {
      dispatch(
        setToast({
          open: true,
          message:
            "Duplicate passenger found. Please ensure each passenger has unique details.",
          severity: TOAST_STATUS.ERROR,
        })
      );
      return;
    }

    console.log("Submitted Values:", values);
  };

  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ mb: "15px" }}>
        {flightDetails[0]?.Results?.IsRefundable ? (
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              fontFamily: nunito.style,
              color: "green",
            }}
          >
            * The fare is refundable.
          </Typography>
        ) : (
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              fontFamily: nunito.style,
              color: "red",
            }}
          >
            * Sorry, the fare is not refundable.
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ fontFamily: nunito.style, fontWeight: 700, mb: "10px" }}>
          Passenger Form
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: nunito.style, fontWeight: 600, mb: "10px" }}>
          Total Passengers: {totalPassengers}
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(isGSTMandatory)}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, handleChange, handleBlur, errors }) => {
          useEffect(() => {
            // Update passengers based on the total count
            const updatedPassengers = Array.from(
              { length: totalPassengers },
              (_, index) => ({
                firstName: "",
                middleName: "",
                lastName: "",
                email: "",
                phone: "",
                mobileNumber: "",
                countryCode: "",
                type:
                  index < adultCount
                    ? "Adult"
                    : index < adultCount + childCount
                    ? "Child"
                    : "Infant",
              })
            );
            setFieldValue("passengers", updatedPassengers);
          }, [adultCount, childCount, infantCount, setFieldValue]);

          return (
            <Form>
              {values.passengers.map((passenger, index) => (
                <Grid2 container sx={{ mb: "10px" }} key={index}>
                  <PassengerFields
                    passenger={passenger}
                    index={index}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                  />
                </Grid2>
              ))}

              {isPanRequired && (
                <Grid2 container sx={{ mb: "10px" }}>
                  <PanCardForm
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                  />
                </Grid2>
              )}

              {isPassportRequired && (
                <Grid2 container>
                  <PassportForm
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                  />
                </Grid2>
              )}

              {isGSTMandatory && (
                <Grid2 container>
                  <GstForm
                    values={values.gstForm}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors.gstForm} // Ensure correct error mapping
                  />
                </Grid2>
              )}

              <Grid2 container>
                <Grid2 size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: COLORS.PRIMARY }}
                  >
                    Submit
                  </Button>
                </Grid2>
              </Grid2>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default PassengerForm;
