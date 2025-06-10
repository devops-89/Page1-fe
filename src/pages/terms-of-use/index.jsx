import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import InnerBanner from "@/components/innerBanner";
import backgroundImage from "@/banner/privacy-policy.jpg";
import { roboto } from "@/utils/fonts";

const TermsOfUse = () => {
  return (
    <>
      <InnerBanner img={backgroundImage.src} heading="Terms & Conditions" />
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 } , fontFamily: roboto.style}} >
       
        <Typography variant="body2" color="text.secondary" sx={{fontFamily: roboto.style}} gutterBottom>
          Last updated January 2023
        </Typography>

        {/* AGREEMENT TO TERMS */}
        <Box mb={6}>
          <Typography variant="h6" fontWeight="600" sx={{fontFamily: roboto.style}} gutterBottom>
            AGREEMENT TO TERMS
          </Typography>
          <Typography sx={{fontFamily: roboto.style}} >
            These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and PAGE 1 TRAVELS (“we,” “us” or “our”), concerning your access to and use of the https://page1travels.com/ website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
          </Typography>
          <Typography sx={{fontFamily: roboto.style}}>
            You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Use. If you do not agree with all of these Terms of Use, then you are expressly prohibited from using the Site and you must discontinue use immediately.
          </Typography>
        </Box>

        {/* INTELLECTUAL PROPERTY RIGHTS */}
        <Box mb={6}>
          <Typography variant="h6" fontWeight="600" sx={{fontFamily: roboto.style}} gutterBottom>
            INTELLECTUAL PROPERTY RIGHTS
          </Typography>
          <Typography sx={{fontFamily: roboto.style}}>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, foreign jurisdictions, and international conventions.
          </Typography>
          <Typography sx={{fontFamily: roboto.style}}>
            The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
          </Typography>
        </Box>

        {/* USER REPRESENTATIONS */}
        <Box mb={6}>
          <Typography variant="h6" fontWeight="600" sx={{fontFamily: roboto.style}} gutterBottom>
            USER REPRESENTATIONS
          </Typography>
          <List sx={{ pl: 2 }}>
            {[
              "All registration information you submit will be true, accurate, current, and complete.",
              "You will maintain the accuracy of such information and promptly update such registration information as necessary.",
              "You have the legal capacity and you agree to comply with these Terms of Use.",
              "You are not under the age of 18.",
              "You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.",
              "You will not use the Site for any illegal or unauthorized purpose.",
              "Your use of the Site will not violate any applicable law or regulation."
            ].map((item, index) => (
              <ListItem key={index} sx={{ display: "list-item", py: 0 }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* PROHIBITED ACTIVITIES */}
        <Box mb={6}>
          <Typography variant="h6" fontWeight="600" sx={{fontFamily: roboto.style}} gutterBottom>
            PROHIBITED ACTIVITIES
          </Typography>
          <Typography sx={{fontFamily: roboto.style}}>
            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </Typography>
          <Typography sx={{fontFamily: roboto.style}}>
            As a user of the Site, you agree not to:
          </Typography>
          <List sx={{ pl: 2 }}>
            {[
              "Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.",
              "Make any unauthorized use of the Site.",
              "Use the Site to advertise or offer to sell goods and services.",
              "Circumvent, disable, or otherwise interfere with security-related features of the Site.",
              "Engage in unauthorized framing of or linking to the Site.",
              "Trick, defraud, or mislead us and other users.",
              "Make improper use of our support services or submit false reports of abuse or misconduct.",
              "Use the Site in a manner inconsistent with any applicable laws or regulations."
            ].map((item, index) => (
              <ListItem key={index} sx={{ display: "list-item", py: 0 }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CONTRIBUTION LICENSE */}
        <Box mb={6}>
          <Typography variant="h6" fontWeight="600" sx={{fontFamily: roboto.style}} gutterBottom>
            CONTRIBUTION LICENSE
          </Typography>
          <Typography sx={{fontFamily: roboto.style}}>
            By posting your Contributions to any part of the Site, you automatically grant, and you represent and warrant that you have the right to grant to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions.
          </Typography>
          <Typography sx={{fontFamily: roboto.style}}>
            This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide.
          </Typography>
        </Box>

        {/* CONTACT US */}
        <Box mb={6}>
          <Typography variant="h6" fontWeight="600" sx={{fontFamily: roboto.style}} gutterBottom>
            CONTACT US
          </Typography>
          <Typography sx={{fontFamily: roboto.style}}>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
          </Typography>
          <Typography fontWeight="600" sx={{fontFamily: roboto.style}} gutterBottom>
            PAGE 1 TRAVELS
          </Typography>
          <Typography sx={{fontFamily: roboto.style}}>Visit us at: https://page1travels.com/</Typography>
        </Box>
      </Container>
    </>
  );
};

export default TermsOfUse;
