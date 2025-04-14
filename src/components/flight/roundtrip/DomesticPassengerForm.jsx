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
import FullScreenDialog from "../ssr/roundtrip/domestic/seats/FullScreenDialog";
import useRoundTripDomesticMealAndBaggage from "@/custom-hook/useRoundTripDomesticMealAndBaggage";

const DomesticPassengerForm = ({
  flightDetails,
  myState,
  journey,
  selectMeal,
  selectBaggage,
  setSelectBaggage,
  setSelectMeal,
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

  const selectedSeats = useSelector(
    (state) => state.Flight?.SeatsInformation?.seats || []
  );

  const adultSeats = selectedSeats.slice(0, adultCount);
  const childSeats = selectedSeats.slice(adultCount, adultCount + childCount);

  // console.log("flightDetails", flightDetails);

  const customMealAndBaggage =
    useRoundTripDomesticMealAndBaggage(flightDetails);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const {
    Currency_ob,
    BaseFare_ob,
    Tax_ob,
    YQTax_ob,
    AdditionalTxnFeeOfrd_ob,
    AdditionalTxnFeePub_ob,
    OtherCharges_ob,
    Discount_ob,
    PublishedFare_ob,
    OfferedFare_ob,
    TdsOnCommission_ob,
    TdsOnPLB_ob,
    TdsOnIncentive_ob,
    ServiceFee_ob,
  } = flightDetails?.[0][0]?.Results?.Fare || {};

  const {
    Currency_ib,
    BaseFare_ib,
    Tax_ib,
    YQTax_ib,
    AdditionalTxnFeeOfrd_ib,
    AdditionalTxnFeePub_ib,
    OtherCharges_ib,
    Discount_ib,
    PublishedFare_ib,
    OfferedFare_ib,
    TdsOnCommission_ib,
    TdsOnPLB_ib,
    TdsOnIncentive_ib,
    ServiceFee_ib,
  } = flightDetails?.[1][0]?.Results?.Fare || {};

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
  }, [myState, journey]);

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
    // house_number: "",
    // postal_code: "",
    // street: "",
    // state: "",
    nationality: "",
    email: "",
  };

  const handleMealValue = (passengerType, index, meal) => {
    setSelectMeal((prev) => ({
      ...prev,
      [`${passengerType}-${index}`]: meal,
    }));
  };

  const handleBaggageValue = (passengerType, index, baggage) => {
    setSelectBaggage((prev) => ({
      ...prev,
      [`${passengerType}-${index}`]: baggage,
    }));
  };

  const handleSubmit = async (values) => {
    const contactEmail = values.email;
    const phoneNumber = values.contact_no;

    console.log("submit value", values);
    setLoading(true);
    const storedState = localStorage.getItem(myState);

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

    const commonPayload = {
      ob: {
        result_index: flightDetails?.[0][0]?.Results?.ResultIndex || null,
        trace_id: flightDetails?.[0][0]?.TraceId,
        ip_address: storedState ? JSON.parse(storedState).ip_address || "" : "",
        cell_country_code: values?.cell_country_code || "",
        country_code: values?.country_code || "",
        city: values?.city || "",
        address: values?.address || "",
        journey_type: journey?.journey_type,
        journey: journey?.journey,
        is_LCC: flightDetails?.[0][0]?.Results?.IsLCC,
        contact_no: values?.contact_no || "",
        country: values?.country || "",
        // house_number: values?.house_number || "",
        // postal_code: values?.postal_code || "",
        // street: values?.street || "",
        // state: values?.state || "",
        nationality: values?.nationality || "",
        email: values?.email || "",
        gst_company_address: values?.gstForm?.gst_company_address || null,
        gst_company_contact_number:
          values?.gstForm?.gst_company_contact_number || null,
        gst_company_name: values?.gstForm?.gst_company_name || null,
        gst_number: values?.gstForm?.gst_number || null,
        gst_company_email: values?.gstForm?.gst_company_email || null,
        passenger_details: passengerDetails,
        fare: [
          {
            Currency: Currency_ob || "INR",
            BaseFare: BaseFare_ob || 0,
            Tax: Tax_ob || 0,
            YQTax: YQTax_ob || 0,
            AdditionalTxnFeeOfrd: AdditionalTxnFeeOfrd_ob || 0,
            AdditionalTxnFeePub: AdditionalTxnFeePub_ob || 0,
            OtherCharges: OtherCharges_ob || 0,
            Discount: Discount_ob || 0,
            PublishedFare: PublishedFare_ob || 0,
            OfferedFare: OfferedFare_ob || 0,
            TdsOnCommission: TdsOnCommission_ob || 0,
            TdsOnPLB: TdsOnPLB_ob || 0,
            TdsOnIncentive: TdsOnIncentive_ob || 0,
            ServiceFee: ServiceFee_ob || 0,
          },
        ],
        fareBreakdown:
          flightDetails?.[0][0]?.Results?.FareBreakdown?.map((fare) => ({
            Currency: fare.Currency || "INR",
            PassengerType: fare.PassengerType || 0,
            PassengerCount: fare.PassengerCount || 0,
            BaseFare: fare.BaseFare || 0,
            Tax: fare.Tax || 0,
            YQTax: fare.YQTax || 0,
            AdditionalTxnFeeOfrd: fare.AdditionalTxnFeeOfrd || 0,
            AdditionalTxnFeePub: fare.AdditionalTxnFeePub || 0,
          })) || [],
      },
      ib: {
        result_index: flightDetails?.[1][0]?.Results?.ResultIndex || null,
        trace_id: flightDetails?.[1][0]?.TraceId,
        ip_address: storedState ? JSON.parse(storedState).ip_address || "" : "",
        cell_country_code: values?.cell_country_code || "",
        country_code: values?.country_code || "",
        city: values?.city || "",
        address: values?.address || "",
        journey_type: journey?.journey_type,
        journey: journey?.journey,
        is_LCC: flightDetails?.[1][0]?.Results?.IsLCC,
        contact_no: values?.contact_no || "",
        country: values?.country || "",
        // house_number: values?.house_number || "",
        // postal_code: values?.postal_code || "",
        // street: values?.street || "",
        // state: values?.state || "",
        nationality: values?.nationality || "",
        email: values?.email || "",
        gst_company_address: values?.gstForm?.gst_company_address || null,
        gst_company_contact_number:
          values?.gstForm?.gst_company_contact_number || null,
        gst_company_name: values?.gstForm?.gst_company_name || null,
        gst_number: values?.gstForm?.gst_number || null,
        gst_company_email: values?.gstForm?.gst_company_email || null,
        passenger_details: passengerDetails,
        fare: [
          {
            Currency: Currency_ib || "INR",
            BaseFare: BaseFare_ib || 0,
            Tax: Tax_ib || 0,
            YQTax: YQTax_ib || 0,
            AdditionalTxnFeeOfrd: AdditionalTxnFeeOfrd_ib || 0,
            AdditionalTxnFeePub: AdditionalTxnFeePub_ib || 0,
            OtherCharges: OtherCharges_ib || 0,
            Discount: Discount_ib || 0,
            PublishedFare: PublishedFare_ib || 0,
            OfferedFare: OfferedFare_ib || 0,
            TdsOnCommission: TdsOnCommission_ib || 0,
            TdsOnPLB: TdsOnPLB_ib || 0,
            TdsOnIncentive: TdsOnIncentive_ib || 0,
            ServiceFee: ServiceFee_ib || 0,
          },
        ],
        fareBreakdown:
          flightDetails?.[1][0]?.Results?.FareBreakdown?.map((fare) => ({
            Currency: fare.Currency || "INR",
            PassengerType: fare.PassengerType || 0,
            PassengerCount: fare.PassengerCount || 0,
            BaseFare: fare.BaseFare || 0,
            Tax: fare.Tax || 0,
            YQTax: fare.YQTax || 0,
            AdditionalTxnFeeOfrd: fare.AdditionalTxnFeeOfrd || 0,
            AdditionalTxnFeePub: fare.AdditionalTxnFeePub || 0,
          })) || [],
      },
    };

    setPayload(commonPayload);
    console.log("finalpayload", commonPayload);
  };

  const currentValidationSchema = validationSchema(
    isGSTMandatory,
    isBirthdayRequired,
    isPassportRequired
  );

  useEffect(() => {
    // console.log("api running");
    console.log("payload", payload);
    if (payload?.ob?.trace_id) {
      const bookingPromise = flightController.roundTripDomesticBooking(payload);

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
                `/roundtrip-flightlist/${payload?.ob?.trace_id}/roundtrip-checkout`
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
            Total Passengers:{totalPassengers}
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
                      data={customMealAndBaggage}
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
                      journey={journey}
                    />
                  </Box>
                ))}

                {values.child.map((dataObj, index) => (
                  <Box key={`child-${index}`} sx={{ mb: "10px" }}>
                    <PassengerFields
                      data={customMealAndBaggage}
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

export default DomesticPassengerForm;
