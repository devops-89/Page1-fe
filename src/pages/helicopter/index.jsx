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
      <Container sx={{ my: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
            height: { xs: "auto", sm: "450px" },
            width: "100%",
          }}
        >
          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 50%" },
              px: { xs: 2, sm: 4 },
              py: { xs: 3, sm: 0 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 24, sm: 30, md: 50 },
                fontFamily: roboto.style,
              }}
            >
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
              Explore the world with a new perspective through Page1 Travels’
              helicopter services. A helicopter ride is one of the most exciting
              and unique ways of experiencing a destination.
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                sx={{
                  fontSize: 15,
                  fontWeight: 550,
                  backgroundColor: COLORS.PRIMARY,
                  borderRadius: 0,
                  width: 150,
                  p: 1,
                  color: COLORS.BLACK,
                }}
                onClick={openHelicopterForm}
              >
                Book Now
              </Button>
            </Box>
          </Box>

          {/* RIGHT: image — use background or <img>. This uses <img> for better responsiveness/alt text */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 50%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: { xs: "220px", sm: "100%" },
              px: { xs: 2, sm: 0 },
            }}
          >
            <Box
              component="img"
              src={bgImage.src}
              alt="Helicopter experience"
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: { xs: "220px", sm: "450px" },
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Box>
        </Box>
      </Container>

      <Box sx={{ mt: 7 }}>
        <Benefits />
      </Box>
    </>
  );
};

export default Helicopter;
