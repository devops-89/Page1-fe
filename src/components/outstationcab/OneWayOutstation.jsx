import React from 'react'
import { Box,TextField,Button } from '@mui/material'
import {COLORS} from "@/utils/colors";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { roboto } from '@/utils/fonts';
const OneWayOutstation = () => {
  return (
   <Box>
    <TextField id="outlined-basic" size='small' label="Pickup Location" variant="outlined" sx={{width:"100%",my:1}} />
    <TextField id="outlined-basic" size='small' label="Dropp Location" variant="outlined" sx={{width:"100%",my:1}} />
    <TextField id="outlined-basic" size='small' label="Mobile Number" variant="outlined" sx={{width:"100%",my:1}} />
    <TextField id="outlined-basic" size='small' label="Number Of Person" variant="outlined" sx={{width:"100%",my:1}} />
    <LocalizationProvider  dateAdapter={AdapterDayjs} >
   
        <DatePicker label="Pickup Date" slotProps={{textField:{
          fullWidth:true,
          size:"small"
        }}}  sx={{my:1}} />
     
    </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    
        <DatePicker label="Return Date" sx={{my:1}} slotProps={{textField:{
          size:"small",
          fullWidth:true
        }}}/>
   
    </LocalizationProvider>
    <TextField id="outlined-basic" size='small' label="Time" variant="outlined" sx={{width:"100%",my:1}} />
    <Button sx={{bgcolor:COLORS.PRIMARY,color:COLORS.WHITE,fontFamily:roboto.style,my:1}} fullWidth={true} size='small'>Book Now</Button>
   </Box>
  )
}

export default OneWayOutstation