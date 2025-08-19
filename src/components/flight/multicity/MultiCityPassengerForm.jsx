import React, { useState, useEffect } from "react";
import { Container, Button, Typography, Box, Card } from "@mui/material";
import { Formik, Form } from "formik";
import { roboto } from "@/utils/fonts";
import { flightController } from "@/api/flightController";
import { JOURNEY, JOURNEY_TYPE, TOAST_STATUS } from "@/utils/enum";
import Loader from "@/utils/Loader";
import { useRouter } from "next/router";
import { COLORS } from "@/utils/colors";
import { setToast } from "@/redux/reducers/toast";
import { useDispatch, useSelector } from "react-redux";
import { validationSchema } from "@/utils/validationSchema";
import ToastBar from "@/components/toastBar";
import AddForm from "../AddForm";
import GstForm from "../GstForm";
import PassengerFields from "../PassengerFields";
import FullScreenDialog from "../ssr/oneway/seats/FullScreenDialog";
import UserVerifyForm from "../UserVerifyForm";
const MultiCityPassengerForm = ({
  flightDetails,
  myState,
  journey,
  isLCC,
  selectMeal,
  selectBaggage,
  setSelectBaggage,
  setSelectMeal,
}) => {
  const dispatch = useDispatch();
    const isAuthenticated = useSelector(
      (state) => state.USER.UserData.isAuthenticated
    );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({});

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [isPassportRequired, setIsPassportRequired] = useState(false);
  const [isGSTMandatory, setIsGSTMandatory] = useState(false);
  const [isBirthdayRequired, setIsBirthdayRequired] = useState(false);

  // console.log("flightDetails ----", flightDetails[1]?.SeatDynamic)

  const selectedSeats = useSelector(
    (state) => state.Flight?.SeatsInformation?.seats || []
  );

  const adultSeats = selectedSeats.slice(0, adultCount);
  const childSeats = selectedSeats.slice(adultCount, adultCount + childCount);
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
  } = flightDetails?.[0]?.Results?.Fare || {};

  useEffect(() => {
    const storedState = localStorage.getItem(myState);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setAdultCount(parsedState?.adult || 1);
      setChildCount(parsedState?.child || 0);
      setInfantCount(parsedState?.infant || 0);
    }
    const results = flightDetails?.[0]?.Results;
    setIsPassportRequired(
      results?.IsPassportRequiredAtBook || results?.IsPassportRequiredAtTicket
    );
    setIsBirthdayRequired(journey?.journey === JOURNEY.INTERNATIONAL);
    setIsGSTMandatory(results?.GSTAllowed && results?.IsGSTMandatory);
  }, [myState]);

  const totalPassengers = adultCount + childCount + infantCount;

  // Define initialValues inside the component to be recalculated on each render
  const initialValues = {
    adult: Array.from({ length: adultCount }, (_, index) => ({
      title: "Mr",
      gender: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      contact_no: "",
      date_of_birth: "",
      formType: "adult",
      passport_no: null,
      passport_expiry: null,
    })),
    child: Array.from({ length: childCount }, (_, index) => ({
      title: "Mr",
      gender: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      contact_no: "",
      date_of_birth: "",
      formType: "child",
      passport_no: null,
      passport_expiry: null,
    })),
    infant: Array.from({ length: infantCount }, (_, index) => ({
      title: "Mr",
      gender: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      contact_no: "",
      date_of_birth: "",
      formType: "infant",
      passport_no: null,
      passport_expiry: null,
    })),
    gstForm: {
      gst_company_name: "",
      gst_number: "",
      gst_company_address: "",
      gst_company_contact_number: "",
      gst_company_email: "",
    },
    cell_country_code: "91",
    country_code: "In",
    contact_no: "",
    country: "India",
    address: "",
    city: "",
    nationality: "In",
    email: "",
  };

  const handleMealValue = (passengerType, index, meal) => {
    setSelectMeal((prev) => {
      const key = `${passengerType}-${index}`;
      return {
        ...prev,
        [key]: prev[key] === meal ? null : meal, //toggle selection
      };
    });
  };

  const handleBaggageValue = (passengerType, index, baggage) => {
    setSelectBaggage((prev) => {
      const key = `${passengerType}-${index}`;
      return {
        ...prev,
        [key]: prev[key] === baggage ? null : baggage, //toggle selection
      };
    });
  };

  const handleSubmit = async (values) => {
    const contactEmail = values.email;
    const phoneNumber = values.contact_no;
    console.log("submit value", values);
    setLoading(true);
    const storedState = localStorage.getItem(myState);
    const commonPayload = {
      journey_type: journey?.journey_type,
      journey: journey?.journey,
      is_LCC: isLCC,
      address: values?.address || "",
      result_index: flightDetails?.[0]?.Results?.ResultIndex || null,
      trace_id: flightDetails?.[0]?.TraceId || null,
      ip_address: storedState ? JSON.parse(storedState).ip_address || "" : "",
      cell_country_code: values?.cell_country_code || "",
      country_code: values?.country_code || "",
      city: values?.city || "",
      contact_no: values?.contact_no || "",
      country: values?.country || "",
      nationality: values?.nationality || "",
      email: values?.email || "",
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
      fareBreakdown:
        flightDetails?.[0]?.Results?.FareBreakdown?.map((fare) => ({
          Currency: fare.Currency || "INR",
          PassengerType: fare.PassengerType || 0,
          PassengerCount: fare.PassengerCount || 0,
          BaseFare: fare.BaseFare || 0,
          Tax: fare.Tax || 0,
          YQTax: fare.YQTax || 0,
          AdditionalTxnFeeOfrd: fare.AdditionalTxnFeeOfrd || 0,
          AdditionalTxnFeePub: fare.AdditionalTxnFeePub || 0,
        })) || [],
    };

    const passengerDetails = {
      adult:
        values?.adult?.map((passenger, index) => {
          let gender = "Other";

          switch (passenger.title) {
            case "Mr":
              gender = "Male";
              break;
            case "Mrs":
            case "Miss":
            case "Ms":
              gender = "Female";
              break;
            default:
              gender = "Other";
          }

          return {
            ...passenger,
            email: contactEmail,
            contact_no: phoneNumber,

            date_of_birth: isBirthdayRequired
              ? passenger.date_of_birth
              : passenger.date_of_birth || null,

            gender: gender,
            pax_type: 1,
            is_lead_pax: index === 0,
            ff_airline_code: null,
            ff_number: null,
            MealDynamic: selectMeal[`adult-${index}`] || null,
            Baggage: selectBaggage[`adult-${index}`] || null,
            SeatDynamic: adultSeats[index] || null,
          };
        }) || [],
      child:
        values?.child?.map((passenger, index) => {
          let gender = "Other";

          switch (passenger.title) {
            case "Mr":
              gender = "Male";
              break;
            case "Mrs":
            case "Miss":
            case "Ms":
              gender = "Female";
              break;
            default:
              gender = "Other";
          }

          return {
            ...passenger,
            email: contactEmail,
            contact_no: phoneNumber,

            date_of_birth: isBirthdayRequired
              ? passenger.date_of_birth
              : passenger.date_of_birth || null,

            gender: gender,
            pax_type: 2,
            is_lead_pax: false,
            ff_airline_code: null,
            ff_number: null,
            MealDynamic: selectMeal[`child-${index}`] || null,
            Baggage: selectBaggage[`child-${index}`] || null,
            SeatDynamic: childSeats[index] || null,
          };
        }) || [],
      infant:
        values?.infant?.map((passenger, index) => {
          let gender = "Other";

          switch (passenger.title) {
            case "Mr":
              gender = "Male";
              break;
            case "Mrs":
            case "Miss":
            case "Ms":
              gender = "Female";
              break;
            default:
              gender = "Other";
          }

          return {
            ...passenger,
            email: contactEmail,
            contact_no: phoneNumber,

            date_of_birth: isBirthdayRequired
              ? passenger.date_of_birth
              : passenger.date_of_birth || null,

            gender: gender,
            pax_type: 3,
            is_lead_pax: false,
            ff_airline_code: null,
            ff_number: null,
          };
        }) || [],
    };

    const finalPayload = {
      ...commonPayload,
      passenger_details: passengerDetails,
    };

    setPayload(finalPayload);
    console.log("finalpayload", finalPayload);
  };

  const currentValidationSchema = validationSchema(
    isGSTMandatory,
    isBirthdayRequired,
    isPassportRequired
  );

  useEffect(() => {
    if (payload.trace_id) {
      const bookingPromise = flightDetails?.[0]?.Results?.IsLCC
        ? flightController.oneWayBookingLLC(payload)
        : flightController.oneWayBookingNonLLC(payload);

      bookingPromise
        .then((response) => {
          console.log("Booking Response:", response);
          // adding order_id and amount to the session storage for completing the paymount
          sessionStorage.setItem(
            "payment_info",
            JSON.stringify({
              custom_order_id: response.data.response.custom_order_id,
              amount: response.data.response.amount,
            })
          );

          if (response) {
            dispatch(
              setToast({
                open: true,
                message: response.data.message,
                severity: TOAST_STATUS.SUCCESS,
              })
            );
            setLoading(false);
            setTimeout(() => {
              {
                journey?.journey_type === JOURNEY_TYPE.ONEWAY
                  ? router.push(
                      `/oneway-flightlist/${payload?.trace_id}/oneway-checkout`
                    )
                  : router.push(
                      `/multitrip-flightlist/${payload?.trace_id}/multitrip-checkout`
                    );
              }
            }, 1500);
          }
        })
        .catch((error) => {
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
  }, [payload, flightDetails, journey, router, dispatch]);

  if (loading) {
    return <Loader open={loading} />;
  }

  return (
    <>
      <Container sx={{ py: 2 }}>
        <Box sx={{ mb: "15px" }}>
          {flightDetails?.[0]?.Results?.IsRefundable ? (
            <Typography
              variant="body1"
              sx={{
                color: COLORS.GREEN,
                fontWeight: 500,
                fontSize: { lg: 16, xs: 12 },
              }}
            >
              * The fare is refundable.
            </Typography>
          ) : (
            <Typography
              variant="body1"
              sx={{
                color: COLORS.RED,
                fontWeight: 500,
                fontSize: { lg: 16, xs: 12 },
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
            sx={{
              fontSize: { lg: 18, xs: 14 },
              fontFamily: roboto.style,
              fontWeight: 700,
              mb: "10px",
            }}
          >
            Passenger Form
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { lg: 18, xs: 14 },
              fontFamily: roboto.style,
              fontWeight: 600,
              mb: "10px",
            }}
          >
            Total Passengers: {totalPassengers}
          </Typography>
        </Box>
        <Formik
          key={`${isGSTMandatory}-${isPassportRequired}-${isBirthdayRequired}`}
          initialValues={initialValues}
          validationSchema={validationSchema(
            isGSTMandatory,
            isPassportRequired,
            isBirthdayRequired
          )}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
          }) => {
            // console.log("all values", values);
            // console.log("all errors", errors);
            return (
              <Form onSubmit={handleSubmit}>
                {values.adult.map((dataObj, index) => (
                  <Box
                    key={`adult-${index}`}
                    sx={{
                      mb: "10px",
                      boxShadow: "0px 2px 6px rgba(128, 128, 128, 0.2)",
                      borderRadius: "4px",
                    }}
                  >
                    <PassengerFields
                      data={flightDetails[1]}
                      passenger={dataObj}
                      index={index}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      formType="adult"
                      handleMealValue={handleMealValue}
                      selectMeal={selectMeal}
                      selectBaggage={selectBaggage}
                      handleBaggageValue={handleBaggageValue}
                      isPassportRequired={isPassportRequired}
                      values={values}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      journey={journey}
                    />
                  </Box>
                ))}

                {values.child.map((dataObj, index) => (
                  <Box key={`child-${index}`} sx={{ mb: "10px" }}>
                    <PassengerFields
                      data={flightDetails[1]}
                      passenger={dataObj}
                      index={index}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      formType="child"
                      handleMealValue={handleMealValue}
                      selectMeal={selectMeal}
                      selectBaggage={selectBaggage}
                      handleBaggageValue={handleBaggageValue}
                      isPassportRequired={isPassportRequired}
                      values={values}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Box>
                ))}

                {values.infant.map((dataObj, index) => (
                  <Box key={`infant-${index}`} sx={{ mb: "10px" }}>
                    <PassengerFields
                      passenger={dataObj}
                      index={index}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      formType="infant"
                      isPassportRequired={isPassportRequired}
                      values={values}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Box>
                ))}

                {isGSTMandatory && (
                  <GstForm
                    values={values.gstForm}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors.gstForm}
                    touched={touched.gstForm}
                    isGSTMandatory={isGSTMandatory}
                  />
                )}

                {flightDetails[1]?.Response?.SeatDynamic && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <FullScreenDialog initialFlightDetail="multitripflightDetails" />
                  </Box>
                )}

                <Box
                  sx={{
                    mt: 2,
                    mb: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {!isAuthenticated ? (
                    <Card sx={{ mb: "20px", p: "20px", mx: "auto",width:"100%" }}>
                      <UserVerifyForm />
                    </Card>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ backgroundColor: COLORS.PRIMARY }}
                    >
                     Book Now
                    </Button>
                  )}
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

export default MultiCityPassengerForm;
