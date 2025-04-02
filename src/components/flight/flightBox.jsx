import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {
    Card,
    Popover,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import moment, { duration } from "moment";
import React, { useState } from "react";

const FlightBox = ({ tableData }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverData, setPopoverData] = useState(null);

    const handlePopoverOpen = (event, data) => {
        setAnchorEl(event.currentTarget);
        setPopoverData(data);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverData(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Card sx={{ p: 1, mt: 2 ,}}>
                <TableContainer>
                    <Table>

                        {tableData?.map((intermediate, index) => (
                            <TableRow
                                key={index}
                                aria-owns={open ? "mouse-over-popover" : undefined}
                                aria-haspopup="true"
                                onMouseEnter={(event) => {
                                    handlePopoverOpen(event, { duration: intermediate.Duration, })
                                }}
                                onMouseLeave={handlePopoverClose}
                            >
                                <TableCell sx={{ padding: "8px" }}>
                                    <Typography
                                        sx={{
                                            textAlign: "start",
                                            fontSize:  {lg:15 , xs:12},
                                            fontWeight: 600,
                                            fontFamily: nunito.style,
                                        }}
                                    >
                                        {`${intermediate.Origin.Airport.CityCode} - ${intermediate.Origin.Airport.CityName
                                            } (${moment(intermediate.Origin.DepTime).format("HH:mm")})`}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                                    <ArrowRightAltIcon sx={{ color: COLORS.PRIMARY }} />
                                </TableCell>
                                <TableCell sx={{ padding: "8px" }}>
                                    <Typography
                                        sx={{
                                            fontSize: {lg:15 , xs:12},
                                            fontWeight: 600,
                                            fontFamily: nunito.style,
                                            textAlign: "end",
                                        }}
                                    >
                                        {`${intermediate.Destination.Airport.CityCode} - ${intermediate.Destination.Airport.CityName
                                            } (${moment(intermediate.Destination.ArrTime).format(
                                                "HH:mm"
                                            )})`}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                    <Popover
                        id="mouse-over-popover"
                        sx={{ pointerEvents: "none" }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography
                            sx={{ p: 1, fontSize: "12px", fontFamily: nunito.style }}
                        >
                            {popoverData ? (
                                <>
                                    <strong>Origin:</strong>{" "}
                                    {`${Math.floor(
                                        moment.duration(popoverData.duration, "minutes").asHours()
                                    )} hrs ${moment
                                        .duration(popoverData.duration, "minutes")
                                        .minutes()} min`}
                                </>
                            ) : (
                                "Loading..."
                            )}
                        </Typography>
                    </Popover>
                </TableContainer>
            </Card>
        </>
    );
};

export default FlightBox;
