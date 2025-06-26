import banner from "@/banner/hotel.jpg";
import LanguageIcon from "@mui/icons-material/Language";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import {
  Box,
  Typography,
  Container,
  Grid2,
  Button,
  Dialog,
  Rating,
  DialogTitle,
  IconButton,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { nunito } from "@/utils/fonts";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { COLORS } from "@/utils/colors";
import { styled } from "@mui/material/styles";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { HOTEL_RATING, HOTEL_RATING_IN_WORDS } from "@/utils/enum";
import Link from "next/link";
import useRandomColor from "@/custom-hook/useRandomColor";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const HotelDetails = () => {
  const router = useRouter();
  const { query } = useRouter();

  // extracting data from redux of hotel details
  const hotels = useSelector((state) => state.HOTEL.HotelList.hotelList || []);

  // console.log("Total Hotels: ", hotels);

  const [open, setOpen] = React.useState(false);
  const [roomType, setRoomType] = React.useState("");
  const [selectedHotel, setSelectedHotel] = useState({});

  useEffect(() => {
    setSelectedHotel(
      hotels.find((hotel) => hotel.HotelCode === query.slug) || {}
    );
  }, [query.slug]);

  console.log("selected Hotel Data:", selectedHotel);

  const handleChange = (event) => {
    setRoomType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };




  // =============================== address truncation logic start===============================
  const [openAddress, setOpenAddress] = useState(false);

  const handleOpenAddress = () => setOpenAddress(true);
  const handleCloseAddress = () => setOpenAddress(false);

  const maxLength = 50;
  const address = selectedHotel?.Address || "";

  const shouldTruncate = address.length > maxLength;
  const displayedAddress = shouldTruncate
    ? `${selectedHotel.Address.substring(0, maxLength)}...`
    : `${selectedHotel.Address}`;

  // ====================== address truncation logic end ============================================

  //====================== facilities truncation logic start ========================================
  const [openFacilites, setOpenFacilities] = useState(false);

  const handleOpenFacilities = () => setOpenFacilities(true);
  const handleCloseFacilities = () => setOpenFacilities(false);

  const maxFacilitiesLength = 5;
  const facilities = selectedHotel?.HotelFacilities || "";

  const shouldTruncateFacilities = facilities.length > maxFacilitiesLength;
  const displayedFacilities = shouldTruncateFacilities
    ? selectedHotel?.HotelFacilities?.slice(0, maxFacilitiesLength)
    : selectedHotel.HotelFacilities;

  // ======================= facilities truncation logic end =======================================

  return (
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
          py: "10px",
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
          Hotel Booking Details
        </Typography>
      </Grid2>
      <Grid2
        size={{ xs: "12" }}
        sx={{ width: "100%", py: "40px", backgroundColor: COLORS.SEMIGREY }}
      >
        <Container
          sx={{
            backgroundColor: COLORS.WHITE,

            py: "30px",
            mb: "20px",
          }}
        >
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 12, lg: 8 }}>
              {/* here */}
              <Container>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: nunito.style,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    mb: "15px",
                    fontSize: { lg: "24px", md: "24px", xs: "18px" },
                  }}
                >
                  {selectedHotel?.HotelName}
                  <Box sx={{display:'flex', alignItems:'center', gap:"10px"}}>
                  <Rating
                    name="read-only"
                    value={HOTEL_RATING[selectedHotel?.HotelRating] || 5}
                    readOnly
                    fontSize={{ lg: "30px", md: "24px", xs: "10px" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: nunito.style,
                      fontWeight: 700,
                      color: COLORS.BLACK,
                    }}
                  >
                    {HOTEL_RATING_IN_WORDS[selectedHotel?.HotelRating]}
                  </Typography>
                  </Box>
                </Typography>
                <img
                  src={banner.src}
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                    height: "auto",
                    display: "block",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    marginTop: "10px",
                    fontFamily: nunito.style,
                    fontSize: { lg: 24, md: 24, sm: 24, xs: 18 },
                  }}
                >
                  Award-winning Seafront Resort Frequented by Celebrities
                </Typography>

                {/* Hotel Address  start*/}
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: nunito.style,
                    mb: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LocationOnIcon sx={{ mr: 1, color: COLORS.PRIMARY }} />
                  {displayedAddress}, {selectedHotel?.CityName},{" "}
                  {selectedHotel.PinCode}, {selectedHotel?.CountryName}
                  {shouldTruncate && (
                    <Typography
                      component="span"
                      onClick={handleOpenAddress}
                      sx={{
                        ml: 1,
                        color: COLORS.PRIMARY,
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Read More
                    </Typography>
                  )}
                </Typography>

                {/* Dialog component for Address */}
                <CustomDialog
                  data={selectedHotel.Address}
                  open={openAddress}
                  handleClose={handleCloseAddress}
                />

                {/* Hotel address end */}

                {/* Website URL start */}
                <Link href={`${selectedHotel.HotelWebsiteUrl}`}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: nunito.style,
                      mb: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LanguageIcon sx={{ mr: 1, color: COLORS.PRIMARY }} />
                    {selectedHotel.HotelWebsiteUrl}
                  </Typography>
                </Link>
                {/* Website URL end */}

                {/* Phone Number start */}

                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: nunito.style,
                    mb: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LocalPhoneIcon sx={{ mr: 1, color: COLORS.PRIMARY }} />
                  {selectedHotel.PhoneNumber}
                </Typography>
                {/* Phone Number end */}
              </Container>

              <Container>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "15px" }}
                >
                  Amenities
                </Typography>
              </Container>

              <Container>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                    mb: "25px",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: nunito.style,
                        padding:'6px 16px',
                        backgroundColor:useRandomColor(),
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        borderRadius:'23px',
                        fontWeight:600,
                         textTransform:'capitalize'
                      }}
                    >
                      {facilities[0]}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: nunito.style,
                        padding:'6px 16px',
                        backgroundColor:useRandomColor(),
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        borderRadius:'23px',
                        fontWeight:600,
                         textTransform:'capitalize'
                      }}
                    >
                      {facilities[1]}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: nunito.style,
                        padding:'6px 16px',
                        backgroundColor:useRandomColor(),
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        borderRadius:'23px',
                        fontWeight:600,
                         textTransform:'capitalize'
                      }}
                    >
                      {facilities[2]}
                    </Typography>
                  </Box>
                  <Box>
                    {shouldTruncateFacilities && <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: nunito.style,
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                        fontWeight:'bold',
                        color:COLORS.GREEN,
                        '&:hover' :{
                          color:COLORS.PRIMARY
                        }
                      }}
                      onClick={handleOpenFacilities}
                    >
                      {facilities.length-3}+ amenities
                    </Typography>}

                  </Box>
                </Box>
              </Container>
            </Grid2>
            <Grid2
              size={{ xs: 12, md: 12, lg: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <Box
                sx={{
                  border: `1px solid ${COLORS.GREY}`,
                  borderRadius: "10px",
                  padding: "15px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontFamily: nunito.style, mb: "10px" }}
                >
                  Premium Suite Sea View with Terrace - King Bed
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: nunito.style,
                    fontWeight: 500,
                    color: COLORS.SECONDARY,
                  }}
                >
                  Fits 2 Adults
                </Typography>

                <List>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemIcon
                      sx={{ minWidth: "40px", color: COLORS.DARKGREY }}
                    >
                      <FilterVintageIcon sx={{ fontSize: "20px" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: nunito.style, fontSize: "15px" }}
                        >
                          20% off on session of Spa
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem sx={{ padding: 0 }}>
                    <ListItemIcon
                      sx={{ minWidth: "40px", color: COLORS.DARKGREY }}
                    >
                      <LocalDiningIcon sx={{ fontSize: "20px" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: nunito.style, fontSize: "15px" }}
                        >
                          20% off on food & beverages at F&B outlets
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem sx={{ padding: 0 }}>
                    <ListItemIcon
                      sx={{ minWidth: "40px", color: COLORS.DARKGREY }}
                    >
                      <ContentCutIcon sx={{ fontSize: "20px" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: nunito.style, fontSize: "15px" }}
                        >
                          20% off on Salon services
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: nunito.style,
                    fontWeight: 500,
                    color: COLORS.SECONDARY,
                  }}
                >
                  Non-Refundable
                </Typography>

                <List>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemIcon
                      sx={{ minWidth: "40px", color: COLORS.DARKGREY }}
                    >
                      <FilterVintageIcon sx={{ fontSize: "20px" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: nunito.style, fontSize: "15px" }}
                        >
                          Breakfast included
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: nunito.style,
                    fontWeight: 500,
                    color: COLORS.SECONDARY,
                    mb: "15px",
                  }}
                >
                  Desh Dekho Offer Daily Breakfast with Special Savings
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: nunito.style,
                    fontWeight: 700,
                    color: COLORS.DARKGREY,
                    mb: "10px",
                  }}
                >
                  Per Night:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, fontFamily: nunito.style, mb: "15px" }}
                >
                  ₹ {selectedHotel?.Rooms?.[0]?.TotalFare.toFixed(2)}+{" "}
                  <Typography component={"div"} sx={{ color: COLORS.DARKGREY }}>
                    ₹ {selectedHotel?.Rooms?.[0]?.TotalTax.toFixed(2)} taxes & fees
                  </Typography>
                </Typography>

             
              </Box>
            </Grid2>
          </Grid2>
        </Container>

        <Container
          sx={{
            backgroundColor: COLORS.WHITE,

            py: "30px",
          }}
        >
          {/* <Box>
            <FormControl sx={{ width: 180 }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  fontWeight: 500,
                  color: COLORS.BLACK,
                  fontFamily: nunito.style,
                }}
              >
                Room Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={roomType}
                label="Room Type"
                onChange={handleChange}
                sx={{ mb: "20px" }}
              >
                <MenuItem value={10} sx={{ fontFamily: nunito.style }}>
                  Normal
                </MenuItem>
                <MenuItem value={20} sx={{ fontFamily: nunito.style }}>
                  Deluxe
                </MenuItem>
                <MenuItem value={30} sx={{ fontFamily: nunito.style }}>
                  Premium
                </MenuItem>
              </Select>
            </FormControl>
          </Box> */}

          {selectedHotel?.Rooms?.map((room, index) => {
            return (
              <Grid2 key={index} container sx={{ mb: 4 }}>
                <Grid2
                  size={{ xs: 12 }}
                  sx={{
                    backgroundColor: COLORS.LIGHTBLUE,
                    border: `1px solid ${COLORS.GREY}`,
                    padding: "15px 25px",
                    borderRadius: "12px 12px 0 0",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: nunito.style, fontWeight: 500 }}
                  >
                    Enjoy Free Breakfast + Lunch/Dinner throughout your stay for
                    just ₹7700 more!
                  </Typography>
                </Grid2>

                {/* Left: Room Image */}
                <Grid2
                  size={{ xs: 12, sm: 12, md: 4 }}
                  sx={{
                    border: `1px solid ${COLORS.GREY}`,
                    padding: "15px",
                    borderRight: { md: "none" },
                    borderRadius: "0 0 0 12px",
                  }}
                >
                  <Card
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 2,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      height: { lg: 360, md: 380, xs: 400 },
                      ":hover .image": {
                        transform: "scale(1.1)",
                      },
                      ".image": {
                        transition: "0.5s ease all",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Box
                        sx={{
                          backgroundImage: `url(${banner.src})`,
                          height: 200,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                        className="image"
                      ></Box>
                    </Box>

                    <CardContent>
                      <Typography
                        sx={{
                          mt: 1,
                          fontSize: 18,
                          fontFamily: nunito.style,
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {room.Name[0]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>

                {/* Right: Room Details */}
                <Grid2
                  size={{ xs: 12, sm: 12, md: 8 }}
                  sx={{
                    border: `1px solid ${COLORS.GREY}`,
                    padding: "15px",
                    borderRadius: "0 0 12px 0",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Grid2 container spacing={2} sx={{ width: "100%" }}>
                    {/* Facilities and Info */}
                    <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontFamily: nunito.style,
                          mb: 1,
                        }}
                      >
                        Room with Breakfast + Lunch/Dinner
                      </Typography>

                      <List sx={{ listStyleType: "disc", ml: 2 }}>
                        {displayedFacilities?.map((facilities, index) => (
                          <ListItem
                            key={index}
                            sx={{ display: "list-item", py: 0 }}
                          >
                            <Typography
                              sx={{
                                fontSize: "15px",
                                fontFamily: nunito.style,
                              }}
                            >
                              {facilities}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>

                      <CustomDialogFacilities
                        data={selectedHotel?.HotelFacilities}
                        open={openFacilites}
                        handleClose={handleCloseFacilities}
                      />

                      {shouldTruncateFacilities && (
                        <Typography
                          component="span"
                          onClick={handleOpenFacilities}
                          sx={{
                            ml: 1,
                            color: COLORS.PRIMARY,
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          View All Facilities..
                        </Typography>
                      )}

                      {/* Cancellation Policy */}
                      {room?.CancelPolicies?.length > 0 && (
                        <Box mt={2}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              fontFamily: nunito.style,
                              mb: 1,
                            }}
                          >
                            Cancellation Policy:
                          </Typography>
                          {room.CancelPolicies.map((policy, i) => (
                            <Typography
                              key={i}
                              variant="body2"
                              sx={{
                                fontFamily: nunito.style,
                                color: COLORS.DARKGREY,
                              }}
                            >
                              From <strong>{policy.FromDate}</strong> –{" "}
                              {policy.ChargeType === "Fixed"
                                ? `₹${policy.CancellationCharge} charge`
                                : `${policy.CancellationCharge}% charge`}
                            </Typography>
                          ))}

                          {/* Additional Info */}
                          <Box mt={3}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                fontFamily: nunito.style,
                                mb: 1,
                              }}
                            >
                              Room Details:
                            </Typography>

                            {room.Inclusion && (
                              <Typography
                                variant="body2"
                                sx={{ fontFamily: nunito.style, mt: 1 }}
                              >
                                <strong>Inclusion:</strong> {room.Inclusion}
                              </Typography>
                            )}

                            {room.MealType && (
                              <Typography
                                variant="body2"
                                sx={{ fontFamily: nunito.style }}
                              >
                                <strong>Meal Type:</strong>{" "}
                                {room.MealType.replace(/_/g, " ")}
                              </Typography>
                            )}

                            <Typography
                              variant="body2"
                              sx={{ fontFamily: nunito.style }}
                            >
                              <strong>Refundable:</strong>{" "}
                              {room.IsRefundable ? "Yes" : "No"}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Grid2>

                    {/* Price Column */}
                    <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: nunito.style,
                          fontWeight: 700,
                          color: COLORS.DARKGREY,
                          mb: "10px",
                        }}
                      >
                        Per Night:
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          fontFamily: nunito.style,
                          mb: "5px",
                        }}
                      >
                        ₹ {selectedHotel?.Rooms?.[index]?.TotalFare.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: COLORS.DARKGREY,
                          fontFamily: nunito.style,
                        }}
                      >
                        + ₹{selectedHotel?.Rooms?.[0]?.TotalTax.toFixed(2)} taxes & fees
                      </Typography>

                      {/* Day Rates */}
                      {room.DayRates?.[0]?.length > 0 && (
                        <Box mt={2}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, fontFamily: nunito.style }}
                          >
                            Day-wise Base Prices:
                          </Typography>
                          {/* {console.log("room---------", room?.DayRates[0])} */}
                          <Typography sx={{fontFamily: nunito.style, fontWeight:600}}>₹ {room?.DayRates[0][0]?.BasePrice.toFixed(2)}</Typography>
                          {/* <List sx={{ listStyleType: "disc", ml: 3 }}>
                            {room.DayRates[0].map((rate, i) => (
                              <ListItem
                                key={i}
                                sx={{
                                  display: "list-item",
                                  py: 0,
                                  fontFamily: nunito.style,
                                }}
                              >
                                
                              </ListItem>
                            ))}
                          </List> */}
                           <Button
                  onClick={() =>
                    router.push(
                      `/hotel-list/${selectedHotel?.Rooms?.[index]?.BookingCode}/hotel-prebook`
                    )
                  }
                  variant="contained"
                  sx={{ backgroundColor: COLORS.PRIMARY,mt:2 }}
                >
                 SELECT ROOM
                </Button>
                        </Box>
                      )}
                    </Grid2>
                  </Grid2>
                </Grid2>
              </Grid2>
            );
          })}
        </Container>
      </Grid2>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </Grid2>
  );
};

export default HotelDetails;

function CustomDialog({ data, open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: COLORS.PRIMARY,
        }}
      >
        Address
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ fontFamily: nunito.style }}>
          {data}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

function CustomDialogFacilities({ data, open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: COLORS.PRIMARY,
        }}
      >
        Facilities
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mt: 1,
          }}
        >
          {data.map((facility, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: useRandomColor(),
                padding: "6px 12px",
                borderRadius: "16px",
                fontSize: "0.875rem",
                fontFamily: nunito.style,
                color: "#000",
                whiteSpace: "nowrap",
              }}
            >
              {facility}
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
