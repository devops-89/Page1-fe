import { nunito } from "@/utils/fonts";
import { Avatar, Box, Card, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const TestimonialCard = ({ data, active }) => {
    console.group("si",active)
  return (
    <div>
      <Card
        sx={{
          p: 2,
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          height: 240,
          position: "relative",
        //   transform: active ? "scale(1.1)" : "scale(1.0)",
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 750,
            fontFamily: nunito.style,
            mb: 2,
          }}
        >
          {data.heading}
        </Typography>
        <Typography
          sx={{ fontSize: 14, fontWeight: 500, fontFamily: nunito.style }}
        >
          {data.description}
        </Typography>
        <Box sx={{ position: "absolute", bottom: 10, width: "90%" }}>
          <Divider sx={{ mt: 2 }} />
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Avatar>
              <Image src={data.img} width={40} style={{ objectFit: "cover" }} />
            </Avatar>
            <Typography
              sx={{ fontSize: 17, fontFamily: nunito.style, fontWeight: 600 }}
            >
              {data.name}
            </Typography>
          </Stack>
        </Box>
      </Card>
    </div>
  );
};

export default TestimonialCard;
