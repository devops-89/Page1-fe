import banner1 from "@/banner/banner6.jpg";
import banner2 from "@/banner/banner4.jpg";
import flight from "@/services/flight.png";
import hotels from "@/services/hotel.png";
import helicopter from "@/services/helicopter.png";
import packages from "@/services/holiday_packages.png";
import cabs from "@/services/cabs.png";
import ourHotels from "@/services/ourHotels.png";
import wedding from "@/services/wedding.png";
import gift from "@/services/gift.png";
import forex from "@/services/forex.png";
import selfDrive from "@/services/selfDrive.png";
import outStationCabs from "@/services/outStationCabs.png";
import activities from "@/services/activities.png";
import hotel1 from "@/hotel/hotel-1.webp";
import hotel2 from "@/hotel/hotel-2.webp";
import hotel3 from "@/hotel/hotel-3.webp";
import hotel5 from "@/hotel/hotel-5.webp";
import hotel6 from "@/hotel/hotel-6.webp";
import hotel7 from "@/hotel/hotel-7.webp";
import hotel8 from "@/hotel/hotel-8.webp";
import hotel9 from "@/hotel/hotel-9.webp";
import user1 from "@/testimonials/img-1.jpg";
import user2 from "@/testimonials/img-2.jpg";
import user3 from "@/testimonials/img-3.jpg";
import user4 from "@/testimonials/img-5.jpg";
import card1 from "@/visa.svg";
import card2 from "@/amex.svg";
import card3 from "@/discover.svg";
import card4 from "@/master.svg";
import card5 from "@/stripe.svg";
import card6 from "@/paypal.svg";
import {
  AttachMoney,
  BarChartOutlined,
  BeenhereOutlined,
  CalendarMonth,
  CalendarMonthOutlined,
  Dashboard,
  Email,
  Favorite,
  HeadphonesOutlined,
  LocalAtmOutlined,
  LocationOn,
  PersonOutlineOutlined,
  Phone,
  PublicOutlined,
  Reviews,
  TourOutlined,
  Wallet,
} from "@mui/icons-material";
import { COLORS } from "@/utils/colors";
import cabService1 from "@/cabs/services-1.png";
import cabService2 from "@/cabs/services-2.png";
import cabService3 from "@/cabs/services-3.png";
import cabService4 from "@/cabs/services-4.png";
import tour1 from "@/tours/jersey.jpg";
import tour2 from "@/tours/newYor.jpg";
import tour3 from "@/tours/delaware.jpg";
import tour4 from "@/tours/california.jpg";
import tour5 from "@/tours/Losangeles.jpg";
import tour6 from "@/tours/nevada.jpg";
import tour7 from "@/tours/virginia.jpg";
import tour8 from "@/tours/wilmington.jpg";
import { FLIGHT_CLASS, FLIGHT_DETAILS } from "@/utils/enum";
export const data = {
  headerLinks: [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "About",
      url: "/about",
    },
    {
      label: "Cabs ",
      url: "/cabs",
    },
    {
      label: "packages ",
      url: "/packages",
    },
    {
      label: "Contact",
      url: "/contact",
    },
  ],
  heroSectionData: [
    {
      img: banner1.src,
      title: "Discover Amazing Places With Us",
    },
    {
      img: banner2.src,
      title: "Let's Discover The World Together",
    },
  ],
  servicesData: [
    {
      img: flight,
      title: "Flight",
      url: "/flight",
    },
    {
      img: hotels,
      title: "Hotels",
      url: "/hotel-list",
    },
    {
      img: helicopter,
      title: "helicopter",
      url: "/helicopter",
    },
    {
      img: packages,
      title: "holiday packages",
      url: "/packages",
    },
    {
      img: cabs,
      title: "cabs",
      url: "/cabs",
    },
    {
      img: ourHotels,
      title: "Our Hotels",
      url: "/our-hotels",
    },
    {
      img: wedding,
      title: "Destination Wedding",
      url: "/destination-wedding",
    },
    {
      img: gift,
      title: "Gift Cards",
      ur: "/gift-cards",
    },
    {
      img: forex,
      title: "Forex",
      url: "/forex",
    },
    {
      img: selfDrive,
      title: "Self Drive",
      ur: "/self-drive",
    },
    {
      img: outStationCabs,
      title: "Outstation Cabs",
      url: "/outstation-cabs",
    },
    {
      img: activities,
      title: "Activities",
      url: "/activities",
    },
  ],
  hotelName: [
    {
      img: hotel1.src,
      hotelName: "Ritz-Carlton Hotel",
      rooms: "3 Rooms",
      bathroom: "1 Bathroom",
      location: "Lucknow",
      rating: 2.5,
      follower: "1.5k",
      price: 2999,
    },
    {
      img: hotel2.src,
      hotelName: "JW Marriott Mumbai Juhu",
      rooms: "1 Room",
      bathroom: "1 Bathroom",
      location: "Mumbai",
      rating: 3,
      price: 3599,
      follower: "2.3k",
    },
    {
      img: hotel3.src,
      hotelName: "Hyatt | Mumbai , Maharashtra",
      rooms: "2 Rooms",
      bathroom: "1 Bathroom",
      location: "Maharashtra",
      rating: 4,
      price: 3999,
      follower: "3.5k",
    },
    {
      img: hotel5.src,
      hotelName: "The Taj Mahal Palace, Mumbai",
      rooms: "3 Rooms",
      bathroom: "1 Bathroom",
      location: "Mumbai",
      rating: 4.5,
      price: 15000,
      follower: "3.5k",
    },
    {
      img: hotel6.src,
      hotelName: "Hotel Sahara Star-Mumbai Airport",
      rooms: "3 Rooms",
      bathroom: "1 Bathroom",
      location: "Mumbai",
      rating: 3.5,
      price: 14000,
      follower: "3.5k",
    },
    {
      img: hotel7.src,
      hotelName: "The LaLiT New Delhi",
      rooms: "3 Rooms",
      bathroom: "1 Bathroom",
      location: "Delhi",
      rating: 3.5,
      price: 14000,
      follower: "3.5k",
    },
    {
      img: hotel8.src,
      hotelName: "The Leela Ambience Convention Hotel Delhi",
      rooms: "3 Rooms",
      bathroom: "1 Bathroom",
      location: "Delhi",
      rating: 3.5,
      price: 14000,
      follower: "3.5k",
    },
    {
      img: hotel9.src,
      hotelName: "Taj Palace, New Delhi",
      rooms: "3 Rooms",
      bathroom: "1 Bathroom",
      location: "Delhi",
      rating: 3.5,
      price: 14000,
      follower: "3.5k",
    },
  ],
  airportData: [
    {
      primary: "New York",
      secondary: "Ken international Airport",
    },
    {
      primary: "Boston",
      secondary: "Boston Logan International Airport",
    },

    {
      primary: "Northern Virginia",
      secondary: "Dulles International Airport",
    },
    {
      primary: "Los Angeles",
      secondary: "Los Angeles International Airport",
    },
    {
      primary: "Orladno",
      secondary: "Orlando International Airport",
    },
  ],
  testimonialData: [
    {
      img: user1,
      description:
        "Had my best trip ever with Page 1 Travels. The planning, the stay, the food, the staff everything was just on point. Couldn't appreciate Page1 Travels enough. The trip was safe and all the services were great too. Looking forward to planning more trips with Page1 Travels.",
      name: "Emma Bryan",
      heading: "Unforgettable Journey",
    },
    {
      img: user2,
      description:
        "Had a unique and memorable experience with Page1 Travels. The stay was beautiful and the whole trip was amazingly organized.Loved my first experience with Page1 Travels. Loved our hotel  and meals, and the credit goes to Page1 Travels.",
      name: "Andrew Fetcher",
      heading: "Memorable Experience",
    },
    {
      img: user3,
      description:
        "Kudos to Page1 Travels for organizing the perfect trip for us.The stay was comfortable, and the food was great too. Apart from that, the drivers and tour guides were polite and professional too. Thank you Page1 Travels for this amazing experience.",
      name: "james Andrew",
      heading: "Perfect Getaway",
    },
    {
      img: user4,
      description:
        "Page1 Travels provided us with a hassle-free and well-planned trip. They made our first family trip a great success. I would love to recommend Page1 Travels to whoever is planning a vacation.",
      name: "Bryan Bradfield",
      heading: "Seamless Adventure",
    },
  ],
  faq: [
    {
      label: "On my vacation, what kind of meals can I expect to eat?",
      value:
        "Food is one of the most exciting parts of a trip. The local food primarily depends on the destination you choose to travel to. Moreover, your daily meals depend on the budget and type of package you select.",
    },
    {
      label: "What services does Page1Travels provide?",
      value:
        "Kindly visit our Services page if you wish to know about our services.",
    },

    {
      label: "How safe is my luggage whilst on the trip?",
      value:
        "We take every measure to keep your valuables safe while travelling. But still, both lockable luggage and travel insurance are a must to avoid any loss.",
    },
    {
      label: "How can I know about the current offers?",
      value:
        "For current offers and packages kindly visit the Packages section on our website. You can find all related information on that page. Moreover, for further details, you can Contact Us.",
    },
  ],
  services: [
    {
      label: "Helicopter",
      url: "/helicopter",
    },
    {
      label: "hotels",
      url: "/hotels",
    },
    {
      label: "Helicopter",
      url: "/helicopter",
    },
    {
      label: "holiday Packages",
      url: "/holiday-packages",
    },
    {
      label: "Cabs",
      url: "/cabs",
    },
    {
      label: "Wedding",
      url: "/destination-wedding",
    },
    {
      label: "forex",
      url: "/forex",
    },
    {
      label: "Self Drive",
      url: "/self-drive",
    },
    {
      label: "Activities",
      url: "/activities",
    },
    {
      label: "Our Hotels",
      url: "/our-hotels",
    },
  ],
  company: [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "About Us",
      url: "/about",
    },
    {
      label: "Contact Us",
      url: "/contact",
    },
    {
      label: "packages",
      url: "/packages",
    },
    {
      label: "blogs",
      url: "/blogs",
    },
  ],
  support: [
    {
      label: "Privacy Policy",
      url: "/privacy-policy",
    },
    {
      label: "Terms of use",
      url: "/terms-of-use",
    },
    {
      label: "Refund Policy",
      url: "/refund-policy",
    },
    {
      label: "Cancellation Policy",
      url: "/cancelation-policy",
    },
    {
      label: "Terms & Conditions",
      url: "/terms-&-conditions",
    },
  ],
  destinations: [
    {
      label: "United States",
    },
    {
      label: "United Kingdom",
    },
    {
      label: "Australia",
    },
    {
      label: "india",
    },
    {
      label: "South Africa",
    },
    {
      label: "Indonesia",
    },
  ],
  cards: [
    {
      img: card1,
    },
    {
      img: card2,
    },
    {
      img: card3,
    },
    {
      img: card4,
    },
    {
      img: card5,
    },
    {
      img: card6,
    },
  ],

  choose: [
    {
      icon: <BeenhereOutlined sx={{ color: COLORS.WHITE, fontSize: 20 }} />,
      heading: "Convenience",
      description:
        "Plan your entire trip from one platform, saving you time and effort. No more hopping between different websites .",
    },
    {
      icon: <LocalAtmOutlined sx={{ color: COLORS.WHITE, fontSize: 20 }} />,
      heading: "Best Price Guarantee",
      description:
        "We work with trusted travel partners to bring you the best deals, whether you're booking a flight, hotel, or car rental.",
    },
    {
      icon: <HeadphonesOutlined sx={{ color: COLORS.WHITE, fontSize: 20 }} />,
      heading: "Customer Support",
      description:
        "Our dedicated support team is here for you 24/7, ensuring your travel plans go smoothly from start to finish.",
    },
    {
      icon: <TourOutlined sx={{ color: COLORS.WHITE, fontSize: 20 }} />,
      heading: "Tailored Travel Experiences",
      description:
        "Whether you're traveling for business, family vacations, or a solo adventure, we provide options that suit every needs",
    },
  ],
  counterData: [
    {
      icon: <PublicOutlined sx={{ color: COLORS.PRIMARY, fontSize: 20 }} />,
      heading: "Destinations Worldwide",
      count: 100,
    },
    {
      icon: (
        <CalendarMonthOutlined sx={{ color: COLORS.PRIMARY, fontSize: 20 }} />
      ),
      heading: "Booking Completed",
      count: 416,
    },
    {
      icon: (
        <PersonOutlineOutlined sx={{ color: COLORS.PRIMARY, fontSize: 20 }} />
      ),
      heading: "Client Globally",
      count: 450,
    },
    {
      icon: <BarChartOutlined sx={{ color: COLORS.PRIMARY, fontSize: 20 }} />,
      heading: "Providers Registered",
      count: 400,
    },
  ],
  taxiOptions: [
    {
      label: "Hybrid",
    },
    {
      label: "Town",
    },
    {
      label: "SUV",
    },
    {
      label: "Sedan",
    },
    {
      label: "Limousine",
    },
  ],
  capacity: [
    {
      label: "2 Seater",
    },
    {
      label: "4 Seater",
    },
    {
      label: "5 Seater",
    },
    {
      label: "7 Seater",
    },
    {
      label: "9 Seater",
    },
  ],
  cabServices: [
    {
      img: cabService1,
      heading: "City Transfer",
      description:
        "If you want to travel to different cities during your trip then we have got you covered with our city transfer service.",
    },
    {
      img: cabService2,
      heading: "Booking Offer",
      description:
        "Be it a one-way ride or a complete round trip, Page1 Travels has got exclusive deals and discounts for everyone.",
    },
    {
      img: cabService4,
      heading: "Baggage Transport",
      description:
        "Safely transport your baggage on your trips with our affordable and reliable baggage transportation service.",
    },
    {
      img: cabService3,
      heading: "Airport Transfer",
      description:
        "Our airport transfer service ensures that you can conveniently travel from the airport to the city or the other way around.",
    },
  ],
  tourDestination: [
    {
      label: "Andaman & Nicobar",
    },
    {
      label: "Australia",
    },
    {
      label: "Bali",
    },
    {
      label: "Chennai",
    },
    {
      label: "Daman & Diu",
    },
    {
      label: "Delhi",
    },
    {
      label: "Dubai",
    },
    {
      label: "Agra",
    },
    {
      label: "France",
    },
    {
      label: "Goa",
    },
    {
      label: "Himachal",
    },
    {
      label: "Hong Kong",
    },
    {
      label: "Istanbul",
    },
  ],
  popoverData: [
    {
      label: "Dashboard",
      url: "/profile/dashboard",
    },
    {
      label: "My Booking",
      url: "/profile/my-booking",
    },
    {
      label: "My Profile",
      url: "/profile/my-profile",
    },
    {
      label: "Settings",
      url: "/profile/settings",
    },
    {
      label: "Logout",
      url: "/login",
    },
  ],
  toursData: [
    {
      img: tour1.src,
      location: "New Jersey",
      title: "Start in Los Angeles and end in San Francisco",
      price: "633.00",
      duration: "full day",
      rating: 4.5,
    },
    {
      img: tour2.src,
      location: "New York City",
      title: "Western Blt From San Francisco",
      price: "300.00",
      duration: "5 hours",
      rating: 4.5,
    },
    {
      img: tour3.src,
      location: "Delaware",
      title: "California and the Golden West Summer 2019",
      price: "1200.00",
      duration: "5 hours",
      rating: 3.5,
    },
    {
      img: tour4.src,
      location: "California",
      title: "River Cruise Tour on the Seine Eum eu albucius perfecto",
      price: "900.00",
      duration: "2 days",
      rating: 4,
    },
    {
      img: tour5.src,
      location: "Los Angeles",
      title: "Cannes and Antibes Night Tour",
      price: "900.00",
      duration: "10 Hours",
      rating: 4,
    },
    {
      img: tour6.src,
      location: "Nevada",
      title: "Mont Saint Michel Day Trip: Times Square, Rockefeller",
      price: "300.00",
      duration: "5 Hours",
      rating: 5,
    },
    {
      img: tour7.src,
      location: "Virginia Beach",
      title: "Tastes and Sounds of the South 2019",
      price: "300.00",
      duration: "5 Hours",
      rating: 5,
    },
    {
      img: tour8.src,
      location: "Wilmington",
      title: "Small-Group Niagara Falls Day Tour from Toronto",
      price: "1000.00",
      duration: "4 days",
      rating: 5,
    },
  ],

  contactData: [
    {
      icon: <Email />,
      contactType: "Email Address",
      contactInfo: "dreamtourinfo@example.com",
    },
    {
      icon: <Phone />,
      contactType: "Phone Number",
      contactInfo: "+1 81649 48103",
    },
    {
      icon: <LocationOn />,
      contactType: "Our Location",
      contactInfo: "2077 Chicago Avenue Orosi, CA 93647",
    },
  ],

  sidebarDashboard: [
    {
      heading: "main",
      links: [
        {
          icon: <Dashboard sx={{ fontSize: 14 }} />,
          label: "Dashboard",
          url: "/profile/dashboard",
        },
        {
          icon: <CalendarMonth sx={{ fontSize: 14 }} />,
          label: "My Bookings",
          url: "/profile/bookings",
        },
        {
          icon: <Reviews sx={{ fontSize: 14 }} />,
          label: "My Reviews",
          url: "/profile/reviews",
        },
        {
          icon: <Favorite sx={{ fontSize: 14 }} />,
          label: "Wishlist",
          url: "/profile/wishlist",
        },
      ],
    },
  ],
  countDataDashboard: [
    {
      icon: <CalendarMonth sx={{ fontSize: 30 }} />,
      number: 80,
      title: "Total Bookings",
    },
    {
      icon: <AttachMoney sx={{ fontSize: 30 }} />,
      number: "5.3k",
      title: "Total Transactions",
    },
    {
      icon: <Wallet sx={{ fontSize: 30 }} />,
      number: "₹5965",
      title: "Average Value",
    },
  ],
  flightTab: [
    {
      label: FLIGHT_DETAILS.FLIGHT_INFORMATIon,
    },
    {
      label: FLIGHT_DETAILS.FARE_DETAIL,
    },
    {
      label: FLIGHT_DETAILS.BAGGAGE_RULES,
    },
  ],

  multiflightTab: [
    {
      label: FLIGHT_DETAILS.FLIGHT_INFORMATIon,
    },
    {
      label: FLIGHT_DETAILS.BAGGAGE_RULES,
    },
  ],
  flightFareHead: [
    // {
    //   label: "Base Fare",
    // },
    // {
    //   label: "Taxes and Fees",
    // },
    {
      label: "Total Fare",
    },
    {
      label: "Tax",
    },
  ],
  fightFareData: [
    {
      value1: "₹36,500",
      value2: "₹1050",
      value3: "₹37,550",
    },
  ],
  flightBaggageHead: [
    {
      label: "Baggage",
    },
    {
      label: "Cabin Baggage",
    },
  ],
  flightBaggageDetails: [
    {
      value2: "2PC",
      value3: "7Kg",
    },
  ],
  flightCancellationHeader: [
    {
      label: "Time Frame",
    },
    {
      label: "Air Free + MMT Free",
    },
  ],
  flightCancellationData: [
    {
      value1: "0 hours to 24 hours",
      value2: "Non refundable",
    },
    {
      value1: "24 hours to 365 days",
      value2: "	₹16,325 + ₹250",
    },
  ],

  FLIGHT_CLASS_DATA: [
    {
      label: FLIGHT_CLASS.ALL,
      value: "1",
    },
    {
      label: FLIGHT_CLASS.ECONOMY,
      value: "2",
    },

    {
      label: FLIGHT_CLASS.PREMIUMECONOMY,
      value: "3",
    },
    {
      label: FLIGHT_CLASS.BUSINESS,
      value: "4",
    },
    {
      label: FLIGHT_CLASS.PREMIUMBUSINESS,
      value: "5",
    },
    {
      label: FLIGHT_CLASS.FIRST,
      value: "6",
    },
  ],
  flightDetails: {
    flightData: {
      origin: "New Delhi",
      destination: "Bengaluru",
      date: "Thursday, Jan 16",
      duration: "3h 5m",
      airline: "Akasa Air",
      flightNumber: "QP 1350",
      class: "Economy Saver",
    },
    travelerData: {
      Adult: [],
      Child: [],
      Infant: [],
    },
    fareSummary: [
      {
        label: "Base Fare",
        amount: 41186,
      },
      {
        label: "Taxes and Surcharges",
        amount: 5004,
      },
    ],
    taxBreakup: [
      {
        key: "K3",
        value: 196,
      },
      {
        key: "YQTax",
        value: 900,
      },
      {
        key: "YR",
        value: 65,
      },
      {
        key: "PSF",
        value: 91,
      },
      {
        key: "UDF",
        value: 12,
      },
      {
        key: "INTax",
        value: 0,
      },
      {
        key: "TransactionFee",
        value: 0,
      },
      {
        key: "OtherTaxes",
        value: 0,
      },
    ],
  },

  seatsData: [
    { row: 1, col: "A", price: 9, status: "available" },
    { row: 1, col: "B", price: 9, status: "available" },
    { row: 1, col: "C", price: 9, status: "available" },
    { row: 1, col: "D", price: 9, status: "available" },
    { row: 1, col: "E", price: 9, status: "available" },
    { row: 1, col: "F", price: 9, status: "available" },
    { row: 2, col: "A", price: 5, status: "unavailable" },
    { row: 2, col: "B", price: 5, status: "available" },
    { row: 2, col: "C", price: 5, status: "reserved" },
    { row: 2, col: "D", price: 9, status: "available" },
    { row: 2, col: "E", price: 9, status: "available" },
    { row: 2, col: "F", price: 9, status: "available" },
    { row: 3, col: "A", price: 5, status: "unavailable" },
    { row: 3, col: "B", price: 5, status: "unavailable" },
    { row: 3, col: "C", price: 5, status: "available" },
    { row: 3, col: "D", price: 9, status: "available" },
    { row: 3, col: "E", price: 9, status: "reserved" },
    { row: 3, col: "F", price: 9, status: "available" },
    { row: 4, col: "A", price: 12, status: "available" },
    { row: 4, col: "B", price: 12, status: "available" },
    { row: 4, col: "C", price: 12, status: "available" },
    { row: 4, col: "D", price: 9, status: "available" },
    { row: 4, col: "E", price: 9, status: "available" },
    { row: 4, col: "F", price: 9, status: "available" },
    { row: 5, col: "A", price: 12, status: "available" },
    { row: 5, col: "B", price: 5, status: "selected" },
    { row: 5, col: "C", price: 5, status: "available" },
    { row: 5, col: "D", price: 5, status: "available" },
    { row: 5, col: "E", price: 9, status: "available" },
    { row: 5, col: "F", price: 9, status: "available" },
  ],

  our_hotelers: [
    {
      name: "SinQ Beach Resort",
      location: {
        city: "Calangute",
        distanceInfo: "6 minutes walk to Calangute Beach",
      },
      tags: ["Couple Friendly"],
      services: ["Swimming Pool", "Free Wi-Fi", "Gym", "Restaurant"],
      description:
        "Near Calangute Beach, stunning pool area surrounded by lush greenery, room with pool views",
      images: {
        main: "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",
        thumbnails: [
          "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",
          "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",
          "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",
          "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",
        ],
      },
      rating: {
        label: "Very Good",
        score: 4.5,
        reviewCount: 57302,
      },
      price: {
        original: 698,
        discounted: 598,
        taxesInfo: "₹598 taxes & fees Per Night",
      },
      additionalInfo: "Login to book Now & Pay Later!",
    },
    {
      name: "The Grand Palace",
      location: {
        city: "Mumbai",
        distanceInfo: "10 minutes walk to Marine Drive",
      },
      tags: ["Luxury Stay", "Family Friendly"],
      services: ["Spa", "Valet Parking", "Rooftop Bar", "Swimming Pool"],
      description:
        "Experience unparalleled luxury with views of the Arabian Sea.",
      images: {
        main: "https://via.placeholder.com/300x200",
        thumbnails: [
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
        ],
      },
      rating: {
        label: "Excellent",
        score: 4.8,
        reviewCount: 4305,
      },
      price: {
        original: 1200,
        discounted: 950,
        taxesInfo: "₹950 taxes & fees Per Night",
      },
      additionalInfo: "Free cancellation available!",
    },
    {
      name: "Mountain Retreat",
      location: {
        city: "Manali",
        distanceInfo: "5 minutes walk to Mall Road",
      },
      tags: ["Nature Friendly", "Adventure"],
      services: [
        "Bonfire",
        "Mountain Views",
        "Trekking Assistance",
        "Outdoor Games",
      ],
      description: "Reconnect with nature at this serene mountain retreat.",
      images: {
        main: "https://via.placeholder.com/300x200",
        thumbnails: [
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
        ],
      },
      rating: {
        label: "Good",
        score: 4.2,
        reviewCount: 2850,
      },
      price: {
        original: 450,
        discounted: 399,
        taxesInfo: "₹399 taxes & fees Per Night",
      },
      additionalInfo: "Special discount for trekkers!",
    },
    {
      name: "Ocean View Paradise",
      location: {
        city: "Goa",
        distanceInfo: "2 minutes walk to Baga Beach",
      },
      tags: ["Beachfront", "Pet Friendly"],
      services: [
        "Private Beach Access",
        "Water Sports",
        "Beach Bar",
        "Kids Play Area",
      ],
      description:
        "Wake up to the sound of waves and enjoy private beach access.",
      images: {
        main: "https://via.placeholder.com/300x200",
        thumbnails: [
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
        ],
      },
      rating: {
        label: "Very Good",
        score: 4.6,
        reviewCount: 6790,
      },
      price: {
        original: 800,
        discounted: 750,
        taxesInfo: "₹750 taxes & fees Per Night",
      },
      additionalInfo: "Book now for a free dinner voucher!",
    },
    {
      name: "Urban Stay",
      location: {
        city: "Delhi",
        distanceInfo: "5 minutes drive to Connaught Place",
      },
      tags: ["Business Friendly", "Urban Luxury"],
      services: [
        "Conference Rooms",
        "Free Wi-Fi",
        "City Tours",
        "24/7 Room Service",
      ],
      description:
        "The perfect blend of business and leisure in the heart of the city.",
      images: {
        main: "https://via.placeholder.com/300x200",
        thumbnails: [
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
          "https://via.placeholder.com/100x100",
        ],
      },
      rating: {
        label: "Excellent",
        score: 4.9,
        reviewCount: 9843,
      },
      price: {
        original: 900,
        discounted: 850,
        taxesInfo: "₹850 taxes & fees Per Night",
      },
      additionalInfo: "Business packages available on request!",
    },
  ],

  countries: [
    { code: "AD", label: "Andorra", phone: "376" },
    {
      code: "AE",
      label: "United Arab Emirates",
      phone: "971",
    },
    { code: "AF", label: "Afghanistan", phone: "93" },
    {
      code: "AG",
      label: "Antigua and Barbuda",
      phone: "1-268",
    },
    { code: "AI", label: "Anguilla", phone: "1-264" },
    { code: "AL", label: "Albania", phone: "355" },
    { code: "AM", label: "Armenia", phone: "374" },
    { code: "AO", label: "Angola", phone: "244" },
    { code: "AQ", label: "Antarctica", phone: "672" },
    { code: "AR", label: "Argentina", phone: "54" },
    { code: "AS", label: "American Samoa", phone: "1-684" },
    { code: "AT", label: "Austria", phone: "43" },
    {
      code: "AU",
      label: "Australia",
      phone: "61",
      suggested: true,
    },
    { code: "AW", label: "Aruba", phone: "297" },
    { code: "AX", label: "Alland Islands", phone: "358" },
    { code: "AZ", label: "Azerbaijan", phone: "994" },
    {
      code: "BA",
      label: "Bosnia and Herzegovina",
      phone: "387",
    },
    { code: "BB", label: "Barbados", phone: "1-246" },
    { code: "BD", label: "Bangladesh", phone: "880" },
    { code: "BE", label: "Belgium", phone: "32" },
    { code: "BF", label: "Burkina Faso", phone: "226" },
    { code: "BG", label: "Bulgaria", phone: "359" },
    { code: "BH", label: "Bahrain", phone: "973" },
    { code: "BI", label: "Burundi", phone: "257" },
    { code: "BJ", label: "Benin", phone: "229" },
    { code: "BL", label: "Saint Barthelemy", phone: "590" },
    { code: "BM", label: "Bermuda", phone: "1-441" },
    { code: "BN", label: "Brunei Darussalam", phone: "673" },
    { code: "BO", label: "Bolivia", phone: "591" },
    { code: "BR", label: "Brazil", phone: "55" },
    { code: "BS", label: "Bahamas", phone: "1-242" },
    { code: "BT", label: "Bhutan", phone: "975" },
    { code: "BV", label: "Bouvet Island", phone: "47" },
    { code: "BW", label: "Botswana", phone: "267" },
    { code: "BY", label: "Belarus", phone: "375" },
    { code: "BZ", label: "Belize", phone: "501" },
    {
      code: "CA",
      label: "Canada",
      phone: "1",
      suggested: true,
    },
    {
      code: "CC",
      label: "Cocos (Keeling) Islands",
      phone: "61",
    },
    {
      code: "CD",
      label: "Congo, Democratic Republic of the",
      phone: "243",
    },
    {
      code: "CF",
      label: "Central African Republic",
      phone: "236",
    },
    {
      code: "CG",
      label: "Congo, Republic of the",
      phone: "242",
    },
    { code: "CH", label: "Switzerland", phone: "41" },
    { code: "CI", label: "Cote d'Ivoire", phone: "225" },
    { code: "CK", label: "Cook Islands", phone: "682" },
    { code: "CL", label: "Chile", phone: "56" },
    { code: "CM", label: "Cameroon", phone: "237" },
    { code: "CN", label: "China", phone: "86" },
    { code: "CO", label: "Colombia", phone: "57" },
    { code: "CR", label: "Costa Rica", phone: "506" },
    { code: "CU", label: "Cuba", phone: "53" },
    { code: "CV", label: "Cape Verde", phone: "238" },
    { code: "CW", label: "Curacao", phone: "599" },
    { code: "CX", label: "Christmas Island", phone: "61" },
    { code: "CY", label: "Cyprus", phone: "357" },
    { code: "CZ", label: "Czech Republic", phone: "420" },
    {
      code: "DE",
      label: "Germany",
      phone: "49",
      suggested: true,
    },
    { code: "DJ", label: "Djibouti", phone: "253" },
    { code: "DK", label: "Denmark", phone: "45" },
    { code: "DM", label: "Dominica", phone: "1-767" },
    {
      code: "DO",
      label: "Dominican Republic",
      phone: "1-809",
    },
    { code: "DZ", label: "Algeria", phone: "213" },
    { code: "EC", label: "Ecuador", phone: "593" },
    { code: "EE", label: "Estonia", phone: "372" },
    { code: "EG", label: "Egypt", phone: "20" },
    { code: "EH", label: "Western Sahara", phone: "212" },
    { code: "ER", label: "Eritrea", phone: "291" },
    { code: "ES", label: "Spain", phone: "34" },
    { code: "ET", label: "Ethiopia", phone: "251" },
    { code: "FI", label: "Finland", phone: "358" },
    { code: "FJ", label: "Fiji", phone: "679" },
    {
      code: "FK",
      label: "Falkland Islands (Malvinas)",
      phone: "500",
    },
    {
      code: "FM",
      label: "Micronesia, Federated States of",
      phone: "691",
    },
    { code: "FO", label: "Faroe Islands", phone: "298" },
    {
      code: "FR",
      label: "France",
      phone: "33",
      suggested: true,
    },
    { code: "GA", label: "Gabon", phone: "241" },
    { code: "GB", label: "United Kingdom", phone: "44" },
    { code: "GD", label: "Grenada", phone: "1-473" },
    { code: "GE", label: "Georgia", phone: "995" },
    { code: "GF", label: "French Guiana", phone: "594" },
    { code: "GG", label: "Guernsey", phone: "44" },
    { code: "GH", label: "Ghana", phone: "233" },
    { code: "GI", label: "Gibraltar", phone: "350" },
    { code: "GL", label: "Greenland", phone: "299" },
    { code: "GM", label: "Gambia", phone: "220" },
    { code: "GN", label: "Guinea", phone: "224" },
    { code: "GP", label: "Guadeloupe", phone: "590" },
    { code: "GQ", label: "Equatorial Guinea", phone: "240" },
    { code: "GR", label: "Greece", phone: "30" },
    {
      code: "GS",
      label: "South Georgia and the South Sandwich Islands",
      phone: "500",
    },
    { code: "GT", label: "Guatemala", phone: "502" },
    { code: "GU", label: "Guam", phone: "1-671" },
    { code: "GW", label: "Guinea-Bissau", phone: "245" },
    { code: "GY", label: "Guyana", phone: "592" },
    { code: "HK", label: "Hong Kong", phone: "852" },
    {
      code: "HM",
      label: "Heard Island and McDonald Islands",
      phone: "672",
    },
    { code: "HN", label: "Honduras", phone: "504" },
    { code: "HR", label: "Croatia", phone: "385" },
    { code: "HT", label: "Haiti", phone: "509" },
    { code: "HU", label: "Hungary", phone: "36" },
    { code: "ID", label: "Indonesia", phone: "62" },
    { code: "IE", label: "Ireland", phone: "353" },
    { code: "IL", label: "Israel", phone: "972" },
    { code: "IM", label: "Isle of Man", phone: "44" },
    { code: "IN", label: "India", phone: "91" },
    {
      code: "IO",
      label: "British Indian Ocean Territory",
      phone: "246",
    },
    { code: "IQ", label: "Iraq", phone: "964" },
    {
      code: "IR",
      label: "Iran, Islamic Republic of",
      phone: "98",
    },
    { code: "IS", label: "Iceland", phone: "354" },
    { code: "IT", label: "Italy", phone: "39" },
    { code: "JE", label: "Jersey", phone: "44" },
    { code: "JM", label: "Jamaica", phone: "1-876" },
    { code: "JO", label: "Jordan", phone: "962" },
    {
      code: "JP",
      label: "Japan",
      phone: "81",
      suggested: true,
    },
    { code: "KE", label: "Kenya", phone: "254" },
    { code: "KG", label: "Kyrgyzstan", phone: "996" },
    { code: "KH", label: "Cambodia", phone: "855" },
    { code: "KI", label: "Kiribati", phone: "686" },
    { code: "KM", label: "Comoros", phone: "269" },
    {
      code: "KN",
      label: "Saint Kitts and Nevis",
      phone: "1-869",
    },
    {
      code: "KP",
      label: "Korea, Democratic People's Republic of",
      phone: "850",
    },
    { code: "KR", label: "Korea, Republic of", phone: "82" },
    { code: "KW", label: "Kuwait", phone: "965" },
    { code: "KY", label: "Cayman Islands", phone: "1-345" },
    { code: "KZ", label: "Kazakhstan", phone: "7" },
    {
      code: "LA",
      label: "Lao People's Democratic Republic",
      phone: "856",
    },
    { code: "LB", label: "Lebanon", phone: "961" },
    { code: "LC", label: "Saint Lucia", phone: "1-758" },
    { code: "LI", label: "Liechtenstein", phone: "423" },
    { code: "LK", label: "Sri Lanka", phone: "94" },
    { code: "LR", label: "Liberia", phone: "231" },
    { code: "LS", label: "Lesotho", phone: "266" },
    { code: "LT", label: "Lithuania", phone: "370" },
    { code: "LU", label: "Luxembourg", phone: "352" },
    { code: "LV", label: "Latvia", phone: "371" },
    { code: "LY", label: "Libya", phone: "218" },
    { code: "MA", label: "Morocco", phone: "212" },
    { code: "MC", label: "Monaco", phone: "377" },
    {
      code: "MD",
      label: "Moldova, Republic of",
      phone: "373",
    },
    { code: "ME", label: "Montenegro", phone: "382" },
    {
      code: "MF",
      label: "Saint Martin (French part)",
      phone: "590",
    },
    { code: "MG", label: "Madagascar", phone: "261" },
    { code: "MH", label: "Marshall Islands", phone: "692" },
    {
      code: "MK",
      label: "Macedonia, the Former Yugoslav Republic of",
      phone: "389",
    },
    { code: "ML", label: "Mali", phone: "223" },
    { code: "MM", label: "Myanmar", phone: "95" },
    { code: "MN", label: "Mongolia", phone: "976" },
    { code: "MO", label: "Macao", phone: "853" },
    {
      code: "MP",
      label: "Northern Mariana Islands",
      phone: "1-670",
    },
    { code: "MQ", label: "Martinique", phone: "596" },
    { code: "MR", label: "Mauritania", phone: "222" },
    { code: "MS", label: "Montserrat", phone: "1-664" },
    { code: "MT", label: "Malta", phone: "356" },
    { code: "MU", label: "Mauritius", phone: "230" },
    { code: "MV", label: "Maldives", phone: "960" },
    { code: "MW", label: "Malawi", phone: "265" },
    { code: "MX", label: "Mexico", phone: "52" },
    { code: "MY", label: "Malaysia", phone: "60" },
    { code: "MZ", label: "Mozambique", phone: "258" },
    { code: "NA", label: "Namibia", phone: "264" },
    { code: "NC", label: "New Caledonia", phone: "687" },
    { code: "NE", label: "Niger", phone: "227" },
    { code: "NF", label: "Norfolk Island", phone: "672" },
    { code: "NG", label: "Nigeria", phone: "234" },
    { code: "NI", label: "Nicaragua", phone: "505" },
    { code: "NL", label: "Netherlands", phone: "31" },
    { code: "NO", label: "Norway", phone: "47" },
    { code: "NP", label: "Nepal", phone: "977" },
    { code: "NR", label: "Nauru", phone: "674" },
    { code: "NU", label: "Niue", phone: "683" },
    { code: "NZ", label: "New Zealand", phone: "64" },
    { code: "OM", label: "Oman", phone: "968" },
    { code: "PA", label: "Panama", phone: "507" },
    { code: "PE", label: "Peru", phone: "51" },
    { code: "PF", label: "French Polynesia", phone: "689" },
    { code: "PG", label: "Papua New Guinea", phone: "675" },
    { code: "PH", label: "Philippines", phone: "63" },
    { code: "PK", label: "Pakistan", phone: "92" },
    { code: "PL", label: "Poland", phone: "48" },
    {
      code: "PM",
      label: "Saint Pierre and Miquelon",
      phone: "508",
    },
    { code: "PN", label: "Pitcairn", phone: "870" },
    { code: "PR", label: "Puerto Rico", phone: "1" },
    {
      code: "PS",
      label: "Palestine, State of",
      phone: "970",
    },
    { code: "PT", label: "Portugal", phone: "351" },
    { code: "PW", label: "Palau", phone: "680" },
    { code: "PY", label: "Paraguay", phone: "595" },
    { code: "QA", label: "Qatar", phone: "974" },
    { code: "RE", label: "Reunion", phone: "262" },
    { code: "RO", label: "Romania", phone: "40" },
    { code: "RS", label: "Serbia", phone: "381" },
    { code: "RU", label: "Russian Federation", phone: "7" },
    { code: "RW", label: "Rwanda", phone: "250" },
    { code: "SA", label: "Saudi Arabia", phone: "966" },
    { code: "SB", label: "Solomon Islands", phone: "677" },
    { code: "SC", label: "Seychelles", phone: "248" },
    { code: "SD", label: "Sudan", phone: "249" },
    { code: "SE", label: "Sweden", phone: "46" },
    { code: "SG", label: "Singapore", phone: "65" },
    { code: "SH", label: "Saint Helena", phone: "290" },
    { code: "SI", label: "Slovenia", phone: "386" },
    {
      code: "SJ",
      label: "Svalbard and Jan Mayen",
      phone: "47",
    },
    { code: "SK", label: "Slovakia", phone: "421" },
    { code: "SL", label: "Sierra Leone", phone: "232" },
    { code: "SM", label: "San Marino", phone: "378" },
    { code: "SN", label: "Senegal", phone: "221" },
    { code: "SO", label: "Somalia", phone: "252" },
    { code: "SR", label: "Suriname", phone: "597" },
    { code: "SS", label: "South Sudan", phone: "211" },
    {
      code: "ST",
      label: "Sao Tome and Principe",
      phone: "239",
    },
    { code: "SV", label: "El Salvador", phone: "503" },
    {
      code: "SX",
      label: "Sint Maarten (Dutch part)",
      phone: "1-721",
    },
    {
      code: "SY",
      label: "Syrian Arab Republic",
      phone: "963",
    },
    { code: "SZ", label: "Swaziland", phone: "268" },
    {
      code: "TC",
      label: "Turks and Caicos Islands",
      phone: "1-649",
    },
    { code: "TD", label: "Chad", phone: "235" },
    {
      code: "TF",
      label: "French Southern Territories",
      phone: "262",
    },
    { code: "TG", label: "Togo", phone: "228" },
    { code: "TH", label: "Thailand", phone: "66" },
    { code: "TJ", label: "Tajikistan", phone: "992" },
    { code: "TK", label: "Tokelau", phone: "690" },
    { code: "TL", label: "Timor-Leste", phone: "670" },
    { code: "TM", label: "Turkmenistan", phone: "993" },
    { code: "TN", label: "Tunisia", phone: "216" },
    { code: "TO", label: "Tonga", phone: "676" },
    { code: "TR", label: "Turkey", phone: "90" },
    {
      code: "TT",
      label: "Trinidad and Tobago",
      phone: "1-868",
    },
    { code: "TV", label: "Tuvalu", phone: "688" },
    {
      code: "TW",
      label: "Taiwan",
      phone: "886",
    },
    {
      code: "TZ",
      label: "United Republic of Tanzania",
      phone: "255",
    },
    { code: "UA", label: "Ukraine", phone: "380" },
    { code: "UG", label: "Uganda", phone: "256" },
    {
      code: "US",
      label: "United States",
      phone: "1",
      suggested: true,
    },
    { code: "UY", label: "Uruguay", phone: "598" },
    { code: "UZ", label: "Uzbekistan", phone: "998" },
    {
      code: "VA",
      label: "Holy See (Vatican City State)",
      phone: "379",
    },
    {
      code: "VC",
      label: "Saint Vincent and the Grenadines",
      phone: "1-784",
    },
    { code: "VE", label: "Venezuela", phone: "58" },
    {
      code: "VG",
      label: "British Virgin Islands",
      phone: "1-284",
    },
    {
      code: "VI",
      label: "US Virgin Islands",
      phone: "1-340",
    },
    { code: "VN", label: "Vietnam", phone: "84" },
    { code: "VU", label: "Vanuatu", phone: "678" },
    { code: "WF", label: "Wallis and Futuna", phone: "681" },
    { code: "WS", label: "Samoa", phone: "685" },
    { code: "XK", label: "Kosovo", phone: "383" },
    { code: "YE", label: "Yemen", phone: "967" },
    { code: "YT", label: "Mayotte", phone: "262" },
    { code: "ZA", label: "South Africa", phone: "27" },
    { code: "ZM", label: "Zambia", phone: "260" },
    { code: "ZW", label: "Zimbabwe", phone: "263" },
  ],
  payment: {
    id: "pay_QAdPuYorh3U9cw",
    entity: "payment",
    amount: 1277455,
    currency: "INR",
    status: "captured",
    order_id: "order_QAdPntmMXFnpXu",
    invoice_id: null,
    international: false,
    method: "netbanking",
    amount_refunded: 0,
    refund_status: null,
    captured: true,
    description: "#QAdPSEQcP5moug",
    card_id: null,
    bank: "CNRB",
    wallet: null,
    vpa: null,
    email: "void@razorpay.com",
    contact: "+918081137994",
    notes: [],
    fee: 30150,
    tax: 4600,
    error_code: null,
    error_description: null,
    error_source: null,
    error_step: null,
    error_reason: null,
    acquirer_data: {
      bank_transaction_id: "1028635",
    },
    created_at: 1742820866,
  },

  heliBenefits: [
    {
      heading: "Traffic Free Experience",
      description: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    },
    {
      heading: "Travel Better",
      description: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    },
    {
      heading: "Chauffeur service",
      description: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    },
  ],
};
