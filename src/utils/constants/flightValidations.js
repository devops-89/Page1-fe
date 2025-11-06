// src/redux/flightValidations.js
export const flightValidations = {
  general: {
    passenger: {
      titleRequired: true,
      firstNameRequired: true,
      lastNameRequired: true,
      genderRequired: true,
      dobRequiredFor: ["child", "infant"],
      phoneNumberRequired: true,
    },
    paxTitles: {
      male: ["MR"],
      female: ["MRS", "MS"],
      child: ["MR", "MS"],
      infant: ["MSTR", "MR", "MS"],
    },
    nameRestrictions: {
      invalidCharacters: [".", ",", "/"],
    },
  },

  LCC: {
    isLCC: false,
    airlineSpecific: {
      AirAsia: {
        codes: ["I5", "AK", "FD", "QZ", "D7", "Z2"],
        isSourceAirAsia: false,
        isAirAsia: false,
      },
      spiceJet: {
        code: ["SG"],
        isSpiceJet: false,
      },
      flyDubai: {
        code: ["FZ"],
        isFlyDubai: false,
      },
      TrueJetAndZoomAir: {
        codes: ["ZO", "2T", "6E"],
        isTrueJetAndZoomAir: false,
      },
    },
    bhutanAirlines: {
      code: "B3",
      isBhutanAirlines: false,
    },
    destination: {
      countrycode: ["AE", "SA"],
      nepalCountry: "NP",
    },
    isPassport: false,
    isPassportAdultChildOnly: false,
  },

  PANPassport: {
    validationNodes: [
      "IsPanRequiredAtBook",
      "IsPanRequiredAtTicket",
      "IsPassportRequiredAtBook",
      "IsPassportRequiredAtTicket",
      "IsPassportFullDetailRequiredAtBook",
    ],
    rules: {
      adult: {
        mustMatchPANOrPassportName: true,
        guardianNotAllowed: true,
      },
      teen: {
        ageRange: [12, 18],
        paxPANPreferred: true,
        guardianIgnoredIfPANGiven: true,
      },
      childOrInfant: {
        guardianPANOrPassportRequired: true,
      },
    },
    guardianDetailsFormat: {
      Title: "Mr",
      FirstName: "ANKIT",
      LastName: "MEHTA",
      PAN: "GSBPM2112A",
    },
    // passportDetailRequiredIf: {
    //   IsPassportFullDetailRequiredAtBook: false, // dynamic
    //   fields: [
    //     "PassportNo",
    //     "PassportExpiry",
    //     "PassportIssueDate",
    //     "PassportIssueCountryCode",
    //   ],
    // },
  },

  specialFare: {
    isSeatMandatory: false,
    isMealMandatory: false,
  },

  baggage: {
    intlLCC: {
      mustAddFreeBaggageFromSSR: false, // dynamic
      baggagePriceNode: 0,
      note: "Free baggage (20kg/30kg/40kg) must be selected explicitly in Ticket request.",
    },
    domestic: {
      ifSourceIsI5: {
        mustPassMealAndBaggageWithPriceZero: false, // dynamic
      },
    },
  },

  fareValidation: {
    mustDivideBaseFareAndTaxByPassengerCount: true,
    mustRecalculatePublishedAndOfferedFare: true,
    handlePriceChangeFlow: {
      fareQuote: "If ispricechanged: true → send updated price in Book/Ticket",
      bookResponse:
        "If ispricechanged: true → set ispricechangedaccepted: true in Ticket request",
      ticketResponse:
        "If ispricechanged: true → re-call Ticket with ispricechangedaccepted: true",
    },
    cancellationAccordingToUpdatedPrice: true,
  },

  gstValidation: {
    checkNode: "IsGSTMandatory",
    IsGSTMandatory: false,
    // mustPassGSTIfTrue: true,
  },
};
