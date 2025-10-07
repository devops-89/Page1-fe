// src/redux/flightValidations.js
export const flightValidations = {
  general: {
    passenger: {
      titleRequired: true,
      firstNameRequired: true,
      lastNameRequired: true,
      distinctNameForSpiceJet: true,
      genderRequired: true,
      dobRequiredFor: ['child', 'infant'],
      phoneNumberRequired: true,
    },
    paxTitles: {
      male: ['MR'],
      female: ['MRS', 'MS'],
      child: ['MR', 'MS'],
      infant: ['MSTR', 'MR', 'MS'],
    },
    nameRestrictions: {
      invalidCharacters: ['.', ',', '/'],
    },
  },

  LCC: {
    base: {
      addressRequired: false, // dynamic, set after FareQuote if LCC requires
      emailRequired: false,   // dynamic
    },
    airlineSpecific: {
      AirAsia: {
        countryCodeRequired: false,
        countryNameRequired: false,
        dobRequiredForAdultIntl: false,
      },
      FlyDubai: {
        baggageFromSSRRequired: false,
        baggagePriceMustBeZero: false,
      },
      SpiceJet: {
        distinctNameRequired: false,
        passportMandatoryForIntlTo: [], // fill dynamically based on SSR
      },
      IndiGo: {
        passportMandatoryForIntlTo: [],
      },
      TruJet: {
        noSpaceInLastName: false,
      },
      ZoomAir: {
        noSpaceInLastName: false,
      },
    },
  },

  PANPassport: {
    validationNodes: [
      'IsPanRequiredAtBook',
      'IsPanRequiredAtTicket',
      'IsPassportRequiredAtBook',
      'IsPassportRequiredAtTicket',
      'IsPassportFullDetailRequiredAtBook',
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
      Title: 'Mr',
      FirstName: 'ANKIT',
      LastName: 'MEHTA',
      PAN: 'GSBPM2112A',
    },
    passportDetailRequiredIf: {
      IsPassportFullDetailRequiredAtBook: false, // dynamic
      fields: ['PassportNo', 'PassportExpiry', 'PassportIssueDate', 'PassportIssueCountryCode'],
    },
  },

  specialFare: {
    isSeatMandatory: false,  // dynamic
    isMealMandatory: false,  // dynamic
    mustSelectFreeSSRFromResponse: true,
  },

  baggage: {
    intlLCC: {
      mustAddFreeBaggageFromSSR: false, // dynamic
      baggagePriceNode: 0,
      note: 'Free baggage (20kg/30kg/40kg) must be selected explicitly in Ticket request.',
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
      fareQuote: 'If ispricechanged: true → send updated price in Book/Ticket',
      bookResponse: 'If ispricechanged: true → set ispricechangedaccepted: true in Ticket request',
      ticketResponse: 'If ispricechanged: true → re-call Ticket with ispricechangedaccepted: true',
    },
    cancellationAccordingToUpdatedPrice: true,
  },

  gstValidation: {
    checkNode: 'IsGSTMandatory',
    IsGSTMandatory:false,
    mustPassGSTIfTrue: true,
  },
};
