import { data } from "@/assests/data";
import logo from "@/icons/blogzine.svg";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
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
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import TabPanel from "../tabPanel";
import FlightBox from "./flightBox";
import FareDetails from "./fareDetail";
import BaggageDetails from "./baggageDetails";
import Cancellation from "./cancellationRules";
import { FARE_TYPE } from "@/utils/enum";
const FlightListBox = ({ details }) => {
  const [open, setOpen] = useState(false);

  const handleOpenFlightDetails = () => {
    setOpen(!open);
  };

  const [value, setValue] = useState(0);

  const tabChangeHandler = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Card sx={{ boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)", p: 2 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Image src={details.logo} width={30} />
            <Typography
              sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
            >
              {details.airlineName} {`(${details?.flightNumber})`}
            </Typography>
          </Stack>
          <Typography
            sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
          >
            Travel Class: {details?.travelClass}
          </Typography>
        </Stack>
        <Grid2 container sx={{ mt: 3 }} spacing={4} alignItems={"center"}>
          <Grid2 size={3}>
            <Typography
              sx={{ fontSize: 25, fontWeight: 700, fontFamily: nunito.style }}
            >
              {details?.departureDetails?.departureTime}
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
            >
              {details?.departureDetails?.departureAirportCode} -{" "}
              {details?.departureDetails?.departureTerminal}
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
            >
              {details?.departureDetails?.departureLocation}
            </Typography>
          </Grid2>
          <Grid2 size={3}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                fontFamily: nunito.style,
                textAlign: "center",
              }}
            >
              {details?.timeTaken}
            </Typography>
            <Divider sx={{ borderColor: COLORS.BLACK, mt: 1 }}>
              <Avatar sx={{ backgroundColor: COLORS.PRIMARY }}>
                <FlightTakeoff sx={{ fontSize: 17 }} />
              </Avatar>
            </Divider>
          </Grid2>
          <Grid2 size={3}>
            <Typography
              sx={{ fontSize: 25, fontWeight: 700, fontFamily: nunito.style }}
            >
              {details?.arrivalDetails?.arrivalTime}
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
            >
              {details?.arrivalDetails?.arrivalAirportCode} -{" "}
              {details?.arrivalDetails?.arrivalTerminal}
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
            >
              {details?.arrivalDetails?.arrivalLocation}
            </Typography>
          </Grid2>
          <Grid2 size={3} textAlign={"center"}>
            <Typography
              sx={{ fontSize: 25, fontWeight: 900, fontFamily: nunito.style }}
            >
              {details?.price}
            </Typography>
            <Button
              sx={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.BLACK,
                fontWeight: 550,
                fontSize: 12,
                fontFamily: nunito.style,
                mt: 1,
              }}
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
                fontSize: 15,
                color: COLORS.DANGER,
                fontFamiy: nunito.style,
                fontWeight: 500,
              }}
            >
              Only {details?.seatsLeft} seats left
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                color:
                  details?.fareType === FARE_TYPE.NONREFUNDABLE
                    ? COLORS.DANGER
                    : COLORS.SUCCESS,
                fontFamiy: nunito.style,
                fontWeight: 500,
              }}
            >
              {details?.fareType}
            </Typography>
            <Button
              sx={{
                fontSize: 15,
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
            <FlightBox data={details} />
          </TabPanel>
          <TabPanel index={1} value={value}>
            <FareDetails tableData={details?.flightDetails?.fareDetail} />
          </TabPanel>
          <TabPanel index={2} value={value}>
            <BaggageDetails
              tableData={details?.flightDetails?.baggageDetails}
            />
          </TabPanel>
          <TabPanel index={3} value={value}>
            <Cancellation
              tableData={details?.flightDetails?.cancellationDetails}
              departureDetails={details?.departureDetails}
              arrivalDetails={details?.arrivalDetails}
            />
          </TabPanel>
        </Collapse>
      </Card>
    </div>
  );
};

export default FlightListBox;
