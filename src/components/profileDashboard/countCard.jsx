import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { CalendarMonth } from "@mui/icons-material";
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import React from "react";

const Countcard = ({ icon, number, title }) => {
  return (
    <div>
      <Card
        sx={{
          p: 2,
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Avatar
            sx={{ backgroundColor: COLORS.PRIMARY, width: 50, height: 50 }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography
              sx={{ fontSize: 30, fontFamily: nunito.style, fontWeight: 800 }}
            >
              {number}
            </Typography>
            <Typography
              sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
            >
              {title}
            </Typography>
          </Box>
        </Stack>
      </Card>
    </div>
  );
};

export default Countcard;
