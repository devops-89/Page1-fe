import { COLORS } from "@/utils/colors";
import { roboto } from "@/utils/fonts";
import { Card, Container, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import image1 from "@/cabs/airport-transfer.png";
import image2 from "@/cabs/business.png";
import image3 from "@/cabs/driver.png";
const SelfDriveServices = () => {
  const data = [
    {
      img: image1,
      heading: " Airport Transfer",
      description: "Enhance your rental experience with additional options.",
    },
    {
      img: image2,
      heading: "Business Car Rental",
      description: "Enhance your rental experience with additional options.",
    },
    {
      img: image3,
      heading: "Car Rental With Driver",
      description: "Enhance your rental experience with additional options.",
    },
  ];
  return (
    <Container sx={{ mt: 5 }}>
      <Grid2 container>
        <Grid2 size={{xs:12, sm:6}} margin="auto">
          <Typography
            sx={{
              fontSize: 16,
              fontFamily: roboto.style,
              color: COLORS.PRIMARY,
              textAlign: "center",
            }}
          >
            Our services
          </Typography>
          <Typography
            sx={{
              fontSize: {xs:20, sm:30},
              fontFamily: roboto.style,
              color: COLORS.BLACK,
              fontWeight: 550,
              textAlign: "center",
            }}
          >
            Explore our wide range of rental services
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={5} sx={{ mt: 5, mb: 5 }}>
        {data.map((item, index) => (
          <Grid2 size={{xs:12, sm:4}} key={index}>
            <Card
              sx={{
                textAlign:{xs:'center', sm:'start'},
                p: 2,
                ":hover": {
                  backgroundColor: COLORS.PRIMARY,
                  borderBottom:`8px solid ${COLORS.SECONDARY}`,
                  transform:"scale(1.05)",
                },
                transition: "0.5s ease all",
                borderBottom:`8px solid ${COLORS.TRANSPARENT}`,
              }}
            >
              <Image src={item.img} alt="" width={50} />
              <Typography
                sx={{
                  fontSize: 18,
                  fontFamily: roboto.style,
                  mt: 2,
                  fontWeight: 550,
                }}
              >
                {item.heading}
              </Typography>
              <Typography
                sx={{ mt: 1, fontSize: 16, fontFamily: roboto.style }}
              >
                {item.description}
              </Typography>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default SelfDriveServices;
