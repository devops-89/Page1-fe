import React from "react";
import { Grid2, Button, Typography, Box, Stack,Divider,Avatar } from "@mui/material";
import SelectedList from "./SelectedList";
import { COLORS } from "@/utils/colors.js";

import moment from "moment";
import { FlightTakeoff } from "@mui/icons-material";
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';

import { nunito } from "@/utils/fonts";
const SeatDetail = ({extraDetails,planeIndex}) => {

  //  console.log("Seat Details",extraDetails);
  return (
    <Box
      item
      sx={{
        border: "1px solid gray",
        width: { lg: "450px", xs: "100%" }, // Fixed width for lg, 100% for smaller
        maxWidth: "100%", // Prevent overflow on smaller screens
        minWidth: { xs: "auto", sm: "300px" }, // Minimum width to ensure readability
        borderRadius: "10px",
        boxShadow: 2,
        backgroundColor: COLORS.WHITE,
        p: 2,
        overflow: "hidden", // Ensures no overflow from the content
        boxSizing: "border-box", // Include padding and border in the width
      }}
    >
    {/* expermiment start */}
    

    <Grid2 container sx={{p:1}} spacing={6} alignItems={"flex-start"}>
          <Grid2 size={4} sx={{textAlign:'center'}}>
            <Typography
              sx={{ fontSize:{lg:22 , xs:15}, fontWeight: 700, fontFamily: nunito.style }}
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
          <Grid2 size={4} sx={{textAlign:'center'}}>
            <Typography
              sx={{
                fontSize: {lg:18 , xs:14},
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
                <FlightTakeoff sx={{ fontSize: {lg:17 , xs:15} }} />
              </Avatar>
            </Divider>
          </Grid2>
          <Grid2 size={4} sx={{textAlign:'center'}}>
            <Typography
              sx={{ fontSize: {lg:22 , xs:14}, fontWeight: 700, fontFamily: nunito.style }}
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
         
          <Grid2 size={12} sx={{ display:"flex", alignItems:"center", justifyContent:'center'}}>
          <SelectedList planeIndex={planeIndex} />
          </Grid2>
        </Grid2>


  
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "center",
          gap: {lg:"20px" ,xs:"10px"},
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
              p: {lg:1 ,xs:2},
              border: "1px solid gray",
              borderRadius: "4px",
              color: "white",
              mb:'10px'
            }}
          >
            <AirlineSeatReclineExtraIcon sx={{color:COLORS.PRIMARY}}/>
          </Box>
          <Typography variant="body1" sx={{textAlign:"center", fontFamily:nunito.style ,fontSize:{lg:16 , xs:13}}}>Reserved</Typography>
        </Box>
        <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",  fontFamily:nunito.style}}>
          <Box
            sx={{
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: {lg:1 ,xs:2},
              border: "1px solid gray",
              borderRadius: "4px",
              color: "white",
              mb:'10px'
            }}
          >
             <AirlineSeatReclineExtraIcon sx={{color:COLORS.GREEN,}}/>
          </Box>
          <Typography variant="body1" sx={{textAlign:"center", fontFamily:nunito.style ,fontSize:{lg:16 , xs:13}}}>Selected</Typography>
        </Box>
        <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <Box
            sx={{
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: {lg:1 ,xs:2},
              border: "1px solid gray",
              borderRadius: "4px",
              color: "white",
              mb:'10px'
             
            }}
          >
            <AirlineSeatReclineExtraIcon sx={{color:COLORS.SECONDARY}}/>
          </Box>
          <Typography variant="body1" sx={{textAlign:"center", fontFamily:nunito.style ,fontSize:{lg:16 , xs:13}}}>Available</Typography>
        </Box>
        <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <Box
            sx={{
              width: "20px",
              height: "20px",
              p: {lg:1 ,xs:2},
              border: "1px solid gray",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
               mb:'10px'
            }}
          >
             <AirlineSeatReclineExtraIcon sx={{color:COLORS.RED}}/>
          </Box>
          <Typography variant="body1" sx={{textAlign:"center", fontFamily:nunito.style ,fontSize:{lg:16 , xs:13}}}>Blocked</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SeatDetail;
