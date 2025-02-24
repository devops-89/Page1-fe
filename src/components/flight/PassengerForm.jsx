import React, { useState, useEffect, useMemo } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { Formik, Form } from "formik";
import PassengerFields from "./PassengerFields";
import PanCardForm from "./PancardForm";
import PassportForm from "./PassportForm";
import GstForm from "./GstForm";
import { validationSchema } from "@/utils/validationSchema";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { setToast } from "@/redux/reducers/toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AddForm from "./AddForm";

const PassengerForm = ({ flightDetails, state }) => {

  const [payload,setPayload]=useState({
    result_index: "",
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
    passenger_details:{
      adult:[],
      child:[],
      infant:[]

    },
    gst_company_address: "",
    gst_company_contact_number: "",
    gst_company_name: "",
    gst_number: "",
    gst_company_email: "",
    fare:[],
    fareBreakdown:[]
  });

  console.log("flight Details on Passenger form:",flightDetails);
  console.log("state from Passenger form:",state);
 

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
      setAdultCount(parsedState?.adult || 1);
      setChildCount(parsedState?.child || 0);
      setInfantCount(parsedState?.infant || 0);
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
  }, [flightDetails, state]);

  const totalPassengers = adultCount + childCount + infantCount;

  const initialValues = {
    passengers: Array.from({ length: totalPassengers }, (_, index) => ({
      title: "",
      gender: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      type: index < adultCount ? "Adult" : index < adultCount + childCount ? "Child" : "Infant",
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
      passportIssueCountry: "",
    },
    gstForm: {
      GSTCompanyName: "",
      GSTNumber: "",
      GSTCompanyAddress: "",
      GSTCompanyContactNumber: "",
      GSTCompanyEmail: "",
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
          message: "Duplicate passenger found. Please ensure each passenger has unique details.",
          severity: "error",
        })
      );
      return;
    }

    console.log("values are setting",values)
    setPayload(prevPayload => ({
      ...prevPayload,
      result_index: flightDetails[0].Results.ResultIndex,
      trace_id: flightDetails[0].TraceId,
      ip_address: "122.160.31.42",
      cell_country_code: values.cell_country_code,
      country_code: values.country_code,
      city: values.city,
      contact_no: values.contact_no,
      country: values.country,
      house_number: values.house_number,
      postal_code: values.postal_code,
      street: values.street,
      state: values.state,
      nationality: values.nationality,
      email: values.email,
      passenger_details: {
        adult: values.passengers || [],
        infant: [],
        child: []
      },
      gst_company_address: values.gstForm.GSTCompanyAddress,
      gst_company_contact_number: values.gstForm.GSTCompanyContactNumber,
      gst_company_name: values.gstForm.GSTCompanyName,
      gst_number: values.gstForm.GSTNumber,
      gst_company_email: values.gstForm.GSTCompanyEmail,
      fare: [{ ...flightDetails[0].Results.Fare }] || [],
      fareBreakdown: flightDetails[0].Results.FareBreakdown || []
    }));
    console.log("handleSubmit function CALLED!"); 
    console.log("Form Values on Submit:", values);
   
   

    console.log("Submitted Values (after duplicate check):", values);
    
  };

  const currentValidationSchema = useMemo(() => {
    return validationSchema(isGSTMandatory);
  }, [isGSTMandatory]);


  useEffect(()=>{
    console.log("payload printing:",payload)
  },[payload])

  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ mb: "15px" }}>
        {flightDetails[0]?.Results?.IsRefundable ? (
          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "16px", fontFamily: nunito.style, color: "green" }}>
            * The fare is refundable.
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "16px", fontFamily: nunito.style, color: "red" }}>
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
        validationSchema={currentValidationSchema}
       
      >
        {({ values, setFieldValue, handleChange, handleBlur, errors, touched }) => {
          useEffect(() => {
            setFieldValue("passengers", Array.from({ length: totalPassengers }, (_, index) => ({
              title: "",
              gender: "",
              firstName: "",
              middleName: "",
              lastName: "",
              email: "",
              phone: "",
              dob: "",
              type: index < adultCount ? "Adult" : index < adultCount + childCount ? "Child" : "Infant",
            })));
          }, [adultCount, childCount, infantCount, setFieldValue, totalPassengers]);

          // console.log("Formik ERRORS during render:", errors);
          // console.log("Formik VALUES during render:", values); 

          return (
            <Form onSubmit={()=>handleSubmit(values)}>
              {values.passengers.map((passenger, index) => (
                <Box key={index} sx={{ mb: "10px" }}>
                  <PassengerFields passenger={passenger} index={index} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
                </Box>
              ))}

              {isPanRequired && <PanCardForm values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} />}
              {isPassportRequired && <PassportForm values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} />}
              {isGSTMandatory && <GstForm values={values.gstForm} handleChange={handleChange} handleBlur={handleBlur} errors={errors.gstForm} touched={touched} />}

              <AddForm values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} />

              <Box sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" sx={{ backgroundColor: COLORS.PRIMARY }}>
                  Book Now
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default PassengerForm;