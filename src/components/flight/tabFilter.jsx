import { Box, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import TabPanel from '../tabPanel'
import { COLORS } from '@/utils/colors';
import { nunito } from '@/utils/fonts';
import moment from 'moment';
import MultiListBox from './multListBox';

const TabFilter = ({ flightList }) => {

    const [value, setValue] = useState(0);
    const [departureRoute, setDepatureRoute] = useState(flightList?.flight_list?.flightData[0]?.departure);

    // console.log("departure", flightList)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                centered
                sx={{
                    mb: "20px",
                    backgroundColor: COLORS.SEMIGREY,
                    "& .MuiTabs-indicator": { backgroundColor: COLORS.PRIMARY, display: "none" },
                    width: "100%",
                }}
            >
                {departureRoute.map((route, index) => (
                    <Tab
                        key={index}
                        label={
                            <Box sx={{ textAlign: "center", width: "100%" }}>
                                <Typography sx={{ fontFamily: nunito.style, fontWeight: 700 }} variant="body1">
                                    {`${route[0]?.Origin?.Airport?.CityName} - ${route[route.length - 1]?.Destination?.Airport?.CityName}`}
                                </Typography>
                                <Typography sx={{ fontFamily: nunito.style, fontWeight: 500 }} variant="body2">
                                    {moment(route[0]?.Origin?.DepTime).format("Do MMM YY")}
                                </Typography>
                            </Box>
                        }
                        sx={{
                            flex: 1,
                            maxWidth: "none",
                            color: "black",
                            textTransform: "none",
                            "&.Mui-selected": {
                                backgroundColor: COLORS.SECONDARY,
                                color: COLORS.WHITE,
                                borderRadius: "4px",
                                py: '20px'
                            },
                        }}
                    />
                ))}
            </Tabs>



            {flightList?.flight_list?.flightData?.map((departureData, index) => {

                const refundableValue = departureData?.IsRefundable

                return (
                    <>
                        {departureData?.departure?.map((details, index) => {
                            return (
                                <TabPanel value={value} index={index}>
                                    <MultiListBox details={details} refundableValue={refundableValue} />
                                </TabPanel>
                            )
                        })}
                    </>
                )
            })}


        </Box>

    )
}

export default TabFilter