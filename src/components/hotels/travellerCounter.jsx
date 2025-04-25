import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { Add, Remove } from "@mui/icons-material";
import { IconButton, Stack, TextField, Typography } from "@mui/material";

const TravellorCounter = ({
  heading,
  value,
  onIncrease,
  onDecrease,
  initialValue,
  disableButton
}) => {
  return (
    <>
    {/* {console.log("disableButton------------",disableButton)} */}
    <Stack  direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Typography
        sx={{
          fontSize: { lg: 14, xs: 12 },
          color: COLORS.BLACK,
          fontFamily: nunito.style,
          fontWeight:600
        }}
        mt={2}
      >
        {heading}
      </Typography>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={100}
        mt={1}

      >
        <IconButton
          sx={{
            backgroundColor: COLORS.GREY,
            ":hover": {
              backgroundColor: COLORS.GREY,
            },
            // width
          }}
          onClick={onDecrease}
          disabled={value === initialValue}
        >
          <Remove sx={{ fontSize: { lg: 20, md: 20, sm: 20, xs: 15 } }} />
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
          disabled={disableButton}
          sx={{
            backgroundColor: COLORS.GREY,
            ":hover": {
              backgroundColor: COLORS.GREY,
            },
          }}
          onClick={onIncrease}
        >
          <Add sx={{ fontSize: { lg: 20, md: 20, sm: 20, xs: 15 } }} />
        </IconButton>
      </Stack>
    </Stack>
    </>
  );
};

export default TravellorCounter;
