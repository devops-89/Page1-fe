import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { Box, Typography } from "@mui/material";
import React from "react";

const InnerBanner = ({ img, heading }) => {
  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${img})`,
          height: 200,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            backgroundColor: COLORS.BLACKDARKOVERLAY,
            height: "100%",
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: 30,
                fontFamily: nunito.style,
                color: COLORS.WHITE,
                fontWeight: 700,
              }}
            >
              {heading}
            </Typography>
            {/* <Breadcrumbs
              separator=">"
              sx={{
                ".MuiBreadcrumbs-separator": {
                  color: COLORS.WHITE,
                  fontWeight: 600,
                },
              }}
            >
              <Link href={"/"}>
                <Home htmlColor={COLORS.WHITE} sx={{ fontSize: 25 }} />
              </Link>
              <Link href={"/cabs"} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: COLORS.WHITE,
                    textDecoration: "none !important",
                    fontFamily: nunito.style,
                    fontWeight: 550,
                  }}
                >
                  Cabs
                </Typography>
              </Link>
            </Breadcrumbs> */}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default InnerBanner;
