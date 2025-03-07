import React from "react";
import FlightSharpIcon from "@mui/icons-material/FlightSharp";
import { Grid2, Button, Typography, Box, Stack,Divider,Avatar } from "@mui/material";
import SelectedList from "./SelectedList";
import { COLORS } from "@/utils/colors.js";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import moment from "moment";
import { FlightTakeoff } from "@mui/icons-material";

import { nunito } from "@/utils/fonts";
const SeatDetail = ({extraDetails}) => {

   console.log("Seat Details",extraDetails);
  return (
    <Box
      item
      sx={{
        border: "1px solid gray",
        width: "450px",
        borderRadius: "10px",
        boxShadow: 2,
        backgroundColor: COLORS.WHITE,
        px:2,
        
      }}
    >
    {/* expermiment start */}
    

    <Grid2 container sx={{ mt: 3}} spacing={6} alignItems={"flex-start"}>
          <Grid2 size={4}>
            <Typography
              sx={{ fontSize: 22, fontWeight: 700, fontFamily: nunito.style }}
            >
              {moment(extraDetails?.Results?.Segments[0][0]?.Origin?.DepTime).format(
                "HH:mm"
              )}
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
            >
              {extraDetails?.Results?.Segments[0][0]?.Origin?.Airport.AirportCode} -{" "}
              {extraDetails?.Results?.Segments[0][0]?.Origin?.Airport.Terminal} Terminal
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
            >
              {extraDetails?.Results?.Segments[0][0]?.Origin?.Airport?.CityName}
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
             {`${Math.floor(
                                      moment
                                        .duration(
                                          extraDetails?.Results?.Segments[0][
                                            extraDetails?.Results?.Segments[0]
                                              .length - 1
                                          ].AccumulatedDuration,
                                          "minutes"
                                        )
                                        .asHours()
                                    )} hrs ${moment
                                      .duration(
                                        extraDetails?.Results?.Segments[0][
                                          extraDetails?.Results?.Segments[0]
                                            .length - 1
                                        ].AccumulatedDuration,
                                        "minutes"
                                      )
                                      .minutes()} min`}
            </Typography>

            <Divider sx={{ borderColor: COLORS.BLACK, mt: 1 }}>
              <Avatar sx={{ backgroundColor: COLORS.PRIMARY }}>
                <FlightTakeoff sx={{ fontSize: 17 }} />
              </Avatar>
            </Divider>
          </Grid2>
          <Grid2 size={4}>
            <Typography
              sx={{ fontSize: 22, fontWeight: 700, fontFamily: nunito.style }}
            >
              {moment(
                extraDetails?.Results?.Segments[0][
                  extraDetails?.Results?.Segments[0]
                    .length - 1
                ]?.Destination.ArrTime
              ).format("HH:mm")}
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
            >
              {
                extraDetails?.Results?.Segments[0][
                  extraDetails?.Results?.Segments[0]
                    .length - 1
                ]?.Destination.Airport.AirportCode
              }{" "}
              -{" "}
              {
                extraDetails?.Results?.Segments[0][
                  extraDetails?.Results?.Segments[0]
                    .length - 1
                ]?.Destination.Airport.Terminal
              }{" "}
              Terminal
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
            >
              {
                extraDetails?.Results?.Segments[0][
                  extraDetails?.Results?.Segments[0]
                    .length - 1
                ]?.Destination.Airport.CityName
              }
            </Typography>
          </Grid2>
         
        </Grid2>


   
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: "1px solid gray",
        }}
      >
        <SelectedList />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "center",
          gap: "20px",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <Box
            sx={{
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
              border: "1px solid gray",
              borderRadius: "4px",
              backgroundColor: COLORS.PRIMARY,
              color: "white",
            }}
          >
            <PersonOutlineIcon />
          </Box>
          <Typography variant="subtitle2" sx={{textAlign:"center",fontSize:"12px"}}>Reserved</Typography>
        </Box>
        <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <Box
            sx={{
              width: "20px",
              height: "20px",
              p: 1,
              border: "1px solid gray",
              borderRadius: "4px",
              backgroundColor: COLORS.GREEN,
            }}
          ></Box>
          <Typography variant="subtitle2" sx={{textAlign:"center",fontSize:"12px"}}>Selected</Typography>
        </Box>
        <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <Box
            sx={{
              width: "20px",
              height: "20px",
              p: 1,
              border: "2px solid blue",
              borderRadius: "4px",
             
            }}
          ></Box>
          <Typography variant="subtitle2" sx={{textAlign:"center",fontSize:"12px"}}>Available</Typography>
        </Box>
        <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <Box
            sx={{
              width: "20px",
              height: "20px",
              p: 1,
              border: "1px solid gray",
              borderRadius: "4px",
              backgroundColor: COLORS.RED,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <CancelIcon />
          </Box>
          <Typography sx={{textAlign:"center",fontSize:"12px"}} variant="subtitle2">Blocked</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SeatDetail;
