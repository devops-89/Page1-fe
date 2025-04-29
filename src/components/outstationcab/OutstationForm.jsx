import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import OneWayOutstation from './OneWayOutstation';
import { roboto } from '@/utils/fonts';
import RoundTripOutstation from './RoundTripOutstation';
import { COLORS } from '@/utils/colors';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper'}}>
      <Tabs value={value} onChange={handleChange} TabIndicatorProps={{sx:{
        backgroundColor:COLORS.PRIMARY
      }}} centered>
        <Tab label="ONE-WAY" sx={{fontFamily:roboto.style,fontWeight:"bold", '&.Mui-selected': {
        color: COLORS.PRIMARY,
      }}} />
        <Tab label="ROUND-TRIP" sx={{fontFamily:roboto.style,fontWeight:"bold",'&.Mui-selected': {
        color: COLORS.PRIMARY,
      }}} />
      
      </Tabs>

      {/* Render content based on selected tab */}
      {value === 0 && (
        <Box sx={{ p: 3 }}>
         <OneWayOutstation/>
        </Box>
      )}
      {value === 1 && (
        <Box sx={{ p: 3 }}>
          <RoundTripOutstation />
        </Box>
      )}
     
    </Box>
  );
}
