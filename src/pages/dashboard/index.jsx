import React from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  useMediaQuery,
  useTheme,
  Grid2,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import BluetoothDriveIcon from '@mui/icons-material/BluetoothDrive';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import Package from "@/components/dashboard/Package";
import Flight from "@/components/dashboard/Flight";
import Hotel from "@/components/dashboard/Hotel";
import Helicopter from "@/components/dashboard/Helicopter";
import Cab from "@/components/dashboard/Cab";
import SelfDrive from "@/components/dashboard/SelfDrive";
import Activities from "@/components/dashboard/Activities";
import DestinationWedding from "@/components/dashboard/DestinationWedding";
import OutstationCab from "@/components/dashboard/OutstationCab";
import BookingGrid from "@/components/dashboard/DashboardSection";

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
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Grid2 size={{ xs: 12, sm: 3, md: 2 }}>
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
                  color:COLORS.BLACK
                },
                "& .Mui-selected": {
                  backgroundColor: COLORS.PRIMARY,
                  color:'#fff',
                },
                "& .MuiTabs-indicator":{
                  display:'none'
                }

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
              <Tab
                {...a11yProps(4)}
                icon={<AssignmentIcon fontSize="small" />}
                iconPosition="start"
                label="Helicopter Booking"
              />
              <Tab
                {...a11yProps(5)}
                icon={<DirectionsCarIcon fontSize="small" />}
                iconPosition="start"
                label="Cabs"
              />
              <Tab
                {...a11yProps(6)}
                icon={<PeopleAltIcon fontSize="small" />}
                iconPosition="start"
                label="Destination Wedding"
              />
               <Tab
                {...a11yProps(7)}
                icon={<BluetoothDriveIcon fontSize="small" />}
                iconPosition="start"
                label="Self Drive"
              />
                <Tab
                {...a11yProps(8)}
                icon={<DirectionsCarIcon fontSize="small" />}
                iconPosition="start"
                label="Outstation Cab"
              />
               <Tab
                {...a11yProps(9)}
                icon={<NotificationsIcon fontSize="small" />}
                iconPosition="start"
                label="Activites"
              />
            </Tabs>
          </Grid2>

          {/* Content Area */}
          <Grid2 size={{ xs: 12, sm: 9, md: 10 }}>
            <TabPanel value={value} index={0}>
            <BookingGrid/>
            </TabPanel>

            <TabPanel value={value} index={1}>
             <Package/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Flight/>
            </TabPanel>
            <TabPanel value={value} index={3}>
             <Hotel/>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Helicopter/>
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Cab/>
            </TabPanel>
            <TabPanel value={value} index={6}>
              <DestinationWedding/>
            </TabPanel>
            <TabPanel value={value} index={7}>
              <SelfDrive/>
            </TabPanel>
             <TabPanel value={value} index={8}>
              <OutstationCab/>
            </TabPanel>
             <TabPanel value={value} index={9}>
              <Activities/>
            </TabPanel>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default Dashboard;
