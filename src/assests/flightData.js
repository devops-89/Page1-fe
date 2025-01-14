import logo1 from "@/icons/blogzine.svg";
import logo2 from "@/icons/folio.svg";
import logo3 from "@/icons/wizixo.svg";
import logo4 from "@/icons/airline.svg";
import { FARE_TYPE } from "@/utils/enum";

export const flightData = [
  {
    logo: logo1,
    airlineName: "Blogzine Airline",
    flightNumber: "FFR-5682",
    travelClass: "Economy",
    price: "$18,500",
    departureDetails: {
      departureTime: "14:50",
      departureAirportCode: "BOM",
      departureTerminal: "Terminal 2",
      departureLocation: "Mumbai, India",
    },
    timeTaken: "9hr 50min",
    arrivalDetails: {
      arrivalTime: "07:35",
      arrivalAirportCode: "JFK",
      arrivalTerminal: "Terminal 2",
      arrivalLocation: "New York, USA",
    },
    seatsLeft: "10",
    fareType: FARE_TYPE.NONREFUNDABLE,
    flightDetails: {
      //   flightInformation: {
      //     logo: logo1,
      //     airlineName: "Blogzine Airline",
      //     flightNumber: "FFR-5682",
      //     travelClass: "Economy",
      //     departureDetails: {
      //       departureTime: "14:50",
      //       departureAirportCode: "BOM",
      //       departureTerminal: "Terminal 2",
      //       departureLocation: "Mumbai, India",
      //     },
      //     timeTaken: "9hr 50min",
      //     arrivalDetails: {
      //       arrivalTime: "07:35",
      //       arrivalAirportCode: "JFK",
      //       arrivalTerminal: "Terminal 2",
      //       arrivalLocation: "New York, USA",
      //     },
      //   },
      fareDetail: [
        {
          value1: "$36,500",
          value2: "$1050",
          value3: "$37,500",
        },
      ],
      baggageDetails: [
        {
          value1: "Adult",
          value2: "2PC",
          value3: "7kg",
        },
      ],
      cancellationDetails: [
        {
          value1: "0 hours to 24 hours",
          value2: FARE_TYPE.NONREFUNDABLE,
        },
        {
          value1: "24 hours to 365 days",
          value2: "$16,325 + $250",
        },
      ],
    },
  },
  {
    logo: logo2,
    airlineName: "Phillippines Airline",
    flightNumber: "PA - 5620",
    travelClass: "Business",
    price: "$18,500",
    departureDetails: {
      departureTime: "14:50",
      departureAirportCode: "BOM",
      departureTerminal: "Terminal 2",
      departureLocation: "Mumbai, India",
    },
    timeTaken: "9hr 50min",
    arrivalDetails: {
      arrivalTime: "07:35",
      arrivalAirportCode: "JFK",
      arrivalTerminal: "Terminal 2",
      arrivalLocation: "New York, USA",
    },
    seatsLeft: "10",
    fareType: FARE_TYPE.NONREFUNDABLE,
    flightDetails: {
      //   flightInformation: {
      //     logo: logo1,
      //     airlineName: "Blogzine Airline",
      //     flightNumber: "FFR-5682",
      //     travelClass: "Economy",
      //     departureDetails: {
      //       departureTime: "14:50",
      //       departureAirportCode: "BOM",
      //       departureTerminal: "Terminal 2",
      //       departureLocation: "Mumbai, India",
      //     },
      //     timeTaken: "9hr 50min",
      //     arrivalDetails: {
      //       arrivalTime: "07:35",
      //       arrivalAirportCode: "JFK",
      //       arrivalTerminal: "Terminal 2",
      //       arrivalLocation: "New York, USA",
      //     },
      //   },
      fareDetail: [
        {
          value1: "$36,500",
          value2: "$1050",
          value3: "$37,500",
        },
      ],
      baggageDetails: [
        {
          value1: "Adult",
          value2: "2PC",
          value3: "7kg",
        },
      ],
      cancellationDetails: [
        {
          value1: "0 hours to 24 hours",
          value2: FARE_TYPE.NONREFUNDABLE,
        },
        {
          value1: "24 hours to 365 days",
          value2: "$16,325 + $250",
        },
      ],
    },
  },
  {
    logo: logo3,
    airlineName: "Wizixo Airline",
    flightNumber: "SA-1254",
    travelClass: "Economy",
    price: "$18,500",
    departureDetails: {
      departureTime: "14:50",
      departureAirportCode: "BOM",
      departureTerminal: "Terminal 2",
      departureLocation: "Mumbai, India",
    },
    timeTaken: "9hr 50min",
    arrivalDetails: {
      arrivalTime: "07:35",
      arrivalAirportCode: "JFK",
      arrivalTerminal: "Terminal 2",
      arrivalLocation: "New York, USA",
    },
    seatsLeft: "10",
    fareType: FARE_TYPE.NONREFUNDABLE,
    flightDetails: {
      //   flightInformation: {
      //     logo: logo1,
      //     airlineName: "Blogzine Airline",
      //     flightNumber: "FFR-5682",
      //     travelClass: "Economy",
      //     departureDetails: {
      //       departureTime: "14:50",
      //       departureAirportCode: "BOM",
      //       departureTerminal: "Terminal 2",
      //       departureLocation: "Mumbai, India",
      //     },
      //     timeTaken: "9hr 50min",
      //     arrivalDetails: {
      //       arrivalTime: "07:35",
      //       arrivalAirportCode: "JFK",
      //       arrivalTerminal: "Terminal 2",
      //       arrivalLocation: "New York, USA",
      //     },
      //   },
      fareDetail: [
        {
          value1: "$36,500",
          value2: "$1050",
          value3: "$37,500",
        },
      ],
      baggageDetails: [
        {
          value1: "Adult",
          value2: "2PC",
          value3: "7kg",
        },
      ],
      cancellationDetails: [
        {
          value1: "0 hours to 24 hours",
          value2: FARE_TYPE.NONREFUNDABLE,
        },
        {
          value1: "24 hours to 365 days",
          value2: "$16,325 + $250",
        },
      ],
    },
  },
  {
    logo: logo4,
    airlineName: "Folio Airline",
    flightNumber: "CCE-2158",
    travelClass: "Economy",
    price: "$18,500",
    departureDetails: {
      departureTime: "14:50",
      departureAirportCode: "BOM",
      departureTerminal: "Terminal 2",
      departureLocation: "Mumbai, India",
    },
    timeTaken: "9hr 50min",
    arrivalDetails: {
      arrivalTime: "07:35",
      arrivalAirportCode: "JFK",
      arrivalTerminal: "Terminal 2",
      arrivalLocation: "New York, USA",
    },
    seatsLeft: "10",
    fareType: FARE_TYPE.REFUNDABLE,
    flightDetails: {
      //   flightInformation: {
      //     logo: logo1,
      //     airlineName: "Blogzine Airline",
      //     flightNumber: "FFR-5682",
      //     travelClass: "Economy",
      //     departureDetails: {
      //       departureTime: "14:50",
      //       departureAirportCode: "BOM",
      //       departureTerminal: "Terminal 2",
      //       departureLocation: "Mumbai, India",
      //     },
      //     timeTaken: "9hr 50min",
      //     arrivalDetails: {
      //       arrivalTime: "07:35",
      //       arrivalAirportCode: "JFK",
      //       arrivalTerminal: "Terminal 2",
      //       arrivalLocation: "New York, USA",
      //     },
      //   },
      fareDetail: [
        {
          value1: "$36,500",
          value2: "$1050",
          value3: "$37,500",
        },
      ],
      baggageDetails: [
        {
          value1: "Adult",
          value2: "2PC",
          value3: "7kg",
        },
      ],
      cancellationDetails: [
        {
          value1: "0 hours to 24 hours",
          value2: FARE_TYPE.REFUNDABLE,
        },
        {
          value1: "24 hours to 365 days",
          value2: "$16,325 + $250",
        },
      ],
    },
  },
];
