import InnerBanner from "@/components/innerBanner";
import React, { useEffect, useState } from "react";
import banner from "@/banner/flight.jpg";
import {
  Box,
  Card,
  Container,
  Grid2,
  Typography,
  CardHeader,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Slider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import FlightForm from "@/components/flight/flightForm";
import FlightListBox from "@/components/flight/flightListBox";
import Loader from "@/utils/Loader";
const FlightList = () => {
  const [flightList, setFlightList] = useState(null);
  const [traceId, setTraceId] = useState("");
  const [journey, setJourney] = useState("");

  useEffect(() => {
    if (localStorage.getItem("flightData")) {
      setTimeout(() => {
        setFlightList(JSON.parse(localStorage.getItem("flightData")));
        setTraceId(JSON.parse(localStorage.getItem("flightData")).trace_id);
        setJourney(JSON.parse(localStorage.getItem("flightData")).type)
      }, 3000);
    }
  }, []);


  const [priceRange, setPriceRange] = useState([500, 2000]);

  const handleRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <>
      <InnerBanner img={banner.src} heading={"Flight"} />

      <Box sx={{ pt: 10 }}>
        <Container>
          <Card sx={{ boxShadow: "0px 0px 10px 2px rgb(0,0,0,0.20)", p: 2 }}>
            <Typography sx={{ fontSize: 18 }}> Search Flight</Typography>
            <FlightForm />
          </Card>
        </Container>
      </Box>

      {flightList?.segments?.flightData ? (
        <Box sx={{ pt: 10, pb: 10 }}>
          <Container>
            <Grid2 container spacing={4}>
              <Grid2 size={4} sx={{ position: "relative" }}>
                {/* filter card start */}
                <Card
                  variant="outlined"
                  sx={{ position: "sticky", top: "75px" }}
                  style={{
                    marginBottom: "1rem",
                    width: "100%",
                    boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)",
                  }}
                >
                  <CardHeader
                    title="Filters"
                    action={
                      <Button variant="text" color="primary" size="small">
                        Reset
                      </Button>
                    }
                  />
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Search by Airline Names
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="search"
                      placeholder="Search by Airline Names"
                      InputProps={{
                        startAdornment: (
                          <SearchIcon style={{ marginRight: "8px" }} />
                        ),
                      }}
                    />

                    {/* Popular Section */}
                    <div style={{ marginTop: "1rem" }}>
                      <Typography variant="subtitle1">Popular</Typography>
                      {[
                        "Breakfast Included",
                        "Budget",
                        "4 Star Hotels",
                        "5 Star Hotels",
                      ].map((label) => (
                        <FormControlLabel
                          key={label}
                          control={
                            <Checkbox
                              defaultChecked={label === "Breakfast Included"}
                            />
                          }
                          label={label}
                        />
                      ))}
                    </div>

                    {/* Price Range Section */}
                    <div style={{ marginTop: "1rem" }}>
                      <Typography variant="subtitle1">
                        Price Per Night
                      </Typography>
                      <Slider
                        value={priceRange}
                        onChange={handleRangeChange}
                        valueLabelDisplay="auto"
                        min={200}
                        max={5695}
                      />
                      <Typography>
                        Range: ${priceRange[0]} - ${priceRange[1]}
                      </Typography>
                    </div>

                    {/* Airline Names Section */}
                    <div style={{ marginTop: "1rem" }}>
                      <Typography variant="subtitle1">Airline Names</Typography>
                      {[
                        "American Airlines",
                        "Delta Air Lines",
                        "Emirates",
                        "Air France",
                      ].map((label) => (
                        <FormControlLabel
                          key={label}
                          control={<Checkbox />}
                          label={label}
                        />
                      ))}
                    </div>

                    {/* Reviews Section */}
                    <div style={{ marginTop: "1rem" }}>
                      <Typography variant="subtitle1">Reviews</Typography>
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <FormControlLabel
                          key={stars}
                          control={<Checkbox />}
                          label={
                            <Typography>
                              {[...Array(stars)].map((_, i) => (
                                <StarIcon key={i} style={{ color: "gold" }} />
                              ))}
                            </Typography>
                          }
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* filter card end */}
              </Grid2>
              <Grid2 size={8}>
                <Grid2 container spacing={6}>
                  {flightList?.segments?.flightData?.map((val, i) => (
                    <Grid2 size={12} key={i}>
                      <FlightListBox details={val} traceId={traceId} journey={journey}/>
                    </Grid2>
                  ))}
                </Grid2>
              </Grid2>
            </Grid2>
          </Container>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <Loader open={true}/>
        </Box>
      )}
    </>
  );
};

export default FlightList;
