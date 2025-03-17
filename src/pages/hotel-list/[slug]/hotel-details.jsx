import banner from "@/banner/hotel.jpg";
import {
  Box,
  Typography,
  Paper,
  Container,
  Grid2,
  Stack,
  Button,
  Dialog,
  Rating,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Divider,
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
import { display, nunito } from "@/utils/fonts";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { COLORS } from "@/utils/colors";
import { styled } from "@mui/material/styles";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ContentCutIcon from "@mui/icons-material/ContentCut";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const HotelDetails = () => {
  const [open, setOpen] = React.useState(false);
  const [roomType, setRoomType] = React.useState("");

  const handleChange = (event) => {
    setRoomType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
            borderRadius: "18px",
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
                  justifyContent:"space-between",
                  gap: "10px",
                  mb: "15px",
                  fontSize:{lg:"24px",md:"24px",xs:"18px"},
                 
                   
                }}
              >
                Taj Fort Aguada Resort & Spa, Goa{" "}
                <Rating name="read-only" value={4} readOnly fontSize={{lg:"30px",md:"24px",xs:"10px"}} />
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
                sx={{ marginTop: "10px", fontFamily: nunito.style ,fontSize:{ lg:24, md:24,sm:24,xs:18} }}
              >
                Award-winning Seafront Resort Frequented by Celebrities
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: nunito.style, mb: "15px" }}
              >
                Stay in a scenic property built on the 16th-century Fort Aguada
                offering stunning views of the Arabian Sea.{" "}
                <Button variant="text" sx={{ fontWeight: 600 }}>
                  More
                </Button>
              </Typography>
              {/* here */}
              

              </Container>

              <Container>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  mb: "25px",
                 
                }}
              >
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{ fontFamily: nunito.style, 
                    fontWeight: 600 , 
                    fontSize:{lg:16 ,md:16 , sm:16 , xs:10} ,
                    py :{lg:0.5 , }

                  }}
                  onClick={handleClickOpen}
                  

                >
                  Food And Dinning
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ fontFamily: nunito.style, fontWeight: 600 }}
                  onClick={handleClickOpen}
                >
                  Location & Surroundings
                </Button>
              </Box>
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
                  flexWrap:"wrap",
                  gap: "20px",
                  mb: "25px",
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: nunito.style,
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <FilterVintageIcon /> Spa
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: nunito.style,
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <PoolIcon /> Swimming Pool
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: nunito.style,
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <FitnessCenterIcon /> Gym
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: nunito.style,
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                    }}
                    onClick={handleClickOpen}
                  >
                    88+ amenities
                  </Typography>
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
                  ₹ 42,300+{" "}
                  <Typography
                    component={"span"}
                    sx={{ color: COLORS.DARKGREY }}
                  >
                    ₹ 7,614 taxes & fees
                  </Typography>
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: COLORS.PRIMARY }}
                >
                  Book Now
                </Button>
              </Box>

              <Grid2
                container
                sx={{
                  border: `1px solid ${COLORS.GREY}`,
                  borderRadius: "10px",
                  padding: "15px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Grid2 size={{ xs: 2 }} sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      backgroundColor: COLORS.PRIMARY,
                      color: COLORS.WHITE,
                      padding: "10px",
                      borderRadius: "5px",
                      fontSize: "20px",
                    }}
                  >
                    4.6
                  </Typography>
                </Grid2>
                <Grid2
                  size={{ xs: 7 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: nunito.style,
                      fontWeight: 700,
                      color: COLORS.SECONDARY,
                    }}
                  >
                    Excellent
                  </Typography>
                  <Typography
                    sx={{ fontSize: "12px", fontFamily: nunito.style }}
                  >
                    (3001 RATINGS)
                  </Typography>
                </Grid2>
                <Grid2
                  size={{ xs: 3 }}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button variant="text" sx={{ fontWeight:700, fontFamily:nunito.style }}>
                    see all
                  </Button>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Container>

        <Container
          sx={{
            backgroundColor: COLORS.WHITE,
            borderRadius: "18px",
            py: "30px",
            
          }}
        >
          <Box  >
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
          </Box>
          <Grid2 container sx={{ mb: 4 }} >
            <Grid2
              size={{ xs: 12 }}
              sx={{
                backgroundColor: COLORS.LIGHTBLUE,
                border: `1px solid ${COLORS.GREY}`,
                padding: "15px 25px",
              }}
            >
              <Typography variant="body1" sx={{ fontFamily: nunito.style }}>
                Enjoy Free Breakfast + Lunch/Dinner throughout your stay for
                just ₹7700 more!
              </Typography>
            </Grid2>
            {/* hey */}
            <Grid2
              size={{ xs: 12, sm: 12, md: 4 }}
              sx={{ border: `1px solid ${COLORS.GREY}`, padding: "15px" }}
            >
              <Card
                sx={{
                  position: "relative",
                  ":hover": {
                    ".image": {
                      transform: "scale(1.1)",
                    },
                  },
                  overflow: "hidden",
                  ".image": {
                    transition: "0.5s ease all",
                  },
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                  height: {lg:500 , md:530 ,xs:540},
                }}
                
              >
                <Box sx={{ position: "relative", overflow: "hiden" }} border={10}>
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
                {/* <Box sx={{ position: "absolute", top: 0, width: "100%" , border:10  }}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    p={2}
                  ></Stack>
                </Box> */}
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
                    Premium Suite Sea View with Terrace - King Bed
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontFamily: nunito.style,
                      color: COLORS.DARKGREY,
                      fontWeight: 600,
                    }}
                  >
                    603 sq.ft (56 sq.mt) | Sea View | King Bed
                  </Typography>
                  <Stack
                    direction={"column"}
                    alignItems={"flex-start"}
                    spacing={2}
                    mt={1}
                  
                    
                  >
                    <Grid2 container sx={{pb:10}}  >
                      <Grid2 size={{ xs: 6 }} >
                        <List>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Mineral Water
                            </Typography>
                          </ListItem>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Housekeeping
                            </Typography>
                          </ListItem>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Iron/Ironing Board
                            </Typography>
                          </ListItem>
                        </List>
                      </Grid2>
                      <Grid2 size={{ xs: 6 }}>
                        <List>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Mineral Water
                            </Typography>
                          </ListItem>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Housekeeping
                            </Typography>
                          </ListItem>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Iron/Ironing Board
                            </Typography>
                          </ListItem>
                        </List>
                      </Grid2>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: COLORS.PRIMARY }}
                      onClick={handleClickOpen}
                    >
                      More Details
                    </Button>
                    </Grid2>
                  </Stack>
                 
                </CardContent>
            
              </Card>
            </Grid2>
            {/* hey */}

            <Grid2
              size={{ xs: 12, sm: 12, md: 8 }}
              sx={{
                border: `1px solid ${COLORS.GREY}`,
                padding: "15px",
                display: "flex",
              }}
            >
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, fontFamily: nunito.style }}
                  >
                    Room with Breakfast + Lunch/Dinner
                  </Typography>
                  <List sx={{ listStyleType: "disc", ml: 2 }}>
                    <ListItem sx={{ display: "list-item", py: 0 }}>
                      <Typography
                        sx={{ fontSize: "15px", fontFamily: nunito.style }}
                      >
                        Free Breakfast
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ display: "list-item", py: 0 }}>
                      <Typography
                        sx={{ fontSize: "15px", fontFamily: nunito.style }}
                      >
                        Free Lunch Or Dinner
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ display: "list-item", py: 0 }}>
                      <Typography
                        sx={{ fontSize: "15px", fontFamily: nunito.style }}
                      >
                        Make My Trip Special Promotion - Taj Holidays Winter
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ display: "list-item", py: 0 }}>
                      <Typography
                        sx={{ fontSize: "15px", fontFamily: nunito.style }}
                      >
                        Non-Refundable
                      </Typography>
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: COLORS.PRIMARY }}
                    onClick={handleClickOpen}
                  >
                    More Details
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
                  <Typography
                    sx={{
                      textDecoration: "line-through",
                      color: COLORS.DARKGREY,
                    }}
                  >
                    ₹ 13,000
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, fontFamily: nunito.style }}
                  >
                    ₹ 42,300+
                  </Typography>
                  <Typography sx={{ color: COLORS.DARKGREY, mb: 1 }}>
                    ₹ 7,614 taxes & fees
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: nunito.style }}>
                    <Typography
                      component={"span"}
                      sx={{ color: COLORS.SECONDARY, cursor: "pointer" }}
                    >
                      Login Now
                    </Typography>{" "}
                    and get this for ₹10,940 or less
                  </Typography>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>

          <Grid2 container sx={{ mb: 4 }} >
            <Grid2
              size={{ xs: 12 }}
              sx={{
                backgroundColor: COLORS.LIGHTBLUE,
                border: `1px solid ${COLORS.GREY}`,
                padding: "15px 25px",
              }}
            >
              <Typography variant="body1" sx={{ fontFamily: nunito.style }}>
                Enjoy Free Breakfast + Lunch/Dinner throughout your stay for
                just ₹7700 more!
              </Typography>
            </Grid2>
            {/* hey */}
            <Grid2
              size={{ xs: 12, sm: 12, md: 4 }}
              sx={{ border: `1px solid ${COLORS.GREY}`, padding: "15px" }}
            >
              <Card
                sx={{
                  position: "relative",
                  ":hover": {
                    ".image": {
                      transform: "scale(1.1)",
                    },
                  },
                  overflow: "hidden",
                  ".image": {
                    transition: "0.5s ease all",
                  },
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                  height: {lg:500 , md:530 ,xs:540},
                }}
                
              >
                <Box sx={{ position: "relative", overflow: "hiden" }} border={10}>
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
                {/* <Box sx={{ position: "absolute", top: 0, width: "100%" , border:10  }}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    p={2}
                  ></Stack>
                </Box> */}
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
                    Premium Suite Sea View with Terrace - King Bed
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontFamily: nunito.style,
                      color: COLORS.DARKGREY,
                      fontWeight: 600,
                    }}
                  >
                    603 sq.ft (56 sq.mt) | Sea View | King Bed
                  </Typography>
                  <Stack
                    direction={"column"}
                    alignItems={"flex-start"}
                    spacing={2}
                    mt={1}
                  
                    
                  >
                    <Grid2 container sx={{pb:10}}  >
                      <Grid2 size={{ xs: 6 }} >
                        <List>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Mineral Water
                            </Typography>
                          </ListItem>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Housekeeping
                            </Typography>
                          </ListItem>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Iron/Ironing Board
                            </Typography>
                          </ListItem>
                        </List>
                      </Grid2>
                      <Grid2 size={{ xs: 6 }}>
                        <List>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Mineral Water
                            </Typography>
                          </ListItem>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Housekeeping
                            </Typography>
                          </ListItem>
                          <ListItem sx={{ display: "list-item", pl: 2, py: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Iron/Ironing Board
                            </Typography>
                          </ListItem>
                        </List>
                      </Grid2>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: COLORS.PRIMARY }}
                      onClick={handleClickOpen}
                    >
                      More Details
                    </Button>
                    </Grid2>
                  </Stack>
                 
                </CardContent>
            
              </Card>
            </Grid2>
            {/* hey */}

            <Grid2
              size={{ xs: 12, sm: 12, md: 8 }}
              sx={{
                border: `1px solid ${COLORS.GREY}`,
                padding: "15px",
                display: "flex",
              }}
            >
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, fontFamily: nunito.style }}
                  >
                    Room with Breakfast + Lunch/Dinner
                  </Typography>
                  <List sx={{ listStyleType: "disc", ml: 2 }}>
                    <ListItem sx={{ display: "list-item", py: 0 }}>
                      <Typography
                        sx={{ fontSize: "15px", fontFamily: nunito.style }}
                      >
                        Free Breakfast
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ display: "list-item", py: 0 }}>
                      <Typography
                        sx={{ fontSize: "15px", fontFamily: nunito.style }}
                      >
                        Free Lunch Or Dinner
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ display: "list-item", py: 0 }}>
                      <Typography
                        sx={{ fontSize: "15px", fontFamily: nunito.style }}
                      >
                        Make My Trip Special Promotion - Taj Holidays Winter
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ display: "list-item", py: 0 }}>
                      <Typography
                        sx={{ fontSize: "15px", fontFamily: nunito.style }}
                      >
                        Non-Refundable
                      </Typography>
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: COLORS.PRIMARY }}
                    onClick={handleClickOpen}
                  >
                    More Details
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
                  <Typography
                    sx={{
                      textDecoration: "line-through",
                      color: COLORS.DARKGREY,
                    }}
                  >
                    ₹ 13,000
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, fontFamily: nunito.style }}
                  >
                    ₹ 42,300+
                  </Typography>
                  <Typography sx={{ color: COLORS.DARKGREY, mb: 1 }}>
                    ₹ 7,614 taxes & fees
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: nunito.style }}>
                    <Typography
                      component={"span"}
                      sx={{ color: COLORS.SECONDARY, cursor: "pointer" }}
                    >
                      Login Now
                    </Typography>{" "}
                    and get this for ₹10,940 or less
                  </Typography>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>


         
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
