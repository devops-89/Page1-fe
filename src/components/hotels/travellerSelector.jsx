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

const TravellerSelector = ({ setAnchorEl, paxRoom, setPaxRoom }) => {
  const validateTravelers = useHotelTravellerValidation();
  // validationErrors seems redundant if error state is used, keeping for now but could be simplified
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState({ errorStatus: false, errorMessage: "" });

  // Initialize tempPaxRooms with the initial paxRoom prop
  const [tempPaxRooms, setTempPaxRooms] = useState(paxRoom);

  // Recalculate total adults and rooms whenever tempPaxRooms changes
  const totalAdults = tempPaxRooms.reduce((sum, room) => sum + room.Adults, 0);
  const totalRooms = tempPaxRooms.length;

  useEffect(() => {
    let { errorMessage, errorStatus } = validateTravelers(
      totalRooms,
      tempPaxRooms
    );
    setError((prev) => ({ ...prev, errorStatus, errorMessage }));
  }, [totalRooms, tempPaxRooms, validateTravelers]); // Added validateTravelers to dependency array

  // Handler for updating adult, child, or room counts
  const updateTravellerCount = (type, action, roomIndex) => {
    // Reordered parameters for clarity
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
        // Ensure roomIndex is provided for adult/child updates
        if (roomIndex === undefined || roomIndex === null) return prevPaxRooms;

        const currentAdults = newPaxRooms[roomIndex].Adults;
        if (action === "increase") {
          newPaxRooms[roomIndex].Adults = currentAdults + 1;
        } else if (action === "decrease" && currentAdults > 1) {
          // Minimum 1 adult per room
          newPaxRooms[roomIndex].Adults = currentAdults - 1;
        }
      } else if (type === "child") {
        // Ensure roomIndex is provided for adult/child updates
        if (roomIndex === undefined || roomIndex === null) return prevPaxRooms;

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
      // Ensure roomIndex and childIndex are valid
      if (
        newPaxRooms[roomIndex] &&
        newPaxRooms[roomIndex].ChildrenAges[childIndex] !== undefined
      ) {
        newPaxRooms[roomIndex].ChildrenAges[childIndex] = newAge;
      }
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
    // Revert tempPaxRooms to the original paxRoom state
    setPaxRoom([
      { Adults: 1, Children: 0, ChildrenAges: [] },
    ]);
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
      {/* Use the error state for displaying messages */}
      {error.errorMessage && (
        <Box sx={{ mt: 2, color: "red", textAlign: "center" }}>
          <Typography>{error.errorMessage}</Typography>
        </Box>
      )}
      {/* Display validation errors if any after apply attempt */}
      {validationErrors && (
        <Box sx={{ mt: 2, color: "red", textAlign: "center" }}>
          <Typography>{validationErrors}</Typography>
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
          position:"relative",
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
        <Box sx={{ mb: 2 }}>
          <Grid2 container spacing={2}>
            {/* Room Counter Grid - spans 12 on xs, centers content */}
            <Grid2 size={{ xs: 12, sm: 12, md: 3, lg: 3 }} sx={{ height:'100%',position:'sticky', top:0}}>
              <TravellorCounter
                disableButton={totalRooms>=6}
                heading="Room"
                value={totalRooms}
                onIncrease={() => updateTravellerCount("room", "increase")}
                onDecrease={() => updateTravellerCount("room", "decrease")}
              />
            </Grid2>

            <Grid2 size={{ xs: 9 }} container spacing={1}>
              {tempPaxRooms.map((room, roomIndex) => (
                <Grid2
                  container
                  component={Paper}
                  key={roomIndex}
                  size={{ xs: 12 }}
                  sx={{ p: 2, backgroundColor:COLORS.WHITE }}
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
                      disableButton={room.Adults>=8}
                      heading="Adults"
                      value={room.Adults}
                      onIncrease={
                        () =>
                          updateTravellerCount("adult", "increase", roomIndex) // Pass roomIndex
                      }
                      onDecrease={
                        () =>
                          updateTravellerCount("adult", "decrease", roomIndex) // Pass roomIndex
                      }
                    />
                  </Grid2>
                  <Grid2 size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
                    <TravellorCounter
                     disableButton={room.Children>=4}
                      heading="Children"
                      value={room.Children}
                      onIncrease={() =>
                        updateTravellerCount("child", "increase", roomIndex)
                      }
                      onDecrease={() =>
                        updateTravellerCount("child", "decrease", roomIndex)
                      }
                    />
                  </Grid2>
                  {room.Children > 0 && (
                    <Grid2
                      size={{ xs: 12 }}
                      container
                      spacing={2}
                      sx={{
                        borderTop: "1px solid #aaaaaa",
                        pt: "10px",
                        mt: "10px",
                      }}
                    >
                      {room.ChildrenAges.map((age, childIndex) => (
                        <Grid2
                          key={childIndex}
                          size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
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
                              value={age}
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
              ))}
            </Grid2>
          </Grid2>
        </Box>
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
