import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import moment from "moment";
import {
  FlightTakeoff,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Grid2,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import TabPanel from "../tabPanel";
import FareDetails from "./fareDetail";
import BaggageDetails from "./baggageDetails";
import FlightBox from "./flightBox";

const RoundFlightListBox = ({ details, isSelected, onSelect }) => {
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

  // console.log("RoundData ", flightDetails)

  useEffect(() => {
    let cabinData = data.FLIGHT_CLASS_DATA.find((fligtClass) => {
      // console.log("api cabinData",flightDetails?.departure[0]?.CabinClass)

      return fligtClass.value == flightDetails?.departure[0]?.CabinClass;
    });
    setCabin(cabinData.label);
  }, [flightDetails, data.FLIGHT_CLASS_DATA]);

  return (
    <div>
      <Card
        sx={{
          boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)",
          p: 2,
          cursor: "pointer",
          border: isSelected ? "1px solid blue" : "",
          backgroundColor: isSelected ? "#dff7ff" : "",
        }}
        onClick={onSelect}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Image
              src={flightDetails?.AirlineLogo}
              alt="Image"
              width={30}
              height={30}
            />
            <Typography
              sx={{ fontSize: {lg:15 , md:15 , sm:15 , xs:12}, fontFamily: nunito.style, fontWeight: 550,}}
            >
              {`${flightDetails.departure[0].Airline.AirlineName} Airline`}{" "}
              {`(${flightDetails.AirlineCode} ${flightDetails?.departure[0].Airline.FlightNumber})`}
            </Typography>
          </Stack>
          <Typography
            sx={{ fontSize: {lg:15 , md:15 , sm:15 , xs:12}, fontFamily: nunito.style, fontWeight: 550 }}
          >
            {/* Travel Class: {flightDetails?.departure[0].CabinClass} */}
            Travel Class : {cabin ? cabin : undefined}
          </Typography>
        </Stack>
        <Grid2 container sx={{ mt: 3 }} spacing={4} alignItems={"flex-start"}>
          <Grid2 size={{lg:3 ,md:3 , sm:4 , xs:4}}>
            <Typography
              sx={{ fontSize: {lg:22 , xs:15}, fontWeight: 700, fontFamily: nunito.style }}
            >
              {moment(flightDetails?.departure[0].Origin.DepTime).format(
                "HH:mm"
              )}
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
            >
              {flightDetails?.departure[0].Origin.Airport.AirportCode} -{" "}
              {flightDetails?.departure[0].Origin.Airport.Terminal} Terminal
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
            >
              {flightDetails?.departure[0].Origin.Airport.CityName}
            </Typography>
          </Grid2>
          <Grid2 size={{lg:3 ,md:3 , sm:4 , xs:4}}>
            <Typography
              sx={{
                fontSize: 16,
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

            <Divider sx={{ borderColor: COLORS.BLACK, mt: 1 }}>
              <Avatar sx={{ backgroundColor: COLORS.PRIMARY }}>
                <FlightTakeoff sx={{ fontSize: {lg:17 ,md:17,sm:17 , xs:15} }} />
              </Avatar>
            </Divider>
          </Grid2>
          <Grid2 size={{lg:3 ,md:3 , sm:4 , xs:4}}>
            <Typography
              sx={{ fontSize: {lg:22 , xs:15}, fontWeight: 700, fontFamily: nunito.style }}
            >
              {moment(
                flightDetails?.departure[flightDetails?.departure.length - 1]
                  .Destination.ArrTime
              ).format("HH:mm")}
            </Typography>
            <Typography
              sx={{ fontSize: 13, fontWeight: 600, fontFamily: nunito.style }}
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
              sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
            >
              {
                flightDetails?.departure[flightDetails?.departure.length - 1]
                  .Destination.Airport.CityName
              }
            </Typography>
          </Grid2>
          <Grid2 size={{lg:3 , md:3 ,sm:12 ,xs:12}} textAlign={"center"}>
            <Typography
              sx={{ fontSize: 20, fontWeight: 900, fontFamily: nunito.style }}
            >
              {flightDetails?.TotalFare} ₹
            </Typography>
          </Grid2>
        </Grid2>

        <Card
          sx={{ boxShadow: "0px 0px 2px 2px rgb(0,0,0,0.10)", p: 1, mt: 2 }}
        >
          <Grid2
           container
            spacing={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid2 size ={{lg:4 , md:4 , sm:4 , xs:12}}>
            <Typography
              sx={{
                fontSize: {lg:15 , md:15 ,sm:15 , xs:12},
                color: COLORS.DANGER,
                fontFamiy: nunito.style,
                fontWeight: 500,
              }}
            >
              Only {flightDetails?.departure[0].NoOfSeatAvailable} seats left
            </Typography>

            </Grid2>

            <Grid2 size ={{lg:4 , md:4 , sm:4 , xs:12}}>

            <Typography
              sx={{
                fontSize: {lg:15 , md:15 ,sm:15 , xs:12},
                color: flightDetails.IsRefundable
                  ? COLORS.SUCCESS
                  : COLORS.DANGER,
                fontFamiy: nunito.style,
                fontWeight: 500,
              }}
            >
              {flightDetails.IsRefundable ? "Refundable" : "Non Refundable"}
            </Typography>
            </Grid2>

            <Grid2 size ={{lg:4 , md:4 , sm:4 , xs:12}}>

            <Button
              sx={{
                fontSize: {lg:15 , md:15 ,sm:15 , xs:12},
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
            </Grid2>

          </Grid2>
        </Card>
        <Collapse in={open} sx={{ mt: 2 }}>
          <Tabs
            value={value}
            onChange={tabChangeHandler}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
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

export default RoundFlightListBox;
