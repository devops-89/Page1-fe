import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { Add, Remove } from "@mui/icons-material";
import { IconButton, Stack, TextField, Typography } from "@mui/material";

const TravellorCounter = ({
  heading,
  value,
  setValue,
  onIncrease,
  onDecrease,
}) => {
  // const increaseCounter = () => {
  //   setValue(value + 1);
  //   valueDetector(value + 1);
  // };
  // const decreaseCounter = () => {
  //   setValue(value - 1);
  //   valueDetector(value - 1);
  // };
  return (
    <div>
      <Typography
        sx={{
          fontSize: 13,
          color: COLORS.BLACK,
          fontFamily: nunito.style,
        }}
        mt={2}
      >
        {heading}
      </Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={2} mt={1}>
        <IconButton
          sx={{
            backgroundColor: COLORS.GREY,
            ":hover": {
              backgroundColor: COLORS.GREY,
            },
            // width
          }}
          onClick={onDecrease}
          disabled={value === 1}
        >
          <Remove sx={{ fontSize: 20 }} />
        </IconButton>
        <TextField
          sx={{
            fieldset: {
              border: "none",
              width: 30,
            },
            "& .MuiOutlinedInput-input": {
              padding: 0,
              textAlign: "center",
              fontSize: 14,
            },
          }}
          fullWidth
          value={value}
          slotProps={{}}
        />
        <IconButton
          sx={{
            backgroundColor: COLORS.GREY,
            ":hover": {
              backgroundColor: COLORS.GREY,
            },
          }}
          onClick={onIncrease}
        >
          <Add sx={{ fontSize: 20 }} />
        </IconButton>
      </Stack>
    </div>
  );
};

export default TravellorCounter;
