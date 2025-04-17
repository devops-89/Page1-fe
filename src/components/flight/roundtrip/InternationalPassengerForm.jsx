import React, { useState, useEffect } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { Formik, Form } from "formik";
import { nunito } from "@/utils/fonts";
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
import FullScreenDialog from "../ssr/roundtrip/international/seats/FullScreenDialog";

const InternationalPassengerForm = ({
  flightDetails,
  myState,
  journey,
  isLCC,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({});

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [isPassportRequired, setIsPassportRequired] = useState(false);
  const [isGSTMandatory, setIsGSTMandatory] = useState(false);
  const [isBirthdayRequired, setIsBirthdayRequired] = useState(false);


  let adultSeatsOutgoing = [];
  let childSeatsOutgoing = [];
  let adultSeatsReturn = [];
  let childSeatsReturn = [];

  // -----------Baggage Value from redux--------------
  const selectedBaggages = useSelector(
    (state) => state.Flight.BaggagesInformation.baggages || {}
  );

  // -------------Meal Value from Redux---------------
  const selectedMeals = useSelector(
    (state) => state.Flight.MealsInformation.meals || {}
  );


  // ----------------OutGoing Seat Value----------------
  const selectedSeatsOutgoing = useSelector(
    (state) => state.Flight.RoundInternationalSeatsInformation?.outgoingSeats
  );

    // ----------------Return Seat Value----------------
  const selectedSeatsReturn = useSelector(
    (state) => state.Flight.RoundInternationalSeatsInformation?.incomingSeats
  );


  // ----------Find All OutGoing Seat Value -------------
  const finalSeatOutGoing = selectedSeatsOutgoing?.map((singleSeat, index) => {
    return singleSeat?.selectedSeats?.map((seat) => {
      return seat;
    });
  });

    // ----------Find All Return Seat Value -------------
  const finalSeatReturn = selectedSeatsReturn?.map((singleSeat, index) => {
    return singleSeat?.selectedSeats?.map((seat) => {
      return seat;
    });
  });


  // -----------Transposing Outgoing value----------------
  const maxLengthOutgoing = Math.max(
    ...finalSeatOutGoing.map((row) => row.length)
  );

  const transposedOutGoing = Array.from({ length: maxLengthOutgoing }, (_, i) =>
    finalSeatOutGoing.map((row) => row?.[i] || [])
  );

  transposedOutGoing.slice(0, adultCount).forEach((seat) => {
    adultSeatsOutgoing.push(seat);
  });

  transposedOutGoing
    .slice(adultCount, adultCount + childCount)
    .forEach((seat) => {
      childSeatsOutgoing.push(seat);
    });



  // -----------Transposing Return value----------------

  const maxLengthReturn = Math.max(...finalSeatReturn.map((row) => row.length));

  const transposedOutReturn = Array.from({ length: maxLengthReturn }, (_, i) =>
    finalSeatReturn.map((row) => row?.[i] || [])
  );

  

  transposedOutReturn.slice(0, adultCount).forEach((seat) => {
    adultSeatsReturn.push(seat);
  });

  transposedOutReturn
    .slice(adultCount, adultCount + childCount)
    .forEach((seat) => {
      childSeatsReturn.push(seat);
    });


    // console.log("selectedSeatsOutgoing------------------", selectedSeatsOutgoing)
    // console.log("selectedSeatsReturn------------------", selectedSeatsReturn)
    // console.log("transposedOutGoing------------------", transposedOutGoing)
    // console.log("transposedOutReturn----------------", transposedOutReturn)
    // console.log("adultSeatsOutgoing---------------", adultSeatsOutgoing)
    // console.log("childSeatsOutgoing---------------", childSeatsOutgoing)
    // console.log("adultSeatsReturn---------------", adultSeatsReturn)
    // console.log("childSeatsReturn---------------", childSeatsReturn)

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
      title: "",
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
      title: "",
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
      title: "",
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
    cell_country_code: "",
    country_code: "",
    city: "",
    contact_no: "",
    country: "",
    nationality: "",
    email: "",
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
      nationality: values?.country_code || "",
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
            MealDynamic:
              selectedMeals[`adult-${index}`]?.meals?.map(
                (single) => single?.meal
              ) || null,
            Baggage:
              selectedBaggages[`adult-${index}`]?.selectedBaggages?.map(
                (single) => single?.selectedBaggage
              ) || null,
            SeatDynamic: [...adultSeatsOutgoing[index], ...adultSeatsReturn[index]] || null,
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
            MealDynamic:
              selectedMeals[`child-${index}`]?.meals?.map(
                (single) => single?.meal
              ) || null,
            Baggage:
              selectedBaggages[`child-${index}`]?.selectedBaggages?.map(
                (single) => single?.selectedBaggage
              ) || null,
            SeatDynamic: [...childSeatsOutgoing[index], ...childSeatsReturn[index]] || null,
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

  const currentValidationSchema = validationSchema(isGSTMandatory);

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
              router.push(
                `/roundtrip-flightlist/${payload?.trace_id}/roundtrip-checkout`
              );
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
              fontFamily: nunito.style,
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
              fontFamily: nunito.style,
              fontWeight: 600,
              mb: "10px",
            }}
          >
            Total Passengers: {totalPassengers}
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidationSchema}
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
            // console.log("all errors", errors)
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
                      data={flightDetails[1]?.Response}
                      passenger={dataObj}
                      index={index}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      formType="adult"
                      isPassportRequired={isPassportRequired}
                      values={values}
                      journey={journey}
                    />
                  </Box>
                ))}

                {values.child.map((dataObj, index) => (
                  <Box key={`child-${index}`} sx={{ mb: "10px" }}>
                    <PassengerFields
                      data={flightDetails[1]?.Response}
                      passenger={dataObj}
                      index={index}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      formType="child"
                      isPassportRequired={isPassportRequired}
                      values={values}
                      journey={journey}
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
                      journey={journey}
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

                <AddForm
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <FullScreenDialog flightDetailType="roundTripflightDetails" />
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    mb: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
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

export default InternationalPassengerForm;
