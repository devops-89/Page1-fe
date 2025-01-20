import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { FlightTakeoff } from "@mui/icons-material";
import moment from "moment";
import { FLIGHT_CLASS } from "@/utils/enum";
import {
    Avatar,
    Card,
    Divider,
    Grid2,
    Stack,
    Typography
} from "@mui/material";
import Image from "next/image";
const FlightBox = ({ data }) => {


 

  // const {
  //   departureAirportCode,
  //   departureLocation,
  //   departureTerminal,
  //   departureTime,
  // } = data?.departureDetails;
  // const { timeTaken } = data;

  // const { arrivalAirportCode, arrivalLocation, arrivalTerminal, arrivalTime } =
  //   data?.arrivalDetails;
 const FLIGHT_CLASS_DATA=[
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
   ];

   const cabin = FLIGHT_CLASS_DATA.find((item) => item.value == data?.departure[0].CabinClass);

  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Image src={data.AirlineLogo} width={30} height={30} />
          {/* <img src={data.AirlineLogo} alt="airport" width={30} height={30} /> */}
          <Typography
          className="anshuman"
            sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
          >
            {`${data?.departure[0].Airline.AirlineName} (${data?.departure[0].Airline.FlightNumber}`}
          </Typography>
        </Stack>
        <Typography
          sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
        >
          Travel Class: {cabin.value}
      

        </Typography>
      </Stack>
      <Grid2 container sx={{ mt: 3 }} spacing={4} alignItems={"center"}>
        <Grid2 size={4}>
          <Typography
            sx={{ fontSize: 25, fontWeight: 700, fontFamily: nunito.style }}
          >
            {moment(data.departure[0].Origin.DepTime).format("Do MMM YYYY")}
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
          >
            {data.departure[0].Origin.Airport.AirportCode} - {data.departure[0].Origin.Airport.Terminal}
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
          >
            {data?.departure[0].Origin.Airport.CityName}
          </Typography>
        </Grid2>
        <Grid2 size={4}>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              fontFamily: nunito.style,
              textAlign: "center",
            }}
          >
            {moment.duration(data?.departure[0].Duration,"minutes").asHours().toFixed(2)} Hrs
          </Typography>
          <Divider sx={{ borderColor: COLORS.BLACK, mt: 1 }}>
            <Avatar sx={{ backgroundColor: COLORS.PRIMARY }}>
              <FlightTakeoff sx={{ fontSize: 17 }} />
            </Avatar>
          </Divider>
        </Grid2>
        <Grid2 size={4}>
          <Typography
            sx={{ fontSize: 22, fontWeight: 700, fontFamily: nunito.style }}
          >
            {moment(data?.departure[0].Destination.ArrTime).format("Do MMM YYYY")} 
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
          >
            {data.departure[0].Destination.Airport.AirportCode} - {data.departure[0].Destination.Airport.Terminal}
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
          >
            {data.departure[0].Destination.Airport.CityName}
          </Typography>
        </Grid2>
      </Grid2>
    </Card>
  );
};

export default FlightBox;
