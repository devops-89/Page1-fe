import { COLORS } from "@/utils/colors";
import { Box, Container, Grid2 ,useMediaQuery } from "@mui/material";
import React from "react";
import ServicesCard from "./servicesCard";
import { data } from "@/assests/data";
import { useRouter } from "next/router";
import FromTasting from "../fromTasting";

const Services = () => {
  const router = useRouter();
  const phone = useMediaQuery("(max-width:600px)");
  const tablet =  useMediaQuery("(max-width:900px)");
  const fontSize = phone ? "wrap" : tablet ? "wrap" : "noWrap";

  const handlePage = (path) => {
    router.push(path);
  };
  return (
    <Box sx={{ }}>
    
      <Box sx={{ backgroundColor: COLORS.BLACK }}>
        <Container >
          <Grid2 container  spacing={3} wrap={fontSize}   columns={{ xs: 4, sm: 8, md: 8 }}>
            {data.servicesData.map((val, i) => (
              <Grid2 size={1} pt={2} pb={2} key={i} 
          
           
              
            >
                <ServicesCard
                  img={val.img}
                  title={val.title}
                  onClick={() => handlePage(val.url)}
                />
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

       <Container>
       {/* <FromTasting/> */}

       </Container>
    </Box>
  );
};

export default Services;
