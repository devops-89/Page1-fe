import React from "react";
import InnerBanner from "@/components/innerBanner";
import backgroundImage from "@/banner/activitiesbg.jpg";
import { data } from "@/assests/data";
import { Container, Typography, Box, Grid2 } from "@mui/material";
import { roboto } from "@/utils/fonts";
import ActivityWithoutBackground from "@/components/activity/ActivityWithoutBackground";
import ActivityWithBackground from "@/components/activity/ActivityWithBackground";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import ActivityForm from "@/components/activity/ActivityForm";

const Activities = () => {
  const dispatch = useDispatch();
  function openForm() {
    dispatch(showModal(<ActivityForm />));
  }

  return (
    <>
      <InnerBanner img={backgroundImage.src} heading={"Our Activites"} />

      <Container sx={{ my: 10 }}>
        <Grid2
          container
          spacing={8}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid2
            size={{ xs: 12 }}
            sx={{ textAlign: { xs: "center", sm: "start" } }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: roboto.style, mb: 3 }}
            >
              {data.activitiesPage.activities.heading}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: roboto.style }}>
              {data.activitiesPage.activities.desc}
            </Typography>
          </Grid2>

          <Grid2 size={12}>
            <ActivityWithoutBackground
              activity={data.activitiesPage.allactivities[0]}
              height=""
              handleOpenForm={openForm}
            />
          </Grid2>
        </Grid2>
      </Container>

      <ActivityWithBackground
        activity={data.activitiesPage.allactivities[1]}
        handleOpenForm={openForm}
      />

      <Container sx={{ my: 10 }}>
        <Grid2
          container
          spacing={8}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid2 size={12}>
            <ActivityWithoutBackground
              activity={data.activitiesPage.allactivities[2]}
              height=""
              handleOpenForm={openForm}
            />
          </Grid2>
        </Grid2>
      </Container>


      <ActivityWithBackground
        activity={data.activitiesPage.allactivities[3]}
        handleOpenForm={openForm}
      />

      <Container sx={{ my: 10 }}>
        <Grid2
          container
          spacing={8}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid2 size={12}>
            <ActivityWithoutBackground
              activity={data.activitiesPage.allactivities[4]}
              height="700px"
              handleOpenForm={openForm}
            />
          </Grid2>
        </Grid2>

      </Container>


          <ActivityWithBackground
            activity={data.activitiesPage.allactivities[5]}
            handleOpenForm={openForm}
          />
    

        <Container sx={{ my: 10 }}>
        <Grid2
          container
          spacing={8}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
       <Grid2 size={12}>
      
          <ActivityWithoutBackground
            activity={data.activitiesPage.allactivities[6]}
            height="750px"
            handleOpenForm={openForm}
          />
        </Grid2> 
        </Grid2>
        </Container>
     
    </>
  );
};

export default Activities;
