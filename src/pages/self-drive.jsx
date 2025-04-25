import InnerBanner from "@/components/innerBanner";
import React from "react";
import bannerImage from "@/banner/selfdrivebanner.jpg";
import { Container, Grid2, Typography } from "@mui/material";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import SelfDriveForm from "@/components/cab/Self-DriveForm";
import SelfDriveServices from "@/components/cab/SelfDriveServices";
const SelfDrive = () => {
  return (
    <div>
      <InnerBanner img={bannerImage.src} heading={"Self Drive"} />
      <Container sx={{ mt: 5 }}>
        <Grid2 container alignItems={"center"} spacing={5}>
          <Grid2 size={6}>
            <Typography
              sx={{
                fontSize: 40,
                fontFamily: roboto.style,
                color: COLORS.PRIMARY,
                fontWeight: 550,
              }}
            >
              Mega Offer 30% OFF{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: 30,
                fontFamily: roboto.style,
                color: COLORS.BLACK,
                fontWeight: 550,
              }}
            >
              ON SELFDRIVE
            </Typography>
            <Typography sx={{ fontSize: 16, fontFamily: roboto.style, mt: 2 }}>
              Whether you are planning a road trip in the megacity or looking
              for an accessible way to voyage around when you are out of the
              city, Page1 Travels provides you with ease on your trip straits.
              You can pick anyone accessible auto reimbursement options to drive
              down to the near sand or to maneuver through business as you head
              from one important business meeting to the coming. With a
              tone-drive auto reimbursement, you have the freedom to move around
              and explore places at your own pace. we also offer flexible auto
              reimbursement services. You can choose unlimited kilometer
              packages, or indeed get a brand-new auto. Also, you will be safe
              and secure while cruising down open roads.
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <SelfDriveForm />
          </Grid2>
        </Grid2>
      </Container>
      <SelfDriveServices />
    </div>
  );
};

export default SelfDrive;
