import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {
  Box,
  Button,
  Divider, 
  FormControl,
  Grid2,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import TravellorCounter from "./travellerCounter"; 
import useHotelTravellerValidation from "@/custom-hook/useHotelTravellerValidation"; 


const TravellerSelector = ({ setAnchorEl, paxRoom, setPaxRoom}) => {
  const validateTravelers = useHotelTravellerValidation();
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState({ errorStatus: false, errorMessage: "" });

 
  const [tempPaxRooms, setTempPaxRooms] = useState(paxRoom);
  const totalAdults = tempPaxRooms.reduce((sum, room) => sum + room.Adults, 0);

  const totalRooms = tempPaxRooms.length;

  useEffect(() => {
    let { errorMessage, errorStatus } = validateTravelers(
      totalRooms,
      tempPaxRooms
    );
    setError((prev) => ({ ...prev, errorStatus, errorMessage }));
  }, [totalRooms, tempPaxRooms]);

  // Handler for updating adult, child, or room counts
  const updateTravellerCount = (roomIndex, type, action) => {
    setTempPaxRooms((prevPaxRooms) => {
      const newPaxRooms = [...prevPaxRooms];

      if (type === "room") {
        if (action === "increase") {
          // Add a new room with default values (1 adult, 0 children)
          newPaxRooms.push({ Adults: 1, Children: 0, ChildrenAges: [] });
        } else if (action === "decrease" && newPaxRooms.length > 1) {
          // Remove the last room
          newPaxRooms.pop();
        }
      } else if (type === "adult") {
        const currentAdults = newPaxRooms[roomIndex].Adults;
        if (action === "increase") {
          newPaxRooms[roomIndex].Adults = currentAdults + 1;
        } else if (action === "decrease" && currentAdults > 1) {
          // Minimum 1 adult per room
          newPaxRooms[roomIndex].Adults = currentAdults - 1;
        }
      } else if (type === "child") {
        const currentChildren = newPaxRooms[roomIndex].Children;
        if (action === "increase") {
          newPaxRooms[roomIndex].Children = currentChildren + 1;
          // Add a default age (e.g., 1 year) for the new child
          newPaxRooms[roomIndex].ChildrenAges.push(1);
        } else if (action === "decrease" && currentChildren > 0) {
          newPaxRooms[roomIndex].Children = currentChildren - 1;
          // Remove the last child's age
          newPaxRooms[roomIndex].ChildrenAges.pop();
        }
      }

      return newPaxRooms;
    });
  };

  // Handler for updating a specific child's age in a specific room
  const handleChildAgeChange = (roomIndex, childIndex, newAge) => {
    setTempPaxRooms((prevPaxRooms) => {
      const newPaxRooms = [...prevPaxRooms];
      newPaxRooms[roomIndex].ChildrenAges[childIndex] = newAge;
      return newPaxRooms;
    });
  };

  const handleApply = () => {
    if (!error.errorStatus) {
      setPaxRoom(tempPaxRooms);
      setAnchorEl(null);
      setValidationErrors(null); 
    } else {
      setValidationErrors(error.errorMessage);
    }
  };


    const handleCancel = () => {
      // console.log("paxRoom----------",paxRoom)
      setTempPaxRooms( { Adults: 1, Children: 0, ChildrenAges: [] });
      setError({ errorStatus: false, errorMessage: "" });
      setValidationErrors(null);
  
      setAnchorEl(null);
    };
  
  return (
    <div>
      <Typography
        sx={{
          fontFamily: nunito.style,
          fontSize: { lg: 20, xs: 15, sm: 20, md: 20 },
          fontWeight: 600,
          textAlign: { xs: "center" },
        }}
      >
        Select Travelers
      </Typography>
      {error.errorMessage && (
        <Box sx={{ mt: 2, color: "red", textAlign: "center" }}>
          <Typography>{error.errorMessage}</Typography>
        </Box>
      )}
      <Box
        sx={{
          border: "1px solid #808080",
          borderRadius: 2,
          p: 1,
          m: 1,
          maxHeight: "250px",
          overflowY: "scroll",
          "::-webkit-scrollbar": {
            width: 5,
            borderRadius: 4,
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#A8A8A8",
            borderRadius: 4,
            height: 20,
            width: 20,
          },
        }}
      >
        {tempPaxRooms.map((room, roomIndex) => (
          <Box key={roomIndex} sx={{ mb: 2 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 3 }} sx={{ borderRight: "1px solid #aaaaaa" }}>
                {roomIndex === 0 && (
                  <TravellorCounter
                    heading="Room"
                    value={totalRooms} 
                    onIncrease={() =>
                      updateTravellerCount(roomIndex, "room", "increase")
                    }
                    onDecrease={() =>
                      updateTravellerCount(roomIndex, "room", "decrease")
                    }
                  />
                )}
              </Grid2>

              <Grid2
                size={{ xs: 9 }}
                container
                component={Paper} 
                spacing={1}
                sx={{ p: 2 }}
              >
                <Grid2 size={{ xs: 12 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      fontFamily: nunito.style,
                      color: COLORS.PRIMARY,
                      textAlign: "center",
                    }}
                  >
                    Room {roomIndex + 1}
                  </Typography>
                </Grid2>
                <Grid2 size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
                  <TravellorCounter
                    heading="Adults"
                    value={room.Adults} 
                    onIncrease={() =>
                      updateTravellerCount(roomIndex, "adult", "increase")
                    }
                    onDecrease={() =>
                      updateTravellerCount(roomIndex, "adult", "decrease")
                    }
                  />
                </Grid2>
                <Grid2 size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
                  <TravellorCounter
                    heading="Children"
                    value={room.Children} 
                    onIncrease={() =>
                      updateTravellerCount(roomIndex, "child", "increase")
                    }
                    onDecrease={() =>
                      updateTravellerCount(roomIndex, "child", "decrease")
                    }
                  />
                </Grid2>
                {room.Children > 0 && (
                  <Grid2
                    size={{ xs: 12 }}
                    container
                    spacing={2}
                    sx={{ borderTop: "1px solid #aaaaaa", pt: "10px" }}
                  >
                    {/* Iterate through children's ages for THIS room */}
                    {room.ChildrenAges.map((age, childIndex) => (
                      <Grid2
                        key={childIndex}
                        size={{ lg: 4, md: 4, sm: 6, xs: 12 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            fontFamily: nunito.style,
                            mb: "10px",
                          }}
                        >
                          Child {childIndex + 1} Age
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            value={age} // Show age for THIS child
                            onChange={(event) =>
                              handleChildAgeChange(
                                roomIndex,
                                childIndex,
                                event.target.value
                              )
                            }
                            size="small"
                          >
                            {/* Age options 1-12 */}
                            {Array.from({ length: 12 }, (_, i) => (
                              <MenuItem key={i + 1} value={i + 1}>
                                {i + 1} Years
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid2>
                    ))}
                  </Grid2>
                )}
              </Grid2>
            </Grid2>
            {roomIndex < tempPaxRooms.length - 1 && <Divider sx={{ my: 2 }} />}{" "}
            {/* Add a divider between rooms */}
          </Box>
        ))}
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
        m={2}
      >
        <Button
          sx={{
            backgroundColor: COLORS.GREY,
            color: COLORS.BLACK,
            fontSize: 12,
            fontFamily: nunito.style,
            fontWeight: 600,
            borderRadius: 6,
            width: 80,
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={error.errorStatus}
          sx={{
            backgroundColor: COLORS.SECONDARY,
            color: COLORS.WHITE,
            fontSize: 12,
            fontFamily: nunito.style,
            fontWeight: 600,
            borderRadius: 6,
            width: 80,
          }}
          onClick={handleApply}
        >
          Apply
        </Button>
      </Stack>
    </div>
  );
};

export default TravellerSelector;