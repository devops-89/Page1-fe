import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { TextField, Typography, Grid2 } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { nunito } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";

export default function BaggageSelection({ baggageData }) {
  const theme = useTheme();
  const [selectedBaggage, setSelectedBaggage] = React.useState({}); 

  return (
    <>
      <Typography
        variant="h6"
        sx={{ fontFamily: nunito.style, fontWeight: 700, mb: "10px" }}
      >
        Select Your Baggage
      </Typography>

      {baggageData?.map((singleBaggage, baggageIndex) => {
        return (
          <Autocomplete
            key={baggageIndex}
            size="small"
            options={singleBaggage || []} 
            getOptionLabel={(baggage) => baggage?.Text || "--"}
            value={selectedBaggage[baggageIndex] || null} 
            onChange={(event, newValue) => {
              console.log(`Selected baggage for index ${baggageIndex}:`, newValue);
              setSelectedBaggage((prev) => ({ ...prev, [baggageIndex]: newValue }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Baggage" variant="outlined" />
            )}
            renderOption={(props, baggage) => (
              <li {...props} key={baggage?.AirlineDescription || `baggage-${baggageIndex}`}>
                <Grid2 container spacing={2} sx={{ width: "100%" }}>
                  <Grid2 size={7} sx={{ textAlign: "start", fontWeight: 600, fontFamily: nunito.style }}>
                    {baggage?.Text || "--"}
                  </Grid2>
                  <Grid2 size={2} sx={{ textAlign: "center", fontWeight: 600, fontFamily: nunito.style }}>
                    {baggage?.Weight ? `${baggage.Weight} kg` : "--"}
                  </Grid2>
                  <Grid2 size={3} sx={{ textAlign: "end", fontWeight: 600, fontFamily: nunito.style }}>
                    {baggage?.Price ? `${baggage.Price} ${baggage.Currency || ""}` : "Free"}
                  </Grid2>
                </Grid2>
              </li>
            )}
            sx={{
              width: "100%",
              mb: 2,
              overflowY:'scroll',
              fontFamily: nunito.style,
              ...loginTextField,
              "& fieldset": { borderWidth: "2px!important" },
            }}
          />
        );
      })}
    </>
  );
}
