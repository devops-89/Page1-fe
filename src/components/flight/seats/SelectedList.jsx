import React from "react";
import { Grid2, Button, Typography, Box, Stack } from "@mui/material";
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp";
import CancelIcon from '@mui/icons-material/Cancel';
const SelectedList = () => {
  return (
    <Stack direction={"column"}>
      <Stack direction={"row"} sx={{backgroundColor:"#E8F2FF",width:"380px",justifyContent:"space-between",alignItems:"center",px:1,py:1}}>
       
          <Box
            sx={{
              width: "40px",
              height: "40px",
              border: "1px solid gray",
              borderRadius: "4px",
              background: "blue",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              color:"white"
            }}
          >
            1A
          </Box>
         
       
        <Box>
          <CancelIcon />
          </Box>
      </Stack>
    </Stack>
  );
};

export default SelectedList;
