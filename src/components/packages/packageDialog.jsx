import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography,
    Box,
    Divider,
    ButtonGroup,
    TextField
} from '@mui/material';
import { COLORS } from '@/utils/colors';
import { roboto } from '@/utils/fonts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addMonths } from 'date-fns';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PackageDialog({ data }) {
    const [open, setOpen] = React.useState(false);
    const [adultCount, setAdultCount] = React.useState(1); // start with 1
    const [childCount, setChildCount] = React.useState(0);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const maxPersons = data?.package_no_of_person || 10;

    const increment = (setter, currentValue, otherCount) => {
        if (currentValue + otherCount < maxPersons) {
            setter(currentValue + 1);
        }
    };

    const decrement = (setter, currentValue) => {
        if (currentValue > 1) {
            setter(currentValue - 1);
        }
    };

    const basePrice = parseFloat(data?.package_price || '0');
    const totalPersons = adultCount + childCount;
    const totalPrice = basePrice * totalPersons;

    return (
        <>
            <Button
                variant="contained"
                fullWidth
                onClick={handleClickOpen}
                sx={{ mt: 2, bgcolor: COLORS.PRIMARY, fontFamily: roboto.style }}
            >
                BOOK NOW
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle fontWeight="bold" sx={{ fontFamily: roboto.style }}>
                    {data.package_name}
                </DialogTitle>

                <DialogContent>
                    {/* Date Picker */}
                    <Box sx={{ mt: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Select Date"
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                minDate={new Date()}
                                maxDate={addMonths(new Date(), 4)}
                                renderInput={(params) => (
                                    <Box mt={1}>
                                        <TextField
                                            {...params}
                                            fullWidth
                                            size="small"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: '#FFC107',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#FFB300',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#FFA000',
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontFamily: roboto.style }}>
                        Package Members
                    </Typography>
                  
                     {data?.package_no_of_person <= 2 ? (
                        <Box>
                            <Typography>
                                Number of Persons: {data?.package_no_of_person}
                            </Typography>
                        </Box>
                    ) : (
                        <Box display="flex" justifyContent="start" gap={4} flexWrap="wrap" mt={2}>
                        {/* Adult Section */}
                        <Box>
                            <Typography sx={{ fontFamily: roboto.style }}>
                                Adult <em>(Above 12 years)</em>
                            </Typography>
                            <ButtonGroup
                                variant="outlined"
                                size="medium"
                                sx={{
                                    mt: 1,
                                    '& .MuiButton-root': {
                                        borderColor: COLORS.PRIMARY,
                                        color:'#000', 
                                        '&:hover': {
                                            borderColor: COLORS.PRIMARY,
                                            backgroundColor: 'transparent',
                                        },
                                    },
                                }}
                            >
                                <Button onClick={() => decrement(setAdultCount, adultCount)}>-</Button>
                                <Button>{adultCount}</Button>
                                <Button onClick={() => increment(setAdultCount, adultCount, childCount)}>+</Button>
                            </ButtonGroup>
                        </Box>

                        {/* Child Section */}
                        <Box>
                            <Typography sx={{ fontFamily: roboto.style }}>
                                Child <em>(Below 12 years)</em>
                            </Typography>
                            <ButtonGroup
                                variant="outlined"
                                size="medium"
                                sx={{
                                    mt: 1,
                                    '& .MuiButton-root': {
                                        borderColor: COLORS.PRIMARY,
                                        color:'#000', 
                                        '&:hover': {
                                            borderColor: COLORS.PRIMARY,
                                            backgroundColor: 'transparent',
                                        },
                                    },
                                }}
                            >
                                <Button onClick={() => decrement(setChildCount, childCount)}>-</Button>
                                <Button>{childCount}</Button>
                                <Button onClick={() => increment(setChildCount, childCount, adultCount)}>+</Button>
                            </ButtonGroup>
                        </Box>
                    </Box>

                    )}

                    <Divider sx={{ my: 3 }} />

                    {/* Total Price */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" sx={{ fontFamily: roboto.style }}>
                            <strong>Total Price:</strong>
                        </Typography>
                        <Typography variant="h6" color="green" sx={{ fontFamily: roboto.style }}>
                            ₹ {totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </Typography>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} sx={{ fontFamily: roboto.style }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: COLORS.PRIMARY, fontFamily: roboto.style }}
                        onClick={handleClose}
                    >
                        Continue Booking
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
