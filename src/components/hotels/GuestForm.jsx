import React, { useState,useEffect } from "react";

import {
  Box,
  Typography,
  Stack,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid2,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { COLORS } from "@/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { showModal, hideModal } from "@/redux/reducers/modal";
import { addGuest,removeGuest } from "@/redux/reducers/no-persist-reducers/GuestAdditionSlice";
import { addPersistGuest,clearPersistGuests,addCommonFields,clearCommonFields,updatePersistGuest } from "@/redux/reducers/hotel-reducers/GuestSlice";


const GuestForm = () => {
  const dispatch = useDispatch();

  const persistedGuests=useSelector((state)=> state.HOTEL.GuestList.selectedGuests);
  const persistedCommonFields=useSelector((state)=>state.HOTEL.GuestList.commonFields)

  useEffect(()=>{
     dispatch(clearPersistGuests());
     dispatch(clearCommonFields());
  },[]);



  // State for guest-specific fields
  const [guestFields, setGuestFields] = useState({
    title: "mr",
    firstName: "",
    lastName: "",
    isBelow12: false,
    guardianPan: "",
  });

  // State for common fields
  const [commonFields, setCommonFields] = useState({
    email: "",
    mobile: "",
  });

  const handleGuestChange = (field) => (event) => {
    setGuestFields({ ...guestFields, [field]: event.target.value });
  };

  const handleCommonChange = (field) => (event) => {
    setCommonFields({ ...commonFields, [field]: event.target.value });
  };

  const openAddGuestForm = () => {
    let { firstName, lastName } = guestFields;
    let { email, mobile } = commonFields;
    if (firstName === "" || lastName === "" || email === "" || mobile === "") {
      alert("Please Fill This Form");
      return;
    }

    if(persistedGuests.length===0)
    {
      dispatch(addPersistGuest(guestFields));
      dispatch(addCommonFields(commonFields));
    }
  

    dispatch(
      showModal(
        <GuestAdditionDialog
        />
      )
    );
  };

  

  console.log("Persisted Guests: ",persistedGuests);
  console.log("Persisted Common Fields: ",persistedCommonFields);
  

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Guest Details
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        {/* Title */}
        <Box>
          <Typography variant="subtitle1">TITLE</Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              size="small"
              value={guestFields.title}
              onChange={handleGuestChange("title")}
              displayEmpty
              inputProps={{ "aria-label": "Title" }}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: COLORS.PRIMARY,
                },
                "&.Mui-focused .MuiOutlinedInput-input": {
                  color: "black",
                },
              }}
            >
              <MenuItem value="mr">Mr</MenuItem>
              <MenuItem value="mrs">Mrs</MenuItem>
              <MenuItem value="ms">Ms</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* First Name */}
        <Box>
          <Typography sx={{ mb: 1 }}>FIRST NAME</Typography>
          <TextField
            size="small"
            type="text"
            placeholder="FIRST NAME"
            value={guestFields.firstName}
            onChange={handleGuestChange("firstName")}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.PRIMARY,
                },
                "&.Mui-focused input": {
                  color: "black",
                },
              },
            }}
          />
        </Box>

        {/* Last Name */}
        <Box>
          <Typography sx={{ mb: 1 }}>LAST NAME</Typography>
          <TextField
            size="small"
            type="text"
            placeholder="LAST NAME"
            value={guestFields.lastName}
            onChange={handleGuestChange("lastName")}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.PRIMARY,
                },
                "&.Mui-focused input": {
                  color: "black",
                },
              },
            }}
          />
        </Box>
      </Stack>

      <Stack spacing={2} direction="row">
        {/* Email */}
        <Box>
          <Typography sx={{ mb: 1 }}>EMAIL ADDRESS</Typography>
          <TextField
            size="small"
            type="email"
            placeholder="EMAIL ADDRESS"
            value={commonFields.email}
            onChange={handleCommonChange("email")}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.PRIMARY,
                },
                "&.Mui-focused input": {
                  color: "black",
                },
              },
            }}
          />
        </Box>

        {/* Mobile Number */}
        <Box>
          <Typography sx={{ mb: 1 }}>MOBILE NUMBER</Typography>
          <TextField
            size="small"
            type="tel"
            placeholder="MOBILE NUMBER"
            value={commonFields.mobile}
            onChange={handleCommonChange("mobile")}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.PRIMARY,
                },
                "&.Mui-focused input": {
                  color: "black",
                },
              },
            }}
          />
        </Box>
      </Stack>

      <Button
        variant="contained"
        size="small"
        sx={{ my: 2, bgcolor: COLORS.PRIMARY, fontWeight: "bold" }}
        onClick={openAddGuestForm}
      >
        ADD GUEST
      </Button>
    </Box>
  );
};

export default GuestForm;

// Modal for adding more guests component
const GuestAdditionDialog = () => {
  const dispatch = useDispatch();

  const guestList = useSelector((state)=>state.NOPERSIST.GUESTADDITION.guestSelected);
  const persistedGuests=useSelector((state)=> state.HOTEL.GuestList.selectedGuests);

  console.log("guestList---------------", guestList)

  const [guestData, setGuestData] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    isBelow12: false,
    guardianPan: "",
  });

  const [showList, setShowList] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setGuestData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddGuest = () => {
    if (
      guestData.firstName === "" ||
      guestData.lastName === "" ||
      guestData.isBelow12
    )
      return;
      setShowList(true);
      dispatch(addGuest(guestData))
      
    // setSelectedGuests((prev) => [...prev, guestData]);
    // console.log("selected Guests: ", [...selectedGuests, guestData]);
    // reseting the guest data for adding next guest
    setGuestData({
      title: "Mr",
      firstName: "",
      lastName: "",
      isBelow12: false,
      guardianPan: "",
    });
    
  };

  // handling the deletion of the perticular guest
  function handleDelete(itemId) {
    dispatch(removeGuest(itemId))
  }

  return (
    <Box className="addEditGuestScrollSection" p={2}>
      {/* Adding guest Form Showing Conditionally */}
      {!showList && (
        <Box className="addGuestForm add">
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h6" fontWeight="bold">
              Add Guests
            </Typography>
            <Button
              onClick={() => dispatch(hideModal())}
              sx={{ color: COLORS.BLACK, borderRadius: 50 }}
            >
              <ClearIcon sx={{ fontWeight: "bold" }} />
            </Button>
          </Box>

          <Typography variant="body2" color="textSecondary" mb={2}>
            Name should be as per official govt. ID & travelers below 18 years
            of age cannot travel alone
          </Typography>

          <form>
            <Box className="addGuestForm__cont" mb={2}>
              <Grid2 container spacing={2} alignItems="center">
                <Grid2 item xs={12} sm={3}>
                  {/* Title Selection */}
                  <Box>
                    <Typography variant="subtitle1">Title</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        size="small"
                        value={guestData.title}
                        name="title"
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: COLORS.PRIMARY,
                          },
                          "&.Mui-focused .MuiOutlinedInput-input": {
                            color: "black",
                          },
                        }}
                      >
                        <MenuItem value={"Mr"}>Mr</MenuItem>
                        <MenuItem value={"Mrs"}>Mrs</MenuItem>
                        <MenuItem value={"Ms"}>Ms</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid2>

                <Grid2 item xs={12} sm={9}>
                  <Grid2 container spacing={2}>
                    <Grid2 item xs={6}>
                      <Typography sx={{ mb: 1 }}>First Name</Typography>
                      <TextField
                        name="firstName"
                        value={guestData.firstName}
                        onChange={handleChange}
                        size="small"
                        placeholder="FIRST NAME"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: COLORS.PRIMARY,
                            },
                            "&.Mui-focused input": {
                              color: "black",
                            },
                          },
                        }}
                      />
                    </Grid2>
                    <Grid2 item xs={6}>
                      <Typography sx={{ mb: 1 }}>Last Name</Typography>
                      <TextField
                        name="lastName"
                        value={guestData.lastName}
                        onChange={handleChange}
                        size="small"
                        placeholder="LAST NAME"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: COLORS.PRIMARY,
                            },
                            "&.Mui-focused input": {
                              color: "black",
                            },
                          },
                        }}
                      />
                    </Grid2>
                  </Grid2>
                </Grid2>
              </Grid2>

              <Box mt={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={guestData.isBelow12}
                      onChange={handleChange}
                      name="isBelow12"
                    />
                  }
                  label={
                    <Typography variant="body2" fontWeight="bold">
                      Below 12 years of age
                    </Typography>
                  }
                />
              </Box>

              {/* Conditional PAN Card Field */}
              {guestData.isBelow12 && (
                <Box mt={2}>
                  <Typography sx={{ mb: 1 }}>Guardian PAN Card</Typography>
                  <TextField
                    name="guardianPan"
                    value={guestData.guardianPan}
                    onChange={handleChange}
                    size="small"
                    placeholder="Enter Guardian PAN"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: COLORS.PRIMARY,
                        },
                        "&.Mui-focused input": {
                          color: "black",
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleAddGuest}
              data-testid="saveGuests"
              sx={{ bgcolor: COLORS.PRIMARY }}
            >
              ADD TO SAVED GUESTS
            </Button>
          </form>
        </Box>
      )}

      {/* showing the added guests list to the user after adding the user */}
      {showList && (
        <Box className="addGuestForm add">
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ width: "400px" }}
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              Saved Guests
            </Typography>
            <Button
              size="small"
              sx={{ bgcolor: COLORS.PRIMARY, color: COLORS.WHITE, p: 1 }}
              onClick={() => setShowList(false)}
            >
              Add New Guests
            </Button>
          </Box>

          {/* showing the added guests list */}
          <Box sx={{ height: "200px", overflow: "auto", py: 2 }}>
            {/* mapping the selected guests list here */}
            {guestList.length > 0 ? (
              guestList.map((guest, index) => {
                return (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    sx={{
                      width: "400px",
                      borderBottom: `1px solid ${COLORS.PRIMARY}`,
                    }}
                    mb={2}
                  >
                    <Typography sx={{ px: 1 }}>
                      {guest.firstName} {guest.lastName}
                    </Typography>
                    <Box>
                      <EditIcon sx={{ color: COLORS.PRIMARY, px: 1 }} />
                      <DeleteIcon
                        sx={{ color: COLORS.PRIMARY, px: 1 }}
                        onClick={() => handleDelete(index)}
                      />
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Typography>There are No Guests Available!</Typography>
            )}
          </Box>

          <Box display="flex" justifyContent="center">
            <Button
              sx={{ bgcolor: COLORS.PRIMARY, color: COLORS.WHITE, p: 1, px: 4 }}
              onClick={() =>{
                dispatch(updatePersistGuest(guestList));
                dispatch(hideModal());
                console.log("Persisted Guests: ",persistedGuests);
              } }
            >
              DONE
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
