import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { FlightTakeoff } from "@mui/icons-material";
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

  const {
    departureAirportCode,
    departureLocation,
    departureTerminal,
    departureTime,
  } = data?.departureDetails;
  const { timeTaken } = data;

  const { arrivalAirportCode, arrivalLocation, arrivalTerminal, arrivalTime } =
    data?.arrivalDetails;
  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Image src={data.logo} width={30} />
          <Typography
            sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
          >
            {data.airlineName} {`(${data?.flightNumber})`}
          </Typography>
        </Stack>
        <Typography
          sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
        >
          Travel Class: {data?.travelClass}
        </Typography>
      </Stack>
      <Grid2 container sx={{ mt: 3 }} spacing={4} alignItems={"center"}>
        <Grid2 size={4}>
          <Typography
            sx={{ fontSize: 25, fontWeight: 700, fontFamily: nunito.style }}
          >
            {departureTime}
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
          >
            {departureAirportCode} - {departureTerminal}
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
          >
            {departureLocation}
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
            {timeTaken}
          </Typography>
          <Divider sx={{ borderColor: COLORS.BLACK, mt: 1 }}>
            <Avatar sx={{ backgroundColor: COLORS.PRIMARY }}>
              <FlightTakeoff sx={{ fontSize: 17 }} />
            </Avatar>
          </Divider>
        </Grid2>
        <Grid2 size={4}>
          <Typography
            sx={{ fontSize: 25, fontWeight: 700, fontFamily: nunito.style }}
          >
            {arrivalTime}
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
          >
            {arrivalAirportCode} - {arrivalTerminal}
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
          >
            {arrivalLocation}
          </Typography>
        </Grid2>
      </Grid2>
    </Card>
  );
};

export default FlightBox;
