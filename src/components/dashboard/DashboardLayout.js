import { useState } from "react";
import { Container, Tabs, Tab, Grid2,Typography ,  useMediaQuery, useTheme} from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import BusinessIcon from "@mui/icons-material/Business";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {useRouter} from "next/router";
const DashboardLayout = ({ children, tabValue, setTabValue }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const router=useRouter();
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
                            value={tabValue}
                            onChange={(e, v) => {
                                setTabValue(v);
                                if (v === 0) router.push("/dashboard");
                                if (v === 1) router.push("/dashboard/flights");
                                if (v === 2) router.push("/dashboard/hotels");
                            }
                            }

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

                                icon={<Person2Icon fontSize="medium" />}
                                iconPosition="start"
                                label="Profile"
                            />

                            <Tab

                                icon={<FlightTakeoffIcon fontSize="small" />}
                                iconPosition="start"
                                label="Flight Booking"
                            />
                            <Tab

                                icon={<BusinessIcon fontSize="small" />}
                                iconPosition="start"
                                label="Hotel Booking"
                            />
                        </Tabs>
                    </Grid2>

                {/* Right Side Dynamic Content */}
                <Grid2 size={{ xs: 12, sm: 9, md: 10 }}>
                    {children}
                </Grid2>
            </Grid2>
        </Container>
            </>
    );
};

export default DashboardLayout;
