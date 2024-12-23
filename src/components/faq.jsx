import { data } from "@/assests/data";
import { nunito, raleway } from "@/utils/fonts";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import React from "react";

const Faq = () => {
  return (
    <Box sx={{ pb: 10 }}>
      <Container>
        <Typography
          sx={{ fontSize: 35, fontWeight: 700, fontFamily: nunito.style }}
        >
          Frequently Asked Questions?
        </Typography>
        <Grid2 container spacing={5} mt={3}>
          {data.faq.map((val, i) => (
            <Grid2 size={6} key={i}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontFamily:nunito.style,
                      fontWeight: 550,
                    }}
                  >
                    {i + 1}. {val.label}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: nunito.style,
                      fontWeight: 550,
                    }}
                  >
                    {val.value}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Faq;
