import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
};

const formPayload = createSlice({
  name: "payload",
  initialState,
  reducers: {
    setPayload: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetPayload: () => initialState,
  },
});

export const { setPayload, resetPayload } = formPayload.actions;
export default formPayload.reducer;
