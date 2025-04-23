import React,{useState} from "react";

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

import { COLORS } from "@/utils/colors";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";

const GuestForm = () => {
    const dispatch=useDispatch();


    const openAddGuestForm=()=>{
        dispatch(showModal(<GuestAdditionDialog/>));
    }
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







  
  const GuestAdditionDialog = () => {
    const [title, setTitle] = useState('Mr');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isBelow12, setIsBelow12] = useState(false);
  
    const handleAddGuest = () => {
      // handle add guest logic here
      console.log({ title, firstName, lastName, isBelow12 });
    };
  
    return (
      <Box className="addEditGuestScrollSection" p={2}>
        <Box className="addGuestForm add">
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h6" fontWeight="bold">
              Add Guests
            </Typography>
           
              
          
          </Box>
          <Typography variant="body2" color="textSecondary" mb={2}>
            Name should be as per official govt. ID & travelers below 18 years of age cannot travel alone
          </Typography>
          <form>
            <Box className="addGuestForm__cont" mb={2}>
              <Grid2 container spacing={2} alignItems="center">
                <Grid2 item xs={12} sm={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="title-label">Title</InputLabel>
                    <Select
                      labelId="title-label"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    >
                      <MenuItem value="Mr">Mr</MenuItem>
                      <MenuItem value="Mrs">Mrs</MenuItem>
                      <MenuItem value="Ms">Ms</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 item xs={12} sm={9}>
                  <Grid2 container spacing={2}>
                    <Grid2 item xs={6}>
                      <TextField
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        inputProps={{ maxLength: 200 }}
                        fullWidth
                        size="small"
                      />
                    </Grid2>
                    <Grid2 item xs={6}>
                      <TextField
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        inputProps={{ maxLength: 200 }}
                        fullWidth
                        size="small"
                      />
                    </Grid2>
                  </Grid2>
                </Grid2>
              </Grid2>
  
              <Box mt={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isBelow12}
                      onChange={(e) => setIsBelow12(e.target.checked)}
                      id="ageFieldANG"
                    />
                  }
                  label={
                    <Typography variant="body2" fontWeight="bold">
                      Below 12 years of age
                    </Typography>
                  }
                />
              </Box>
            </Box>
  
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddGuest}
              data-testid="saveGuests"
            >
              ADD TO SAVED GUESTS
            </Button>
          </form>
        </Box>
      </Box>
    );
  };
  