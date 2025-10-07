import { createSlice } from "@reduxjs/toolkit";
import { flightValidations } from "@/utils/constants/flightValidations";

const initialState={
    rules:flightValidations,
}

const flightValidationSlice=createSlice({
    name:"flightValidation",
    initialState,
    reducers:{
        setValidationRules:(state,action)=>{
            state.rules={...state.rules, ...action.payload};

        },
    },
    
    // New action: update from FareQuote API response
    setFareQuoteValidations: (state, action) => {
      const fq = action.payload?.Results; // The FareQuote response

      // 1️⃣ Update PAN/Passport dynamic validation nodes
      state.rules.PANPassport.validationNodes = [
        ...(fq.IsPanRequiredAtBook ? ["IsPanRequiredAtBook"] : []),
        ...(fq.IsPanRequiredAtTicket ? ["IsPanRequiredAtTicket"] : []),
        ...(fq.IsPassportRequiredAtBook ? ["IsPassportRequiredAtBook"] : []),
        ...(fq.IsPassportRequiredAtTicket ? ["IsPassportRequiredAtTicket"] : []),
        ...(fq.IsPassportFullDetailRequiredAtBook ? ["IsPassportFullDetailRequiredAtBook"] : []),
      ];

      // 2️⃣ Update PassportFullDetail flag
      state.rules.PANPassport.passportDetailRequiredIf.IsPassportFullDetailRequiredAtBook =
        fq.IsPassportFullDetailRequiredAtBook ?? false;

      // 3️⃣ Update GST
      state.rules.gstValidation.IsGSTMandatory = fq.IsGSTMandatory ?? false;

      // 4️⃣ Update LCC flag
      state.rules.LCC.isLCC = fq.IsLCC ?? false;

      // ✅ You can also update other dynamic fields from FareQuote if needed
      // e.g., specialFare.isSeatMandatory = fq.IsSeatMandatory ?? false
    },
  
});

export const {setValidationRules}=flightValidationSlice.actions;
export default flightValidationSlice.reducer;
