import HelicopterBooking from "@/assests/modalCalling/HelicopterBooking";
import bgImage from "@/banner/heli.jpg";
import banner from "@/banner/helicopter.jpg";
import Benefits from "@/components/heli/Benefits";
import InnerBanner from "@/components/innerBanner";
import { showModal } from "@/redux/reducers/modal";
import { COLORS } from "@/utils/colors";
import { nunito, roboto } from "@/utils/fonts";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
const Helicopter = () => {
  const dispatch = useDispatch();

  const openHelicopterForm = () => {
    dispatch(showModal(<HelicopterBooking />));
  };
  return (
    <>
      <InnerBanner img={banner.src} heading={"Helicopter"} />
      <Container sx={{ mt: 7 }}>
        <Box
          sx={{
            backgroundImage: `url(${bgImage.src})`,
            width: "100%",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            backgroundSize: "70%",
            height: "70vh",
            display: "flex",
          }}
        >
          <Grid2 container alignItems={"center"}>
            <Grid2 size={5}>
              <Typography sx={{ fontSize: 55, fontFamily: roboto.style }}>
                Create Memories for a lifetime
              </Typography>
              <Typography
                sx={{
                  fontSize: 15,
                  fontFamily: nunito.style,
                  mt: 2,
                  fontWeight: 500,
                }}
              >
                {" "}
                Explore the world with a new perspective with Page1 Travels’s
                helicopter services. A helicopter ride is one of the most
                exciting and unique ways of exploring a new destination.
              </Typography>
              <Button
                sx={{
                  fontSize: 15,
                  fontWeight: 550,
                  backgroundColor: COLORS.PRIMARY,
                  borderRadius: 0,
                  mt: 2,
                  width: 150,
                  p: 1,
                  color: COLORS.BLACK,
                }}
                onClick={openHelicopterForm}
              >
                Book Now
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
      <Box sx={{ mt: 7 }}>
        <Benefits />
      </Box>
    </>
  );
};

export default Helicopter;
