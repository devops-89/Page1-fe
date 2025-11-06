import { createSlice } from "@reduxjs/toolkit";
import { flightValidations } from "@/utils/constants/flightValidations";

const initialState = {
  rules: flightValidations,
};

// Normalize a possibly-undefined boolean
const norm = (val, def = false) => (typeof val === "boolean" ? val : !!def);
// Coerce common API truthy formats to boolean
const toBool = (v) =>
  v === true ||
  v === 1 ||
  v === "1" ||
  (typeof v === "string" && v.toLowerCase() === "true");

const flightValidationSlice = createSlice({
  name: "flightValidation",
  initialState,
  reducers: {
    // Merge-in manual overrides if ever needed
    setValidationRules: (state, action) => {
      state.rules = { ...state.rules, ...action.payload };
    },

    // Drive dynamic parts from FareQuote response
    setFareQuoteValidations: (state, action) => {
      const fq = action?.payload?.Results || action?.payload || {};

      // --- 1) PAN / Passport flags (KEEP your existing logic) ---
      state.rules.PANPassport.validationNodes = [
        ...(fq.IsPanRequiredAtBook ? ["IsPanRequiredAtBook"] : []),
        ...(fq.IsPanRequiredAtTicket ? ["IsPanRequiredAtTicket"] : []),
        ...(fq.IsPassportRequiredAtBook ? ["IsPassportRequiredAtBook"] : []),
        ...(fq.IsPassportRequiredAtTicket
          ? ["IsPassportRequiredAtTicket"]
          : []),
        ...(fq.IsPassportFullDetailRequiredAtBook
          ? ["IsPassportFullDetailRequiredAtBook"]
          : []),
      ];

      // Store the “full passport detail at book” switch
      // state.rules.PANPassport.passportDetailRequiredIf.IsPassportFullDetailRequiredAtBook =
      //   norm(fq.IsPassportFullDetailRequiredAtBook, false);

      // --- 2) GST flag ---
      state.rules.gstValidation.IsGSTMandatory = norm(fq.IsGSTMandatory, false);

      // 3️⃣ Check LCC logic
      const lccAirlines =
        state.rules?.LCC?.airlineSpecific?.AirAsia?.codes || [];

      const TrueJetAndZoomAirAirlines =
        state.rules?.LCC?.airlineSpecific?.TrueJetAndZoomAir?.codes || [];
      // Get all airline codes from the fare quote
      const segmentAirlines = fq?.Segments?.[0]?.map((seg) =>
        (seg?.Airline?.AirlineCode || "").toUpperCase().trim()
      );

      const sourceAirline = (fq?.Segments?.[0]?.[0]?.Airline?.AirlineCode || "")
        .toUpperCase()
        .trim();

      const isAirAsia = lccAirlines.includes(sourceAirline);
      // Set flag
      state.rules.LCC.airlineSpecific.AirAsia.isSourceAirAsia = isAirAsia;

      // Check if any airline code matches the LCC list
      const isAirAsiaFlight = segmentAirlines.some((code) =>
        lccAirlines.includes(code)
      );

      // Set flag
      state.rules.LCC.airlineSpecific.AirAsia.isAirAsia = isAirAsiaFlight;

      // Check if any airline code matches the list of TrueJet and ZoomAir
      const ISTrueJetAndZoomAirAirlines =
        TrueJetAndZoomAirAirlines.includes(sourceAirline);
      // Set flag
      state.rules.LCC.airlineSpecific.TrueJetAndZoomAir.isTrueJetAndZoomAir =
        ISTrueJetAndZoomAirAirlines;

      //set bhutan code
      const BhutanCode = state.rules?.LCC?.bhutanAirlines?.code || "B3";

      const isBhutanAirlinesFlight = segmentAirlines.some(
        (code) => code === BhutanCode
      );
      // --- Check for SpiceJet ---
      const spiceJetCodes =
        state.rules?.LCC?.airlineSpecific?.spiceJet?.code || [];

      //check for FlyDubai --
      const flyDubaiCodes = (
        state.rules?.LCC?.airlineSpecific?.flyDubai?.code || []
      ).map((c) => c.toUpperCase().trim());

      const isFlyDubai = segmentAirlines.some((code) =>
        flyDubaiCodes.includes(code)
      );
      state.rules.LCC.airlineSpecific.flyDubai.isFlyDubai = isFlyDubai;

      state.rules.LCC.bhutanAirlines.isBhutanAirlines = isBhutanAirlinesFlight;
      const isSpiceJetFlight = segmentAirlines.some((code) =>
        spiceJetCodes.includes(code)
      );
      state.rules.LCC.airlineSpecific.spiceJet.isSpiceJet = isSpiceJetFlight;

      //set destination

      const destinationCode = state.rules?.LCC?.destination?.countrycode || [];
      const nepalDestinationCode =
        state.rules?.LCC?.destination?.nepalCountry || "NP";

      const segmentCode =
        fq?.Segments?.[0]?.[
          fq?.Segments?.[0]?.length - 1
        ]?.Destination?.Airport?.CountryCode?.toUpperCase() || " ";

      // Check if this single code exists in your list
      const isDestination = destinationCode.includes(segmentCode);

      // set flag (SpiceJet going to Dubai,Riyadh,Sharjah or FlyDubai)
      state.rules.LCC.isPassport =
        (isSpiceJetFlight && isDestination) || isFlyDubai;

      // --- 3) LCC, nepalDestination except BhutanAirlines and GDS(non Lcc) except for Nepal
      const isLCC = !!fq.IsLCC;
      state.rules.LCC.isLCC = isLCC;
      const gdsPassportAdultChildOnly =
        !isLCC && segmentCode !== nepalDestinationCode;

      state.rules.LCC.isPassportAdultChildOnly =
        (isLCC &&
          segmentCode === nepalDestinationCode &&
          !isBhutanAirlinesFlight) ||
        gdsPassportAdultChildOnly;

      //special fares

      const mealMandatory = toBool(
        fq?.ismealmandatory ?? fq?.IsMealMandatory ?? false
      );
      const seatMandatory = toBool(
        fq?.isseatmandatory ?? fq?.isSeatMandatory ?? false
      );
      state.rules.specialFare.isMealMandatory = mealMandatory;
      state.rules.specialFare.isSeatMandatory = seatMandatory;
    },
  },
});

export const { setValidationRules, setFareQuoteValidations } =
  flightValidationSlice.actions;

export default flightValidationSlice.reducer;
