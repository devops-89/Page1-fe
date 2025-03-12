import React, { useState, useEffect, useMemo } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { Formik, Form } from "formik";
import PassengerFields from "./PassengerFields";
import PassportForm from "./PassportForm";
import GstForm from "./GstForm";
import { validationSchema } from "@/utils/validationSchema";
import { nunito } from "@/utils/fonts";

import AddForm from "./AddForm";
import { flightController } from "@/api/flightController";
import { JOURNEY_TYPE, TOAST_STATUS } from "@/utils/enum";
import ToastBar from "../toastBar";
import Loader from "@/utils/Loader";
import { useRouter } from "next/router";
import FullScreenDialog from "./ssr/oneway/seats/FullScreenDiaog";
import { COLORS } from "@/utils/colors";

import { setToast } from "@/redux/reducers/toast";
import { useDispatch } from "react-redux";
const PassengerForm = ({ flightDetails, myState, journey, isLCC }) => {
  const dispatch=useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    result_index: "",
    journey_type: "",
    journey: "",
    is_LCC: "",
    trace_id: "",
    ip_address: "",
    cell_country_code: "",
    country_code: "",
    city: "",
    contact_no: "",
    country: "",
    house_number: "",
    postal_code: "",
    street: "",
    state: "",
    nationality: "",
    email: "",
    passenger_details: {
      adult: [],
      child: [],
      infant: [],
    },
    gst_company_address: "",
    gst_company_contact_number: "",
    gst_company_name: "",
    gst_number: "",
    gst_company_email: "",
    fare: [],
    fareBreakdown: [],
  });

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [isPassportRequired, setIsPassportRequired] = useState(false);
  const [isGSTMandatory, setIsGSTMandatory] = useState(false);

  const {
    Currency,
    BaseFare,
    Tax,
    YQTax,
    AdditionalTxnFeeOfrd,
    AdditionalTxnFeePub,
    OtherCharges,
    Discount,
    PublishedFare,
    OfferedFare,
    TdsOnCommission,
    TdsOnPLB,
    TdsOnIncentive,
    ServiceFee,
  } = flightDetails[0]?.Results?.Fare;

  console.log("break", flightDetails[0]?.Results?.FareBreakdown);
 

  const mealAndBaggageData =
    journey?.journey_type === JOURNEY_TYPE.ONEWAY
      ? flightDetails[1]
      : journey?.journey_type === JOURNEY_TYPE.ROUNDTRIP
      ? flightDetails[1]?.Response
      : journey?.journey_type === JOURNEY_TYPE.MULTIWAY
      ? flightDetails[1]?.Response
      : null;

  useEffect(() => {
    const storedState = localStorage.getItem(myState);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setAdultCount(parsedState?.adult || 1);
      setChildCount(parsedState?.child || 0);
      setInfantCount(parsedState?.infant || 0);
    }

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
    adult: Array.from({ length: adultCount }, (_, index) => ({
      title: "",
      gender: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      contact_no: "",
      date_of_birth: "",
      formType: "adult",
    })),
    child: Array.from({ length: childCount }, (_, index) => ({
      title: "",
      gender: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      contact_no: "",
      date_of_birth: "",
      formType: "child",
    })),
    infant: Array.from({ length: infantCount }, (_, index) => ({
      title: "",
      gender: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      contact_no: "",
      date_of_birth: "",
      formType: "infant",
    })),
    passport: {
      fullName: "",
      passport_no: "",
      passport_expiry: "",
      passportIssueDate: "",
      passportIssueCountry: "",
    },
    gstForm: {
      gst_company_name: "",
      gst_number: "",
      gst_company_address: "",
      gst_company_contact_number: "",
      gst_company_email: "",
    },
    cell_country_code: "",
    country_code: "",
    city: "",
    contact_no: "",
    country: "",
    house_number: "",
    postal_code: "",
    street: "",
    state: "",
    nationality: "",
    email: "",
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();

    console.log("values are setting", values);

    const storedState = localStorage.getItem(myState);

    setLoading(true);
      setPayload((prevPayload) => ({
        ...prevPayload,
        journey_type: journey?.journey_type,
        journey: journey?.journey,
        is_LCC: isLCC,
        result_index: flightDetails?.[0]?.Results?.ResultIndex || null,
        trace_id: flightDetails?.[0]?.TraceId || null,
        ip_address: storedState ? JSON.parse(storedState).ip_address || "" : "",
        cell_country_code: values?.cell_country_code || "",
        country_code: values?.country_code || "",
        city: values?.city || "",
        contact_no: values?.contact_no || "",
        country: values?.country || "",
        house_number: values?.house_number || "",
        postal_code: values?.postal_code || "",
        street: values?.street || "",
        state: values?.state || "",
        nationality: values?.nationality || "",
        email: values?.email || "",
        passenger_details: {
          adult:
            values?.adult?.map((passenger) => ({
              title: passenger.title,
              gender: passenger.gender,
              first_name: passenger.first_name,
              last_name: passenger.last_name,
              date_of_birth: passenger.date_of_birth,
              passport_no: passenger.passport_no,
              passport_expiry: passenger.passport_expiry,
              contact_no: passenger.contact_no,
              email: passenger.email,
              pax_type: 1,
              is_lead_pax: values?.adult?.length === 1,
              ff_airline_code: null,
              ff_number: null,
            })) || [],
          child:
            values?.child?.map((passenger) => ({
              title: passenger.title,
              gender: passenger.gender,
              first_name: passenger.first_name,
              last_name: passenger.last_name,
              date_of_birth: passenger.date_of_birth,
              passport_no: passenger.passport_no,
              passport_expiry: passenger.passport_expiry,
              contact_no: passenger.contact_no,
              email: passenger.email,
              pax_type: 2,
              is_lead_pax: false,
              ff_airline_code: null,
              ff_number: null,
            })) || [],
          infant:
            values?.infant?.map((passenger) => ({
              title: passenger.title,
              gender: passenger.gender,
              first_name: passenger.first_name,
              last_name: passenger.last_name,
              date_of_birth: passenger.date_of_birth,
              passport_no: passenger.passport_no,
              passport_expiry: passenger.passport_expiry,
              contact_no: passenger.contact_no,
              email: passenger.email,
              pax_type: 3,
              is_lead_pax: false,
              ff_airline_code: null,
              ff_number: null,
            })) || [],
        },
        gst_company_address: values?.gstForm?.gst_company_address || null,
        gst_company_contact_number:
          values?.gstForm?.gst_company_contact_number || null,
        gst_company_name: values?.gstForm?.gst_company_name || null,
        gst_number: values?.gstForm?.gst_number || null,
        gst_company_email: values?.gstForm?.gst_company_email || null,
        fare: [
          {
            Currency: Currency || "INR",
            BaseFare: BaseFare || 0,
            Tax: Tax || 0,
            YQTax: YQTax || 0,
            AdditionalTxnFeeOfrd: AdditionalTxnFeeOfrd || 0,
            AdditionalTxnFeePub: AdditionalTxnFeePub || 0,
            OtherCharges: OtherCharges || 0,
            Discount: Discount || 0,
            PublishedFare: PublishedFare || 0,
            OfferedFare: OfferedFare || 0,
            TdsOnCommission: TdsOnCommission || 0,
            TdsOnPLB: TdsOnPLB || 0,
            TdsOnIncentive: TdsOnIncentive || 0,
            ServiceFee: ServiceFee || 0,
          },
        ],
        fareBreakdown: flightDetails?.[0]?.Results?.FareBreakdown?.length
          ? flightDetails?.[0]?.Results?.FareBreakdown.map((fare) => ({
              Currency: fare.Currency || "INR",
              PassengerType: fare.PassengerType || 0,
              PassengerCount: fare.PassengerCount || 0,
              BaseFare: fare.BaseFare || 0,
              Tax: fare.Tax || 0,
              YQTax: fare.YQTax || 0,
              AdditionalTxnFeeOfrd: fare.AdditionalTxnFeeOfrd || 0,
              AdditionalTxnFeePub: fare.AdditionalTxnFeePub || 0,
            }))
          : [],
      }

    ));

   
   

    console.log("Form Values on Submit:", values);
    setLoading(false);
  };

  const currentValidationSchema = useMemo(() => {
    return validationSchema(isGSTMandatory);
  }, [isGSTMandatory]);

  useEffect(() => {
    console.log("payload", payload);
    if (payload.trace_id) {
      const bookingPromise = flightDetails[0]?.Results?.IsLCC
        ? flightController.oneWayBookingLLC(payload)
        : flightController.oneWayBookingNonLLC(payload);

      bookingPromise
        .then((response) => {
          if (response) {
            console.log("Booking response:", response);
            // console.log("payload", payload);
            dispatch(
              setToast({
                open: true,
                message: response.data.message,
                severity: TOAST_STATUS.SUCCESS,
              })
            );
            setLoading(false);
            setTimeout(() => {
              if (journey?.journey_type === JOURNEY_TYPE.ONEWAY) {
                router.push(
                  `/oneway-flightlist/${payload?.trace_id}/oneway-checkout`
                );
              } else if (journey?.journey_type === JOURNEY_TYPE.ROUNDTRIP) {
                router.push(
                  `/roundtrip-flightlist/${payload?.trace_id}/roundtrip-checkout`
                );
              } else if (journey?.journey_type === JOURNEY_TYPE.MULTIWAY) {
                router.push(
                  `/multitrip-flightlist/${payload?.trace_id}/multitrip-checkout`
                );
              }
            }, 1500);
          }
        })
        .catch((error) => {
          console.log(error.message); // Log the entire error object
          dispatch(
            setToast({
              open: true,
              message: error.message,
              severity: TOAST_STATUS.ERROR,
            })
          );
          setLoading(false);
        });
    }
  }, [payload, flightDetails]);

  if (loading) {
    return (
      <>
        <Loader open={loading} />
      </>
    );
  }


  console.log("Flight Details on Passenger form:", flightDetails);

  return (
    <>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: nunito.style, fontWeight: 700, mb: "10px" }}
          >
            Passenger Form
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: nunito.style, fontWeight: 600, mb: "10px" }}
          >
            Total Passengers: {totalPassengers}
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidationSchema}
        >
          {({
            values,
            setFieldValue,
            handleChange,
            handleBlur,
            errors,
            touched,
          }) => {
            useEffect(() => {
              setFieldValue(
                "adult",
                Array.from({ length: adultCount }, (_, index) => ({
                  title: "",
                  gender: "",
                  first_name: "",
                  last_name: "",
                  middle_name: "",
                  email: "",
                  contact_no: "",
                  date_of_birth: "",
                  formType: `adult`,
                }))
              ),
                setFieldValue(
                  "child",
                  Array.from({ length: childCount }, (_, index) => ({
                    title: "",
                    gender: "",
                    first_name: "",
                    last_name: "",
                    middle_name: "",
                    email: "",
                    contact_no: "",
                    date_of_birth: "",
                    formType: `child`,
                  }))
                ),
                setFieldValue(
                  "infant",
                  Array.from({ length: infantCount }, (_, index) => ({
                    title: "",
                    gender: "",
                    first_name: "",
                    last_name: "",
                    middle_name: "",
                    email: "",
                    contact_no: "",
                    date_of_birth: "",
                    formType: `infant`,
                  }))
                );
            }, [
              adultCount,
              childCount,
              infantCount,
              setFieldValue,
              totalPassengers,
            ]);

            return (
              <Form onSubmit={(e) => handleSubmit(e, values)}>
                {values.adult.map((dataObj, index) => (
                  <Box key={index} sx={{ mb: "10px" }}>
                    <PassengerFields
                      data={mealAndBaggageData}
                      passenger={dataObj}
                      index={index}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      formType="adult" // Added formType prop
                    />
                  </Box>
                ))}

                {values.child.map((dataObj, index) => (
                  <Box key={index} sx={{ mb: "10px" }}>
                    <PassengerFields
                      data={mealAndBaggageData}
                      passenger={dataObj}
                      index={index}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      formType="child" // Added formType prop
                    />
                  </Box>
                ))}

                {values.infant.map((dataObj, index) => (
                  <Box key={index} sx={{ mb: "10px" }}>
                    <PassengerFields
                      passenger={dataObj}
                      index={index}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      formType="infant"
                    />
                  </Box>
                ))}

                {isPassportRequired && (
                  <PassportForm
                    values={values.passport}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors.passport}
                    touched={touched.passport}
                  />
                )}
                {isGSTMandatory && (
                  <GstForm
                    values={values.gstForm}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors.gstForm}
                    touched={touched.gstForm}
                  />
                )}

                <AddForm
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                 
                  <FullScreenDialog />
                </Box>

                <Box sx={{ mt: 2, mb: 2,display:'flex',justifyContent:"flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: COLORS.PRIMARY }}
                    
                  >
                    Continue
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Container>

      <ToastBar />
    </>
  );
};

export default PassengerForm;
