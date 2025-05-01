import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Box } from '@mui/material';
import { COLORS } from '@/utils/colors';
import { roboto } from '@/utils/fonts';

export default function OutstationFaq() {
  return (
    <Box sx={{my:{xs:6, sm:10}}}>
        <Typography variant='h4' sx={{color:COLORS.PRIMARY,fontFamily:roboto.style,fontWeight:"bold",textAlign:"center",mb:3, fontSize:{xs:24, sm:30}}}>Frequently Asked Questions?</Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" sx={{fontFamily:roboto.style,fontWeight:"bold"}}>On my vacation, what kind of meals can i expect to Eat?</Typography>
        </AccordionSummary>
        <AccordionDetails>
       <Typography variant='body2' sx={{fontFamily:roboto.style}}>
       Food is one of the most exciting parts of a trip. The local food primarily depends on the destination you choose to travel to. Moreover, your daily meals depend on the budget and type of package you select.
       </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span" sx={{fontFamily:roboto.style,fontWeight:"bold"}}>What Services does Page1 Travels Provide?</Typography>
        </AccordionSummary>
        <AccordionDetails>
       <Typography variant='body2' sx={{fontFamily:roboto.style}}> Kindly visit our Services page if you wish to know about our services.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span" sx={{fontFamily:roboto.style,fontWeight:"bold"}}>How Safe is My Luggage On The Trip?</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant='body2' sx={{fontFamily:roboto.style}}>We take every measure to keep your valuables safe while travelling. But still, both lockable luggage and travel insurance are a must to avoid any loss.</Typography>
        </AccordionDetails>
        
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span" sx={{fontFamily:roboto.style,fontWeight:"bold"}}>How can i know about the current Offers?</Typography>
        </AccordionSummary>
        <AccordionDetails>
       <Typography variant="body2" sx={{fontFamily:roboto.style}}> For current offers and packages kindly visit the Packages section on our website. You can find all related information on that page. Moreover, for further details, you can Contact Us.</Typography>
        </AccordionDetails>
        
      </Accordion>
    </Box>
  );
}
