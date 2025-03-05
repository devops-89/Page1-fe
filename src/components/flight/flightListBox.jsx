import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { useRouter } from "next/router";
import moment from "moment";
import {
  FlightTakeoff,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Collapse,
  Divider,
  Grid2,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import TabPanel from "../tabPanel";
import FareDetails from "./fareDetail";
import BaggageDetails from "./baggageDetails";
import FlightBox from "./FlightBox";


const FlightListBox = ({ details, traceId }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [cabin, setCabin] = useState(null);

  const handleOpenFlightDetails = () => {
    setOpen(!open);
  };

  const [flightDetails, setFlightDetails] = useState(details);
  const [value, setValue] = useState(0);

  const tabChangeHandler = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let cabinData = data.FLIGHT_CLASS_DATA.find((fligtClass) => {
      return fligtClass.value == flightDetails?.departure[0]?.CabinClass;
    });
    setCabin(cabinData.label);
  }, [flightDetails, data.FLIGHT_CLASS_DATA]);

  const routetoAnotherPage = () => {
      router.push({
        pathname: `/flight-list/${flightDetails?.AirlineCode}/view-details`,
        query: {
          ResultIndex: flightDetails?.ResultIndex,
          traceId: traceId,
        },
      });
  };
  const phone = useMediaQuery("( max-width:600px)");

  return (
    <div>
      <Card sx={{ boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)", p: 2 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Image
              src={flightDetails.AirlineLogo}
              alt="Image"
              width={phone ? 20:30}
              height={phone ? 20:30}
            />
            <Typography
              sx={{ fontSize: {lg:15 ,md:14 ,sm:12 ,xs:12}, fontFamily: nunito.style, fontWeight: 550 }}
            >
              {`${flightDetails.departure[0].Airline.AirlineName} Airline`}{" "}
              {`(${flightDetails.AirlineCode} ${flightDetails?.departure[0].Airline.FlightNumber})`}
            </Typography>
          </Stack>
          <Typography
            sx={{ fontSize: {lg:15 ,md:14 ,sm:12 ,xs:12}, fontFamily: nunito.style, fontWeight: 550 }}
          >
            Travel Class : {cabin ? cabin : undefined}
          </Typography>
        </Stack>
        <Grid2 container sx={{ mt: 3 }} spacing={{lg:4 ,xs:2}} alignItems={"flex-start"}>
          <Grid2 size={3}>
            <Typography
              sx={{ fontSize: {lg:22 ,md:18 ,sm:18 ,xs:14}, fontWeight: 700, fontFamily: nunito.style }}
            >
              {moment(flightDetails?.departure[0].Origin.DepTime).format(
                "HH:mm"
              )}
            </Typography>
            <Typography
              sx={{ fontSize:  {lg:14 ,md:12 ,sm:12 ,xs:10}, fontWeight: 600, fontFamily: nunito.style  }}
            >
              {flightDetails?.departure[0].Origin.Airport.AirportCode} -{" "}
              {flightDetails?.departure[0].Origin.Airport.Terminal} Terminal
            </Typography>
            <Typography
              sx={{ fontSize: {lg:14 ,md:12 ,sm:12 ,xs:10}, fontWeight: 600, fontFamily: nunito.style  }}
            >
              {flightDetails?.departure[0].Origin.Airport.CityName}
            </Typography>
          </Grid2>
          <Grid2 size={3}>
            <Typography
              sx={{
                fontSize: {lg:18 , md:16 ,sm:16, xs:13},
                fontWeight: 700,
                fontFamily: nunito.style,
                textAlign: "center",
              }}
            >
              {`${Math.floor(
                moment
                  .duration(
                    flightDetails?.departure[
                      flightDetails?.departure.length - 1
                    ].AccumulatedDuration,
                    "minutes"
                  )
                  .asHours()
              )} hrs ${moment
                .duration(
                  flightDetails?.departure[flightDetails?.departure.length - 1]
                    .AccumulatedDuration,
                  "minutes"
                )
                .minutes()} min`}
            </Typography>

            <Divider sx={{ borderColor: COLORS.BLACK, mt: 1  }} className="anshuman">
              <Avatar sx={{ backgroundColor: COLORS.PRIMARY, width:{lg:"40px" ,md:"40px" ,sm:"40px" ,xs:"20px"}, height:{lg:"40px" ,md:"40px" ,sm:"40px" ,xs:"20px"} }}>
                <FlightTakeoff sx={{ fontSize: 17 }} />
              </Avatar>
            </Divider>
          </Grid2>
          <Grid2 size={3}>
            <Typography 
              sx={{ fontSize:{lg:22 ,md:18 ,sm:18 ,xs:14}, fontWeight: 700, fontFamily: nunito.style }}
            >
              {moment(
                flightDetails?.departure[flightDetails?.departure.length - 1]
                  .Destination.ArrTime
              ).format("HH:mm")}
            </Typography>
            <Typography
              sx={{ fontSize: {lg:14 ,md:12 ,sm:12 ,xs:10}, fontWeight: 600, fontFamily: nunito.style }}
            >
              {
                flightDetails?.departure[flightDetails?.departure.length - 1]
                  .Destination.Airport.AirportCode
              }{" "}
              -{" "}
              {
                flightDetails?.departure[flightDetails?.departure.length - 1]
                  .Destination.Airport.Terminal
              }{" "}
              Terminal
            </Typography>
            <Typography
              sx={{ fontSize: {lg:14 ,md:12 ,sm:12 ,xs:11}, fontWeight: 600, fontFamily: nunito.style }}
            >
              {
                flightDetails?.departure[flightDetails?.departure.length - 1]
                  .Destination.Airport.CityName
              }
            </Typography>
          </Grid2>
          <Grid2 size={3} textAlign={"center"}>
            <Typography
              sx={{ fontSize: {lg:25 , md:20 ,sm:20 ,xs:14} , fontWeight: 900, fontFamily: nunito.style }}
            >
              {flightDetails?.TotalFare} ₹
            </Typography>
            <Button
              sx={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.BLACK,
                fontWeight: 550,
                fontSize: {lg:12 ,md:12 ,sm:12, xs:8},
            
                fontFamily: nunito.style,
                mt: 1,
              }}
              onClick={routetoAnotherPage}
            >
              Book Now
            </Button>
          </Grid2>
        </Grid2>

        <Card
          sx={{ boxShadow: "0px 0px 2px 2px rgb(0,0,0,0.10)", p: 1, mt: 2 }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              sx={{
                fontSize: {lg:15 , md:14 ,sm:14 ,xs:10},
                color: COLORS.DANGER,
                fontFamiy: nunito.style,
                fontWeight: 500,
              }}
            >
              Only {flightDetails?.departure[0].NoOfSeatAvailable} seats left
            </Typography>
            <Typography
              sx={{
                fontSize:  {lg:15 , md:14 ,sm:14 ,xs:10},
                color: flightDetails.IsRefundable
                  ? COLORS.SUCCESS
                  : COLORS.DANGER,
                fontFamiy: nunito.style,
                fontWeight: 500,
              }}
            >
              {flightDetails.IsRefundable ? "Refundable" : "Non Refundable"}
            </Typography>
            <Button
              sx={{
                fontSize:  {lg:15 , md:14 ,sm:14 ,xs:10},
                p: 0.4,
                fontFamiy: nunito.style,
                fontWeight: 500,
                color: COLORS.BLACK,
                textTransform: "initial",
              }}
              endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              onClick={handleOpenFlightDetails}
            >
              Flight Details
            </Button>
          </Stack>
        </Card>
        <Collapse in={open} sx={{ mt: 2 }}>
          <Tabs
            value={value}
            onChange={tabChangeHandler}
            sx={{
              "& .Mui-selected": {
                color: `${COLORS.BLACK} !important`,
                backgroundColor: COLORS.PRIMARY,
                transition: "0.5s ease all",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTab-root": {
                borderRadius: 8,
              },
            }}
          >
            {data.flightTab.map((val, i) => (
              <Tab
                label={
                  <Typography
                    sx={{
                      fontSize: 14,
                      textAlign: "center",
                      fontFamily: nunito.style,
                      fontWeight: 550,
                    }}
                  >
                    {val.label}
                  </Typography>
                }
                key={i}
              />
            ))}
          </Tabs>
          <TabPanel index={0} value={value}>
            <FlightBox tableData={flightDetails?.departure} />
          </TabPanel>
          <TabPanel index={1} value={value}>
            <FareDetails tableData={flightDetails} />
          </TabPanel>
          <TabPanel index={2} value={value}>
            <BaggageDetails tableData={flightDetails} />
          </TabPanel>
        </Collapse>
      </Card>
    </div>
  );
};

export default FlightListBox;
