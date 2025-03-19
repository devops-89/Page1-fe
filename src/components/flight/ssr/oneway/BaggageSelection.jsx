import * as React from "react";
import { Typography, Grid2 } from "@mui/material";
import { nunito } from "@/utils/fonts";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LuggageIcon from '@mui/icons-material/Luggage';
import { COLORS } from "@/utils/colors";
import BaggageCard from "../../baggageCard";


export default function BaggageSelection({ baggageData, handleBaggageValue, selectBaggage }) {
 
  return (
    <>
      <Accordion sx={{mb:'10px'}}>
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{backgroundColor:COLORS.SEMIGREY}}
        >
          <Typography
            variant="body1"
            sx={{ fontFamily: nunito.style, fontWeight: 700, display:'flex', alignItems:'center' }}
          >
          <LuggageIcon sx={{color:COLORS.PRIMARY, marginRight:'10px'}}/> Baggage 
          </Typography>
        </AccordionSummary>
        <AccordionDetails  sx={{p:1,maxHeight:"240px",overflowY:"auto"}}>
        {baggageData?.map((singleBaggage, baggageIndex) => {
        return (
          <>
            <Grid2
              container
              spacing={2}
              sx={{ flexWrap: "wrap" }}
              key={baggageIndex}
            >
              {singleBaggage?.map((baggage, baggageIndex) => {
                return (
                  <Grid2 size={{lg:6 , xs:12}}>
                    <BaggageCard baggage={baggage} key={baggageIndex} handleBaggageValue={handleBaggageValue} isSelected={selectBaggage?.Code === baggage?.Code}/>
                  </Grid2>
                );
              })}
            </Grid2>
          </>
        );
      })}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
