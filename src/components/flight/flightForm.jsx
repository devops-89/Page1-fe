import { COLORS } from "@/utils/colors";
import { nunito, raleway } from "@/utils/fonts";
import { Box, Stack, Tab, Tabs, Typography ,useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabPanel from "../tabPanel";
import OnewayForm from "./oneWayForm";
import RoundTrip from "./roundTripForm";
import Multiway from "./multiForm";
import { useRouter } from "next/router";

const FlightForm = () => {
  const tab = [
    {
      label: "Oneway",
    },
    {
      label: "Round Trip",
    },
    {
      label: "Multi Trip",
    },
  ];

  const phone = useMediaQuery("(max-width:800px)");
  const tablet = useMediaQuery("(max-width:900px)");

  const router = useRouter();


  const [flightValue, setFlightValue] = useState(0);

  useEffect(() => {
    if (router.pathname === "/oneway-flightlist") {
      setFlightValue(0);
    } else if (router.pathname === "/roundtrip-flightlist") {
      setFlightValue(1);
    } else if (router.pathname === "/multitrip-flightlist") {
      setFlightValue(2);
    }
  }, [router.pathname]);

  const flightTabChangeHandler = (e, newValue) => {
    setFlightValue(newValue);
  };

  return (
    <Box sx={{ p: 1   }}>
   
      <Stack
        direction={{lg:"row" ,md:"row",xs:"column"}}
        alignItems={"center"}
        justifyContent={"space-between"}
       
      >
        <Tabs
          value={flightValue}
          sx={{
            
            "& .MuiTab-root": {
              width: {lg:115 , xs:100},
              minHeight: 40,
              top: 5,
              borderRadius: 8,
              padding: 0,
              transition: "0.5s ease all",
            },
            "& .MuiTabs-indicator": {
              display: "none !important",
            },
            "& .Mui-selected": {
              color: `${COLORS.BLACK} !important`,
            },
          }}
          onChange={flightTabChangeHandler}
        >
          {tab.map((val, i) => (
            <Tab
              icon={
                <Box
                  sx={{
                  
                    backgroundColor:
                      i === flightValue
                        ? `${COLORS.SECONDARY}`
                        : "#d7d7d7",
                    borderRadius: "50%",
                    width: {lg:15 , xs:10},
                    height: {lg:15 , xs:10},
                    border:`4px solid ${COLORS.SEMIGREY}`,
                  }}
                ></Box>
              }
              label={
                <Typography
                  sx={{
                    fontSize: {lg:12 , xs:10},
                    fontWeight: 500,
                    fontFamily: nunito.style,
                  }}
                >
                  {val.label}
                </Typography>
              }
              iconPosition="start"
              key={i}
            />
          ))}
        </Tabs>
        <Typography sx={{ fontSize: {lg:15 , md:15 , sm:15 ,xs:14}, fontFamily: raleway.style, mr: 2 ,mb:{xs:1} ,textAlign:"center" }}>
          Millions of cheap flights. One simple search
        </Typography>
      </Stack>
     

      <TabPanel value={flightValue} index={0} >
        <OnewayForm />
      </TabPanel>
      <TabPanel value={flightValue} index={1}>
        <RoundTrip />
      </TabPanel>
      <TabPanel value={flightValue} index={2}>
        <Multiway />
      </TabPanel>
    </Box>
  );
};

export default FlightForm;