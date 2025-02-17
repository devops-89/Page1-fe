import Banner from "@/components/banner";
import InnerBanner from "@/components/innerBanner";
import OurHotalCard from "@/components/our-hotels/ourHotalCard";
import { Box, Typography } from "@mui/material";
import { data } from "@/assests/data";
import React from "react";
import { useState ,useEffect } from "react";

const OurHotels = () => {
  const [hotelList , setHotelList] = useState(null);
  useEffect(()=>{
    setHotelList(data.our_hotelers)

  } ,[])
  return (
    <div>
      <InnerBanner heading={"Our Hotels"} />
      <Box  sx={{ pt: 10, pb: 10 , }}>
       { (hotelList ) ?
         hotelList.map(( cur ,index)=>(
          <OurHotalCard 
          data ={cur}
        
          />
       ))

        :(<h1>no data found</h1>)
        
      }
       
      </Box>
    </div>
  );
};

export default OurHotels;
