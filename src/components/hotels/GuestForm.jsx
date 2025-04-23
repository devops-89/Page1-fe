import React, { useState } from "react";

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
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { COLORS } from "@/utils/colors";
import { useDispatch } from "react-redux";
import { showModal,hideModal } from "@/redux/reducers/modal";

const GuestForm = () => {
  const dispatch = useDispatch();
  

  const openAddGuestForm = () => {
    dispatch(showModal(<GuestAdditionDialog />));
  };
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Guest Details
      </Typography>
      <Stack spacing={2} direction={"row"} sx={{ mb: 2 }}>
        {/* Mr and Ms Selection */}
        <Box>
          <Typography variant="subtitle1">Title</Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              size="small"
              value={"mr"}
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
              <MenuItem value={"mr"}>Mr</MenuItem>
              <MenuItem value={"mrs"}>Mrs</MenuItem>
              <MenuItem value={"ms"}>Ms</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* FirstName */}
        <Box>
          <Typography sx={{ mb: 1 }}>First Name</Typography>
          <TextField
            id="outlined-firstname-input"
            size="small"
            type="text"
            placeholder="FIRST NAME"
            autoComplete="current-firstname"
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

        {/* Lastname */}
        <Box>
          <Typography sx={{ mb: 1 }}>Last Name</Typography>
          <TextField
            id="outlined-lastname-input"
            size="small"
            type="text"
            placeholder="LAST NAME"
            autoComplete="current-lastname"
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
      <Stack spacing={2} direction={"row"}>
        {/* Email */}
        <Box>
          <Typography sx={{ mb: 1 }}>EMAIL ADDRESS</Typography>
          <TextField
            id="outlined-email-input"
            size="small"
            type="email"
            placeholder="EMAIL ADDRESS"
            autoComplete="current-email"
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
            id="outlined-mobile-input"
            size="small"
            type="number"
            placeholder="MOBILE NUMBER"
            autoComplete="current-password"
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

  const [guestData, setGuestData] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    isBelow12: false,
    guardianPan: "",
  });

  const [selectedGuests, setSelectedGuests] = useState([]);
  const [showList,setShowList]=useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setGuestData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddGuest = () => {
    setSelectedGuests((prev) => [...prev, guestData]);
    console.log("selected Guests: ", [...selectedGuests, guestData]);
    // reseting the guest data for adding next guest
    setGuestData({
      title: "Mr",
      firstName: "",
      lastName: "",
      isBelow12: false,
      guardianPan: "",
    });
    setShowList(true);

  };

  return (
    <Box className="addEditGuestScrollSection" p={2}>
       {/* Adding guest Form Showing Conditionally */}
      {
         (!showList && (
          <Box className="addGuestForm add">
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h6" fontWeight="bold">Add Guests</Typography>
            <Button onClick={() => dispatch(hideModal())} sx={{ color: COLORS.BLACK, borderRadius: 50 }}>
              <ClearIcon sx={{ fontWeight: "bold" }} />
            </Button>
          </Box>
           
          
           
              <Typography variant="body2" color="textSecondary" mb={2}>
                Name should be as per official govt. ID & travelers below 18 years of
                age cannot travel alone
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
         ))
      }
    
      {/* showing the added guests list to the user after adding the user */}
        {
              (showList && (
                <Box className="addGuestForm add">
          <Box display="flex" justifyContent="space-between" sx={{width:"400px"}} mb={2}>
            <Typography variant="h6" fontWeight="bold">Saved Guests</Typography>
            <Button size="small" sx={{bgcolor:COLORS.PRIMARY,color:COLORS.WHITE,p:1}} onClick={() =>setShowList(false)} >
            
             Add New Guests
           
            </Button>
          </Box>

          {/* showing the added guests list */}
          <Box sx={{height:"200px",overflow:"auto",py:2}}>
            {/* mapping the selected guests list here */}
           {
              (selectedGuests.length>0)?(
                selectedGuests.map((guest,index)=>{
                    return (
                      <Box display="flex" justifyContent="space-between" sx={{width:"400px",borderBottom:`1px solid ${COLORS.PRIMARY}`}} mb={2}>
                      <Typography sx={{px:1}}>
                       {guest.firstName} {guest.lastName}
                      </Typography>
                      <Box>
                        <EditIcon sx={{color:COLORS.PRIMARY,px:1}} />
                        <DeleteIcon sx={{color:COLORS.PRIMARY,px:1}} />
                      </Box>
                  </Box>
                    )
                })
              ):(
                <Typography>There are No Guests Available!</Typography>
              )
           }
      
          </Box>

          <Box display="flex" justifyContent="center" >
          <Button  sx={{bgcolor:COLORS.PRIMARY,color:COLORS.WHITE,p:1,px:4}}  onClick={()=>dispatch(hideModal())}>
            DONE
          </Button>
          </Box>
          
          </Box>
              ))
           }

     
    </Box>
  );
};

