import banner from "@/banner/hotel.jpg";
import { styled } from "@mui/material/styles";
import { COLORS } from "@/utils/colors";
import CloseIcon from "@mui/icons-material/Close";
import { nunito } from "@/utils/fonts";
import {
    Box,
    Button,
    Container,
    DialogContent,
    DialogTitle,
    Dialog,
    Grid2,
    IconButton,
    List,
    ListItem,
    Rating,
    Typography,
    Divider,
    TableContainer,
    Table,
    Tab,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    InputLabel,
    FormControl,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { Form } from "formik";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const hotelSummary = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
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
                    Review Your Bookings
                </Typography>
            </Grid2>

            <Grid2
                size={{ xs: "12" }}
                sx={{ width: "100%", backgroundColor: COLORS.SEMIGREY }}
            >
                <Container sx={{ py: "30px", mt: "-100px", mb: "40px" }}>
                    <Grid2 container spacing={3}>
                        <Grid2
                            size={{ xs: 12, md: 12, lg: 8 }}
                            sx={{ backgroundColor: COLORS.WHITE, borderRadius: "8px" }}
                        >
                            <Grid2 container spacing={2} sx={{ padding: "20px" }}>
                                <Grid2 size={{ xs: 10 }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontFamily: nunito.style,
                                            fontWeight: 800,
                                            mb: "10px",
                                        }}
                                    >
                                        Elements by Rosetta
                                    </Typography>
                                    <Box
                                        sx={{ display: "flex", alignItems: "center", mb: "10px" }}
                                    >
                                        <Rating
                                            name="read-only"
                                            sx={{ marginRight: "10px" }}
                                            value={2.5}
                                            readOnly
                                        />{" "}
                                        <Typography
                                            component={"span"}
                                            sx={{
                                                backgroundColor: COLORS.GREY,
                                                padding: "2px 8px",
                                                borderRadius: "4px",
                                            }}
                                        >
                                            Couple Friendly
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontFamily: nunito.style,
                                            fontWeight: 600,
                                            color: COLORS.DARKGREY,
                                        }}
                                    >
                                        H NO.474/B BLOCK A, LANGOTTEM, SALCETE, NEAR VARCA GLORIA
                                        CHURCH, VARCA, SOUTH GOA,GOA, H NO.474/B BLOCK A, LANGOTTEM,
                                        SALCETE, NEAR VARCA GLORIA CHURCH, VARCA, SOUTH GOA,GOA,
                                        Goa, India
                                    </Typography>
                                </Grid2>
                                <Grid2 size={{ xs: 2 }}>
                                    <img
                                        src={banner.src}
                                        alt="Image 1"
                                        style={{
                                            width: "100px",
                                            borderRadius: "8px",
                                            height: "100px",
                                            display: "block",
                                        }}
                                    />
                                </Grid2>
                            </Grid2>

                            <Grid2
                                container
                                spacing={2}
                                sx={{
                                    padding: "20px",
                                    backgroundColor: COLORS.SEMIGREY,
                                    border: `1px solid ${COLORS.GREY}`,
                                }}
                            >
                                <Grid2
                                    size={{ xs: 8 }}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        borderRight: "1px solid",
                                        pr: "10px",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: nunito.style,
                                                fontWeight: 500,
                                                fontSize: "12px",
                                            }}
                                        >
                                            CHECK IN
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                        >
                                            Fri 31 Jan 2025
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: nunito.style,
                                                fontWeight: 500,
                                                fontSize: "12px",
                                            }}
                                        >
                                            2:30 PM
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            component={"span"}
                                            sx={{
                                                backgroundColor: COLORS.GREY,
                                                padding: "2px 8px",
                                                borderRadius: "4px",
                                            }}
                                        >
                                            Nights
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: nunito.style,
                                                fontWeight: 500,
                                                fontSize: "12px",
                                            }}
                                        >
                                            CHECK OUT
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                        >
                                            Sat 1 Feb 2025
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: nunito.style,
                                                fontWeight: 500,
                                                fontSize: "12px",
                                            }}
                                        >
                                            11:30 AM
                                        </Typography>
                                    </Box>
                                </Grid2>
                                <Grid2
                                    size={{ xs: 4 }}
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                    >
                                        1 Night | 2 Adults | 1 Room
                                    </Typography>
                                </Grid2>
                            </Grid2>

                            <Grid2 container spacing={2} sx={{ padding: "20px" }}>
                                <Grid2 size={{ xs: 12 }} sx={{ position: "relative" }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                    >
                                        Robusta
                                    </Typography>
                                    <Button
                                        sx={{ position: "absolute", top: "10px", right: "10px" }}
                                        onClick={handleClickOpen}
                                    >
                                        See Inclusions
                                    </Button>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontFamily: nunito.style,
                                            fontWeight: 600,
                                            color: COLORS.DARKGREY,
                                        }}
                                    >
                                        2 Adults
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
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontFamily: nunito.style,
                                            fontWeight: 600,
                                            color: COLORS.BLACK,
                                        }}
                                    >
                                        Non-Refundable
                                    </Typography>
                                    <List sx={{ listStyleType: "disc", ml: 2 }}>
                                        <ListItem sx={{ display: "list-item", py: 0 }}>
                                            <Typography
                                                sx={{ fontSize: "15px", fontFamily: nunito.style }}
                                            >
                                                Refund is not applicable for this booking
                                            </Typography>
                                        </ListItem>
                                    </List>
                                    <Button onClick={handleClickOpen}>
                                        Cancellation policy details
                                    </Button>
                                    <Divider sx={{ my: 3 }} />
                                    <Typography
                                        variant="h6"
                                        sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                    >
                                        Important information
                                    </Typography>
                                    <List sx={{ listStyleType: "disc", ml: 2 }}>
                                        <ListItem sx={{ display: "list-item", py: 0 }}>
                                            <Typography
                                                sx={{ fontSize: "15px", fontFamily: nunito.style }}
                                            >
                                                Passport, Aadhar, Driving License and Govt. ID are
                                                accepted as ID proof(s)
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ display: "list-item", py: 0 }}>
                                            <Typography
                                                sx={{ fontSize: "15px", fontFamily: nunito.style }}
                                            >
                                                Pets are not allowed
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ display: "list-item", py: 0 }}>
                                            <Typography
                                                sx={{ fontSize: "15px", fontFamily: nunito.style }}
                                            >
                                                Outside food is not allowed
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ display: "list-item", py: 0 }}>
                                            <Typography
                                                sx={{ fontSize: "15px", fontFamily: nunito.style }}
                                            >
                                                Optional : Rollaway bed fee: INR 1250 per night
                                            </Typography>
                                        </ListItem>
                                    </List>
                                    <Button onClick={handleClickOpen}>View More</Button>

                                    <Divider sx={{ my: 3 }} />
                                <Typography
                                        variant="h6"
                                        sx={{ fontFamily: nunito.style, fontWeight: 700, mb:'10px' }}
                                    >
                                        Add New Guest
                                    </Typography>
                                <form onSubmit={handleSubmit}>
                            <Grid2 container spacing={3}>
                                <Grid2 size={{xs:12, sm:3}}>
                                    <FormControl fullWidth>
                                        <InputLabel>Title</InputLabel>
                                        <Select
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        >
                                            <MenuItem value="MR">Mr</MenuItem>
                                            <MenuItem value="MRS">Mrs</MenuItem>
                                            <MenuItem value="MS">Ms</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{xs:12, sm:4}}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid2>

                                <Grid2 size={{xs:12, sm:5}}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid2>

                                <Grid2 size={{xs:12}}>
                                    <TextField
                                        fullWidth
                                        label="Email ID"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid2>

                                <Grid2 size={{xs:12}}>
                                    <TextField
                                        fullWidth
                                        label="Mobile Number"
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid2>

                                <Grid2 size={{xs:12}}>
                                    <Button variant="text" sx={{backgroundColor:COLORS.PRIMARY}} type="submit">
                                        Add New Guest
                                    </Button>
                                </Grid2>
                            </Grid2>
                        </form>
                                </Grid2>
                                
                                
                            </Grid2>

                        </Grid2>

                        <Grid2
                            size={{ xs: 12, md: 12, lg: 4 }}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                            }}
                        >
                            <Box sx={{ backgroundColor: COLORS.WHITE, padding: "20px", borderRadius: "8px" }}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                >
                                    Price Breakup
                                </Typography>
                                <TableContainer sx={{ mb: 3 }}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell sx={{ fontFamily: nunito.style, fontSize: '16px', fontWeight: 600 }}>1 Room x 1 Night</TableCell>
                                                <TableCell sx={{ fontFamily: nunito.style, fontSize: '16px', fontWeight: 800 }}>₹ 11,500</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ fontFamily: nunito.style, fontSize: '16px', fontWeight: 600 }}>Total Discount</TableCell>
                                                <TableCell sx={{ fontFamily: nunito.style, fontSize: '16px', fontWeight: 800 }}>₹ 1,725</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ fontFamily: nunito.style, fontSize: '16px', fontWeight: 600 }}>Price after Discount</TableCell>
                                                <TableCell sx={{ fontFamily: nunito.style, fontSize: '16px', fontWeight: 800 }}>₹ 9,775</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ fontFamily: nunito.style, fontSize: '16px', fontWeight: 600 }}>Hotel Taxes</TableCell>
                                                <TableCell sx={{ fontFamily: nunito.style, fontSize: '16px', fontWeight: 800 }}>₹ 1,760</TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableFooter sx={{ backgroundColor: COLORS.GREY }}>
                                            <TableRow>
                                                <TableCell sx={{ fontFamily: nunito.style, fontSize: '16px', fontWeight: 600 }}>Total Amount to be paid</TableCell>
                                                <TableCell sx={{ fontFamily: nunito.style, fontSize: '16px', fontWeight: 800 }}>₹ 11,535</TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </TableContainer>

                                <Button variant="contained" size="large" fullWidth sx={{ backgroundColor: COLORS.PRIMARY }}>Pay Now</Button>
                            </Box>
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

export default hotelSummary;
