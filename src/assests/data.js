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
      url: "/flight-list",
    },
    {
      img: hotels,
      title: "Hotels",
      url: "/hotels",
    },
    {
      img: helicopter,
      title: "helicopter",
      url: "/helicopter",
    },
    {
      img: packages,
      title: "holiday packages",
      url: "/holiday-packages",
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
      url: "/",
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
      number: "$5965",
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
  flightFareHead: [
    // {
    //   label: "Base Fare",
    // },
    // {
    //   label: "Taxes and Fees",
    // },
    {
      label: "Total Fare"
    },
  ],
  fightFareData: [
    {
      value1: "$36,500",
      value2: "$1050",
      value3: "$37,550",
    },
  ],
  flightBaggageHead: [
    
    {
      label: "Baggage",
     
    },
    {
      label: "Cabin Baggage"
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
      value2: "	$16,325 + $250",
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
  flightDetails:{
      "flightData": {
        "origin": "New Delhi",
        "destination": "Bengaluru",
        "date": "Thursday, Jan 16",
        "duration": "3h 5m",
        "airline": "Akasa Air",
        "flightNumber": "QP 1350",
        "class": "Economy Saver"
      },
      "travelerData": {
        "Adult": [
          {
            "id": 1,
            "firstMiddleName": "",
            "lastName": "",
            "gender": "",
            "countryCode": "",
            "mobileNumber": "",
            "email": "",
            "requiresWheelchair": false
          }
        ],
        "Child": [],
        "Infant": []
      },
      "fareSummary": [
        {
          "label": "Base Fare",
          "amount": 41186
        },
        {
          "label": "Taxes and Surcharges",
          "amount": 5004
        }
      ]
    }
    
  
};
