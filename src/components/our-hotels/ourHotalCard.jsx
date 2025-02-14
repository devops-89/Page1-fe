
import { Box ,Container,Stack ,Typography ,Divider } from '@mui/material';



export default function OurHotalCard() {
  return (
      <Container>
      <Stack  direction={"row"} sx={{border:"1px solid gray", padding:2 ,borderRadius:"8px"}}   divider={<Divider orientation="vertical" flexItem />}   >
        <Stack direction={"row"} spacing={2} flexGrow={1} sx={{border:"px solid gray"}} >
         <Stack direction={"column"} spacing={1}>
          <Box sx={{width:260, height:150 , borderRadius: '16px'}}>
          <Box 
          component={"img"}
           src = "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
           sx ={{width:"100%" ,height:"100%" ,objectFit:"cover" , borderRadius: '16px'}}/> 


          </Box>
          {/* <div>hey i am small small img box</div> */}

          <Stack direction={"row"} spacing={1} >

          <Box sx={{width:58, height:58}}>
          <Box 
          component={"img"}
           src = "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
           sx ={{width:"100%" ,height:"100%" ,objectFit:"cover " , borderRadius: '4px'} }/> </Box>
            
            {/* imag2 */}
            <Box sx={{width:58, height:58}}>
          <Box 
          component={"img"}
           src = "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
           sx ={{width:"100%" ,height:"100%" ,objectFit:"cover",borderRadius: '4px'}}/> </Box>
           
           <Box sx={{width:58, height:58}}>
          <Box 
          component={"img"}
           src = "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
           sx ={{width:"100%" ,height:"100%" ,objectFit:"cover" ,borderRadius: '4px'}}/> </Box>

<Box sx={{width:58, height:58}}>
          <Box 
          component={"img"}
           src = "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
           sx ={{width:"100%" ,height:"100%" ,objectFit:"cover" ,borderRadius: '4px'}}/> </Box>



            
            


          </Stack>


            
         </Stack>


        
        {/* <div>hey i am content box of img</div> */}
        <Stack direction={'column'}>
          <Typography variant='h5' component={"h1"}>
         SinQ Beach Resort
          </Typography>




        </Stack>

        </Stack>

        <div><h1>hey i am second box</h1></div>

      </Stack>
         
         </Container> 
  )
}



{/* <Stack direction={"row"} >

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
</Stack> */}
