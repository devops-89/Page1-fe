import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Grid2,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BusinessIcon from "@mui/icons-material/Business";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import Package from "@/components/dashboard/Package";

import Flight from "@/components/dashboard/Flight";
import Hotel from "@/components/dashboard/Hotel";
import BookingGrid from "@/components/dashboard/DashboardSection";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          {children}
        </div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const userData = useSelector((state) => state?.USER?.UserData);
  const isAuthenticated = userData?.isAuthenticated;

  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <Grid2 container>
        <Grid2
          size={{ xs: "12" }}
          sx={{
            height: "230px",
            background: "rgba(8,8,79,1)",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: "100px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: COLORS.WHITE,
              fontFamily: nunito.style,
              fontWeight: 700,
            }}
          >
            Welcome to Your Dashboard
          </Typography>
        </Grid2>
      </Grid2>

      {/* Main Section */}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Grid2 container spacing={2}>
          {/* Sidebar Tabs */}
          <Grid2
            size={{ xs: 12, sm: 3, md: 2 }}
            sx={{ boxShadow: `1px 0px 2px ${COLORS.GREY}` }}
          >
            <Tabs
              orientation={isSmallScreen ? "horizontal" : "vertical"}
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Dashboard Tabs"
              sx={{
                "& .MuiTab-root": {
                  justifyContent: "flex-start",
                  alignItems: "center",
                  textAlign: "left",
                  fontFamily: nunito.style,
                  fontWeight: 600,
                  textTransform: "none",
                  minHeight: 48,
                  gap: "10px",
                  color: COLORS.BLACK,
                },
                "& .Mui-selected": {
                  backgroundColor: COLORS.PRIMARY,
                  color: "#fff!important",
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
            >
              <Tab
                {...a11yProps(0)}
                icon={<DashboardIcon fontSize="medium" />}
                iconPosition="start"
                label="Dashboard"
              />
              <Tab
                {...a11yProps(1)}
                icon={<LocalShippingIcon fontSize="medium" />}
                iconPosition="start"
                label="Package Order"
              />
              <Tab
                {...a11yProps(2)}
                icon={<FlightTakeoffIcon fontSize="small" />}
                iconPosition="start"
                label="Flight Booking"
              />
              <Tab
                {...a11yProps(3)}
                icon={<BusinessIcon fontSize="small" />}
                iconPosition="start"
                label="Hotel Booking"
              />
            </Tabs>
          </Grid2>

          {/* Content Area */}
          <Grid2 size={{ xs: 12, sm: 9, md: 10 }}>
            <TabPanel value={value} index={0}>
              <BookingGrid setValue={setValue} />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Package />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Flight userId={userData?.id} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Hotel userId={userData?.id} />
            </TabPanel>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default Dashboard;
