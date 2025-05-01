import React from "react";
import innerImage from "@/cabs/outstation-cabs.jpg";
import InnerBanner from "@/components/innerBanner";
import { Typography, Grid2, Box, Container, Divider } from "@mui/material";
import { COLORS } from "@/utils/colors";
import { roboto } from "@/utils/fonts";
import OutstationSlider from "@/components/outstationcab/OutstationSlider";
import OutstationFaq from "@/components/outstationcab/OutstationFaq";
import OutstationForm from "@/components/outstationcab/OutstationForm";

const OutstationCabs = () => {
  return (
    <div>
      <InnerBanner img={innerImage.src} heading={"Outstation Cabs"} />
      <Container sx={{ my: { xs: 6, sm: 10 } }}>
        {/* Main Section */}
        <Grid2 container spacing={4}>
          <Grid2
            size={{ xs: 12, sm: 12, md: 6 }}
            sx={{ textAlign: { xs: "center", sm: "start" } }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: roboto.style,
                color: COLORS.PRIMARY,
                mb: 2,
                fontSize: { xs: 24, sm: 30 },
              }}
            >
              OUTSTATION CAB PAGE
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: roboto.style }}>
              Many Indian visitors like taking the road to their destination. It
              is because a road trip enables you to take in the natural beauty
              at your speed. Additionally, nothing compares to the comfort of
              traveling in a car with your loved ones. You can choose to reserve
              a cab online, which will make your trip hassle-free. You only need
              to go to the Page1 Travels webpage and choose a taxi. One of the
              most thrilling ways to travel across the nation is by car. There
              is a lot to learn and discover. Your car journey will be joyful
              thanks to Page1 Travels.
              <br />
              <br />
              The beautiful grandeur of nature, the slick highways, learning
              about the many civilizations, and sampling the cuisine are all
              enjoyed by tourists.
              <br />
              <br />
              On a road trip, there are a lot of things you may discover, and
              Page1 Travels is there to be your traveling buddy.
              <br />
              <br />
              You can contact Page1 Travel’s 24/7 customer support if you have
              any questions about reservations and speak to knowledgeable staff
              members about your upcoming trip. When you order an outstation cab
              with us, you can also get help with organizing your journey and
              negotiating the route. Additionally, having the option of
              utilizing the smartphone app will make reserving a cab less
              complicated.
              <br />
              <br />
              Our services are all accessible with a single click. Additionally,
              if you make your reservations with Page1 Travels, you will also be
              eligible for attractive deals and discounts.
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
            <Box
              sx={{
                border: `1px solid ${COLORS.PRIMARY}`,
                px: 3,
                borderRadius: 2,
              }}
            >
              <OutstationForm />
            </Box>
          </Grid2>
        </Grid2>
      </Container>
      {/* Analytics section */}
      <Grid2 container sx={{ py: 4, bgcolor: COLORS.PRIMARY }} spacing={2}>
        <Grid2
          size={{xs:12, sm:3}}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant="h4"
            sx={{
              color: COLORS.WHITE,
              fontWeight: "bold",
              fontFamily: roboto.style,
            }}
          >
            98+
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: roboto.style }}
          >
            Skilled Drivers
          </Typography>
        </Grid2>

        <Grid2
          size={{xs:12, sm:3}}
          sx={{ borderLeft: "1px solid white" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant="h4"
            sx={{
              color: COLORS.WHITE,
              fontWeight: "bold",
              fontFamily: roboto.style,
            }}
          >
            115+
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: roboto.style }}
          >
            Cabs Online
          </Typography>
        </Grid2>

        <Grid2
          size={{xs:12, sm:3}}
          sx={{ borderLeft: "1px solid white" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant="h4"
            sx={{
              color: COLORS.WHITE,
              fontWeight: "bold",
              fontFamily: roboto.style,
            }}
          >
            34+
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: roboto.style }}
          >
            Years On Roads
          </Typography>
        </Grid2>

        <Grid2
          size={{xs:12, sm:3}}
          sx={{ borderLeft: "1px solid white" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant="h4"
            sx={{
              color: COLORS.WHITE,
              fontWeight: "bold",
              fontFamily: roboto.style,
            }}
          >
            29+
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: roboto.style }}
          >
            Locations
          </Typography>
        </Grid2>
      </Grid2>

      {/* Our Services Section */}
      <Container sx={{ my: { xs: 6, sm: 10 } }}>
        <Box>
          <Typography
            variant="body1"
            sx={{
              textTransform: "uppercase",
              textAlign: "center",
              fontFamily: roboto.style,
              color: COLORS.PRIMARY,
              mb:1
            }}
          >
            Welcome
          </Typography>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: roboto.style,
              mb:1
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", fontFamily: roboto.style }}
          >
            Discover special offers and discounts on outstation cab booking at
            Page1 Travels. We offer an extremely user-friendly online booking
            procedure while ensuring your complete safety and comfort throughout
            the journey.
          </Typography>
          {/* Outstation slider component */}
          <OutstationSlider />

          {/* Outstation faq section accordian */}
          <OutstationFaq />
        </Box>
      </Container>
    </div>
  );
};

export default OutstationCabs;
