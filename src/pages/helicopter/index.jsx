import InnerBanner from '@/components/innerBanner'
import React from 'react'
import banner from "@/banner/helicopter.jpg";
import { Button, Checkbox, Container, FormControlLabel, Grid2, TextField, Typography } from '@mui/material';
import { nunito } from '@/utils/fonts';
import { Form, Formik } from 'formik';
import { helicopter } from '@/utils/validationSchema';
import { COLORS } from '@/utils/colors';

const Helicopter = () => {
  return (
    <>
    <InnerBanner img={banner.src} heading={"Helicopter"} />
    <Container>
    <Grid2 container sx={{padding:"50px 0"}}>
        <Grid2 size={{xs:12}}>
           <Typography variant='h4' sx={{fontFamily:nunito.style, fontWeight:600, mb:"15px", color:COLORS.PRIMARY}}>Create memories for a lifetime</Typography>  
           <Typography variant='body1' sx={{fontFamily:nunito.style, mb:"20px"}}>Explore the world with a new perspective with Page1 Travels’s helicopter services. A helicopter ride is one of the most exciting and unique ways of exploring a new destination. Discover the thrill of flying and explore beautiful destinations from the air as you soar over the amazing locations. With experienced pilots and amazing tour guides, Page1 Travels will ensure a memorable and fun helicopter experience for you. Simply fill in the inquiry form and get set for the travel experience for a lifetime.</Typography>

           <Typography variant='h5' sx={{fontFamily:nunito.style, fontWeight:700, mb:"15px"}}>Book Your Trip Now</Typography>  


      <Formik
        initialValues={{
          fullName: "",
          mobile: "",
          email: "",
          from: "",
          to: "",
          date: "",
          time: "",
          adults: "",
          children: "",
          message: "",
          terms: false,
        }}
        validationSchema={helicopter}
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form sx={{fontFamily:nunito.style, fontWeight:600}}>
            <Grid2 container spacing={2}>
              <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                />
              </Grid2>
              <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  error={touched.mobile && Boolean(errors.mobile)}
                  helperText={touched.mobile && errors.mobile}
                />
              </Grid2>
              <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField
                  fullWidth
                  label="Email ID"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid2>
              <Grid2  size={{xs:12, sm:6, md:4}}>
                <TextField fullWidth label="From" name="from" value={values.from} onChange={handleChange} error={touched.from && Boolean(errors.from)} helperText={touched.from && errors.from} />
              </Grid2>
              <Grid2  size={{xs:12, sm:6, md:4}}>
                <TextField fullWidth label="To" name="to" value={values.to} onChange={handleChange} error={touched.to && Boolean(errors.to)} helperText={touched.to && errors.to} />
              </Grid2>
              <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField fullWidth label="Date" name="date" type="date" InputLabelProps={{ shrink: true }} value={values.date} onChange={handleChange} error={touched.date && Boolean(errors.date)} helperText={touched.date && errors.date} />
              </Grid2>
              <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField fullWidth label="Time" name="time" type="time" InputLabelProps={{ shrink: true }} value={values.time} onChange={handleChange} error={touched.time && Boolean(errors.time)} helperText={touched.time && errors.time} />
              </Grid2>
              <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField fullWidth label="No. of Adults" name="adults" type="number" value={values.adults} onChange={handleChange} error={touched.adults && Boolean(errors.adults)} inputProps={{ min: 1, max: 10 }} helperText={touched.adults && errors.adults} />
              </Grid2>
              <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField fullWidth label="No. of Children" name="children" type="number" value={values.children} onChange={handleChange} error={touched.children && Boolean(errors.children)} inputProps={{ min: 0, max: 10 }} helperText={touched.children && errors.children} />
              </Grid2>
              <Grid2 size={{xs:12}}>
                <TextField fullWidth label="Message" name="message" multiline rows={3} value={values.message} onChange={handleChange} />
              </Grid2>
              <Grid2 size={{xs:12}}>
                <FormControlLabel
                  control={<Checkbox name="terms" checked={values.terms} onChange={handleChange} />}
                  label="I have read the Terms and Conditions, and I agree with terms and conditions"
                />
                {touched.terms && Boolean(errors.terms) && <p style={{ color: "red" }}>{errors.terms}</p>}
              </Grid2>
              <Grid2 item xs={12}>
                <Button type="submit" variant="contained" sx={{backgroundColor:COLORS.PRIMARY}} fullWidth>
                  Book Now
                </Button>
              </Grid2>
            </Grid2>
          </Form>
        )}
      </Formik>
    
        </Grid2>
    </Grid2>
    </Container>
    </>
  )
}

export default Helicopter