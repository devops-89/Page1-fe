import InnerBanner from "@/components/innerBanner";
import backgroundImage from "@/banner/privacy-policy.jpg";
import { Container, Typography } from "@mui/material";
import React from "react";
import { roboto } from "@/utils/fonts";

const TermsAndConditions = () => {
  return (
    <>
      <InnerBanner
        img={backgroundImage.src}
        heading={"Terms & Conditions"}
      />
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Typography variant="body1" sx={{ fontFamily: roboto.style }}>
          Welcome to our website. These Terms and Conditions ("Terms") govern your access to and use of our website and services. By accessing or using the site, you agree to be bound by these Terms in full. If you do not agree with any part of these Terms, please do not use our services.
          <br /> <br />
          <strong>1. Eligibility and Account Responsibility</strong><br />
          You must be at least 18 years of age or the legal age of majority in your jurisdiction to use our website. You agree to provide accurate and complete registration information and to update your information as necessary. You are solely responsible for maintaining the confidentiality of your account and password.
          <br /> <br />
          <strong>2. Use of the Site</strong><br />
          You agree not to use the website for any purpose that is unlawful, harmful, or prohibited by these Terms. You may not use the site in any manner that could damage, disable, overburden, or impair our servers or interfere with any other party's use of the site.
          <br /> <br />
          <strong>3. Intellectual Property</strong><br />
          All content, trademarks, logos, service marks, and data on this website—including text, graphics, software, images, and layout—are the property of or licensed to us and are protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or use any content without prior written consent.
          <br /> <br />
          <strong>4. User-Generated Content</strong><br />
          If you post or submit any content to our website, including reviews, comments, or messages, you grant us a worldwide, royalty-free, perpetual license to use, reproduce, modify, publish, and display such content in connection with our services. You represent that you own or have rights to submit such content and that it does not infringe on any third-party rights.
          <br /> <br />
          <strong>5. Third-Party Links</strong><br />
          Our site may contain links to third-party websites. These links are provided solely for your convenience. We do not endorse or assume responsibility for any third-party site, including their content, policies, or practices. Your use of any third-party site is at your own risk.
          <br /> <br />
          <strong>6. Disclaimer of Warranties</strong><br />
          The website and services are provided "as is" and "as available" without any warranties, express or implied. We do not warrant that the services will be uninterrupted, error-free, or secure, or that defects will be corrected.
          <br /> <br />
          <strong>7. Limitation of Liability</strong><br />
          In no event shall we, our affiliates, directors, or employees be liable for any indirect, incidental, special, or consequential damages arising from or related to your use of or inability to use the website, even if we have been advised of the possibility of such damages.
          <br /> <br />
          <strong>8. Indemnification</strong><br />
          You agree to indemnify and hold harmless our company, its affiliates, officers, agents, and employees from any claim or demand made by any third party due to or arising out of your use of the site, your violation of these Terms, or your violation of any rights of another.
          <br /> <br />
          <strong>9. Termination</strong><br />
          We reserve the right to suspend or terminate your access to the website at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users or our operations.
          <br /> <br />
          <strong>10. Changes to Terms</strong><br />
          We may revise these Terms at any time without prior notice. By continuing to use the website after changes are made, you agree to be bound by the updated Terms. It is your responsibility to check this page regularly.
          <br /> <br />
          <strong>11. Governing Law & Dispute Resolution</strong><br />
          These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of [Your City], India.
          <br /> <br />
         
        </Typography>
      </Container>
    </>
  );
};

export default TermsAndConditions;
