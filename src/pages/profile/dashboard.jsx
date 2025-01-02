import { data } from "@/assests/data";
import InnerBanner from "@/components/innerBanner";
import Countcard from "@/components/profileDashboard/countCard";
import Sidebar from "@/components/profileDashboard/sidebar";
import { Box, Container, Grid2 } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <InnerBanner heading={"Dashboard"} />

      <Box sx={{ pt: 10, pb: 10 }}>
        <Container>
          <Grid2 container spacing={5}>
            <Grid2 size={3}>
              <Sidebar />
            </Grid2>
            <Grid2 size={9}>
              <Grid2 container spacing={4}>
                {data.countDataDashboard.map((val, i) => (
                  <Grid2 size={4} key={i}>
                    <Countcard
                      icon={val.icon}
                      number={val.number}
                      title={val.title}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;
