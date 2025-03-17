import { data } from "@/assests/data";
import contact from "@/banner/contact.jpg";
import ContactCard from "@/components/contact/contactCard";
import InnerBanner from "@/components/innerBanner";
import { nunito } from "@/utils/fonts";
import { Box, Container, Grid2, Typography } from "@mui/material";
const Contact = () => {
  return (
    <div>
      <InnerBanner img={contact.src} heading={"Contact Us"} />
      <Box sx={{ pt: {lg:10 ,xs:5}, pb: 10 }}>
        <Container>
          <Grid2 container>
            <Grid2 size={12}>
              <Box>
              <Container>
           
              <Typography
                sx={{
                  fontSize: {lg:35 ,md:35 , xs:35 , xs:27},
                  fontFamily: nunito.style,
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Reach Out to Our Dedicated Support Team
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  fontFamily: nunito.style,
                  fontWeight: 600,
                  //   lineHeight: 1,
                  mt: 2,
                }}
              >
                Our team is ready to help. Your satisfaction is our priority
              </Typography>
              

              <Typography
                sx={{
                  fontSize: 15,
                  fontFamily: nunito.style,
                  fontWeight: 400,
                  //   lineHeight: 1,
                  mt: 2,
                }}
              >
                Got a question, need advice, or looking for help? Our
                knowledgeable team is here to assist you every step of the way.
                We’re just a message or call away, ready to provide the guidance
                you need.
              </Typography>
            </Container>
              </Box>
              
                
              <ContactCard data={data.contactData} />
            </Grid2>
            <Grid2 size={6}>
              
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};

export default Contact;
