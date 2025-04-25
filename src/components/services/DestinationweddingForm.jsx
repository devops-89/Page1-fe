import { data } from "@/assests/data";
import { roboto } from "@/utils/fonts";
import { Grid2, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import DestinationWeddingStep1Form from "./DestinationWeddingStep1Form";
import DestinationWeddingSecondForm from "./DestinationWeddingSecondForm";
import DestinationWeddingThirdForm from "./DestinationWeddingThirdForm";

const DestinationweddingForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      <Grid2 container alignItems={"center"}>
        <Grid2 size={3}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {data.destinationWeddingSteps.map((val, i) => (
              <Step>
                <StepLabel>
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {val.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid2>
        <Grid2 size={9}>
          {activeStep === 0 && (
            <DestinationWeddingStep1Form
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          )}
          {activeStep === 1 && (
            <DestinationWeddingSecondForm
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          )}
          {activeStep === 2 && (
            <DestinationWeddingThirdForm
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          )}
        </Grid2>
      </Grid2>
    </div>
  );
};

export default DestinationweddingForm;
