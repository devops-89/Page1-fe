import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { PublicOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import CountUp from "react-countup";

const CounterCard = ({ icon, heading, count }) => {
  return (
    <div>
      <Box>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={2} pb={1}>
          {icon}
          <Typography
            sx={{
              fontSize: 17,
              color: COLORS.PRIMARY,
              fontFamily: nunito.style,
              fontWeight: 600,
              textAlign:"center",
              textWrap:"nowrap"
            }}
          >
            {heading}
          </Typography>
        </Stack>
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <CountUp
            end={count}
            delay={3}
            suffix="+"
            style={{
              fontSize: 30,
              textAlign: "center",
              fontFamily: nunito.style,
              fontWeight: 600,
            }}
            separator="  "
          />
        </Box>
      </Box>
    </div>
  );
};

export default CounterCard;
