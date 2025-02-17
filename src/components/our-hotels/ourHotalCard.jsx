import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import PoolIcon from '@mui/icons-material/Pool';
import { COLORS } from "@/utils/colors";

import HotTubOutlinedIcon from '@mui/icons-material/HotTubOutlined';

export default function OurHotalCard() {
  return (
    <Container>
      <Stack
        direction={{lg:"row" ,md:"column"}}
      
        sx={{ mt:2, border: "1px solid gray", padding: 2, borderRadius: "8px" }}
        divider={<Divider orientation="vertical" flexItem />}

      >
        <Stack
          direction={{lg:"row" ,md:"column"}}
          spacing={2}
          flexGrow={1}
          sx={{ border: "px solid gray" }}
        >
          <Stack direction={"column"} spacing={1}>
            <Box sx={{ width: {lg:260 , md:"100%"}, height: 150, borderRadius: "16px" }}>
              <Box
                component={"img"}
                src="https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            </Box>
            {/* <div>hey i am small small img box</div> */}

            <Stack direction={"row"} spacing={1}>
              <Box sx={{ width: {lg:58 ,md:"100%"}, height: 58 }}>
                <Box
                  component={"img"}
                  src="https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover ",
                    borderRadius: "4px",
                  }}
                />{" "}
              </Box>

              {/* imag2 */}
              <Box sx={{ width: {lg:58 ,md:"100%"},height: 58 }}>
                <Box
                  component={"img"}
                  src="https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />{" "}
              </Box>

              <Box sx={{ width: {lg:58 ,md:"100%"}, height: 58 }}>
                <Box
                  component={"img"}
                  src="https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />{" "}
              </Box>

              <Box sx={{ width: {lg:58 ,md:"100%"},height: 58 }}>
                <Box
                  component={"img"}
                  src="https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />{" "}
              </Box>
            </Stack>
          </Stack>

          {/* <div>hey i am content box of img</div> */}
          <Stack direction={"column"} gap={1}>
            <Typography
              variant="h5"
              component={"h1"}
              sx={{ fontWeight: "bold" }}
            >
              SinQ Beach Resort
            </Typography>

            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={2}
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ bgcolor: COLORS.GREY }}
                />
              }
            >
              <Typography
                variant="subtitle1"
                color={COLORS.BHARTIBLUE}
                sx={{ fontWeight: "bold" }}
              >
                Calangute
              </Typography>
              <Typography variant="subtitle2">
                6 ,minutes walk to Calangute Beach
              </Typography>
            </Stack>
            <Button variant="outlined" sx={{width:"40%" ,paddingTop:0.3,paddingBottom:0.3, fontSize:11, } } noWrap={true} >Couple Friendly</Button>
            {/* service stack */}
            <Stack direction={{lg:"row",sm:"column"}} gap={2} sx={{paddingTop:1}}>
              

              <Stack direction={"row"} gap={1} alignItems={"center"} >
                <PoolIcon sx={{ fontSize:18 ,color:COLORS.DARKGREY}}/>
                <Typography variant="subtutle2" color={COLORS.DARKGREY}>Swimming Pool</Typography>
              </Stack>

              <Stack direction={"row"} gap={1} alignItems={"center"} >
                <PoolIcon sx={{ fontSize:18 ,color:COLORS.DARKGREY}}/>
                <Typography variant="subtutle2" color={COLORS.DARKGREY}>Swimming Pool</Typography>
              </Stack>

              <Stack direction={"row"} gap={1} alignItems={"center"} >
                <PoolIcon sx={{ fontSize:18 ,color:COLORS.DARKGREY}}/>
                <Typography variant="subtutle2" color={COLORS.DARKGREY}>Swimming Pool</Typography>
              </Stack>
              
              

            
              
            </Stack>
             {/* service stack */}

             <Stack direction={"row"} gap={1} alignItems={"center"} sx={{paddingTop:1}} >
                <PoolIcon sx={{ fontSize:18 ,}}/>
                <Typography variant="subtutle2">Near Calangute Beach ,stunning pool area surrounded by lush greenery ,room with pool views</Typography>
              </Stack>
              

          </Stack>
        </Stack>

      {/* second box */}

      <Stack  spacing ={1} direction={"column"} sx={{
    justifyContent: "flex-start",
    alignItems: {lg:"flex-end" ,md:"flex-start"},
    paddingLeft:4,
    mt:{lg:0 ,md:4}
  }}>
       <Stack direction={"row"} alignItems={"center"} spacing={1}>

       <Typography variant="h6" sx={{color:COLORS.SECONDARY , fontWeigh:"extrabold" }}  >very Good </Typography>
       <Box sx={{ backgroundColor :COLORS.SECONDARY ,color:"white" ,padding:0.5 ,borderRadius:0.8 ,}}>
        <Typography sx={{ fontWeight:"bold" }}> 3.9
        </Typography></Box>
       </Stack>
       <Typography variant="subtitle1">(5,7302)</Typography>

       <Stack  sx={{
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingLeft:4
  }} >
       <Typography variant="subtitle2" sx={{textDecoration:"line-through" ,color:COLORS.DARKGREY}}>(5,7302)</Typography>

       <Typography variant="h6" sx={{fontWeight:"bold"}}>(5,7302)</Typography>
       <Typography variant="subtitle2" sx={{ color:COLORS.DARKGREY ,textAlign:"end"}}>$ 598 taxes & fees Per Night</Typography>

       </Stack>

       <Typography variant="subtitle2" sx={{color:COLORS.SECONDARY ,pt:2 , textAlign:"end" ,fontWeight:"bold", fontSize:12}} >Login to book Now & Pay Later!</Typography>
       

      </Stack>

      {/* second box */}


       
      </Stack>
    </Container>
  );
}

{
  /* <Stack direction={"row"} >

<Stack direaction={"row"} >
  
  <Box component={"div"} >
    <Box sx={{width:350, height:200}}>
      <Box 
      component={"img"}
      src = "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
       sx ={{width:"100%" ,height:"100%" ,objectFit:"cover"}}

      >
        
      </Box>

  
    </Box>

  </Box>


</Stack>
<Box>
 <h1>hello</h1>
</Box>
</Stack> */
}
