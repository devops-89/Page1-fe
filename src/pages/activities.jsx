import React from "react";
import InnerBanner from "@/components/innerBanner";
import backgroundImage from "@/banner/activitiesbg.jpg";
import { data } from "@/assests/data";
import {
  Container,
  Typography,
  Box,
  
} from "@mui/material";
import { roboto } from "@/utils/fonts";
import ActivityWithoutBackground from "@/components/activity/ActivityWithoutBackground";
import ActivityWithBackground from "@/components/activity/ActivityWithBackground";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import ActivityForm from "@/components/activity/ActivityForm";


const Activities = () => {
  const dispatch=useDispatch();
  function openForm(){
       dispatch(showModal(<ActivityForm/>));
  }

  return (
    <div>
      <InnerBanner img={backgroundImage.src} heading={"Our Activites"} />
      <Container >
        <Box sx={{ pt: 10 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontFamily: roboto.style }}
          >
            {data.activitiesPage.activities.heading}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "justify", fontFamily: roboto.style }}
          >
            {data.activitiesPage.activities.desc}
          </Typography>
        </Box>
        </Container>

        {/* all activities here */}
        <Box sx={{pb:10}}>
        <ActivityWithoutBackground activity={data.activitiesPage.allactivities[0]} height="" handleOpenForm={openForm} />
        <ActivityWithBackground activity={data.activitiesPage.allactivities[1]} handleOpenForm={openForm} />

        <ActivityWithoutBackground activity={data.activitiesPage.allactivities[2]} height="" handleOpenForm={openForm} />
        <ActivityWithBackground activity={data.activitiesPage.allactivities[3]} handleOpenForm={openForm} />

        <ActivityWithoutBackground activity={data.activitiesPage.allactivities[4]} height="700px" handleOpenForm={openForm} />
        <ActivityWithBackground activity={data.activitiesPage.allactivities[5]} handleOpenForm={openForm} />

        <ActivityWithoutBackground activity={data.activitiesPage.allactivities[6]} height="750px" handleOpenForm={openForm} />
        </Box>



      
    
    </div>
  );
};

export default Activities;
