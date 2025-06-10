import React from "react";
import InnerBanner from "@/components/innerBanner";
import backgroundImage from "@/banner/privacy-policy.jpg";
import { Container, Typography } from "@mui/material";
import { roboto } from "@/utils/fonts";

const CancellationPolicy = () => {
  return (
    <>
      <InnerBanner img={backgroundImage.src} heading="Cancellation Policy" />
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Typography variant="body1" sx={{ fontFamily: roboto.style }}>
          <strong>FLIGHT CANCELLATION POLICY</strong><br /><br />
          <strong>1. General Policy:</strong><br />
          All cancellations are subject to approval from the respective flight/airline company. Customers must adhere to the cancellation policies set forth by the specific airline providing the service.
          <br /><br />
          <strong>2. Cancellation Requests:</strong><br />
          Customers are required to submit cancellation requests to our email <a href="mailto:page1travels@gmail.com">page1travels@gmail.com</a> or through our phone line <a href="tel:+917006680891">+91 7006680891</a> with your registered details. The request will then be forwarded to the airline for approval.
          <br /><br />
          <strong>3. Cancellation Fees:</strong><br />
          Cancellation fees, if applicable, will be determined by the airline and are subject to their policies. Customers are responsible for any fees incurred due to cancellations.
          <br /><br />
          <strong>4. Refund Eligibility:</strong><br />
          Refund eligibility is contingent upon the policies of the airline. Customers must carefully review the terms and conditions mentioned at the website of the specific airline to understand refund eligibility criteria.
          <br /><br />

          <strong>HOTEL CANCELLATION POLICY</strong><br /><br />
          <strong>1. Cancellation Requests:</strong><br />
          All cancellation requests for hotel reservations, tour packages, and activities must be submitted to our mail <a href="mailto:page1travels@gmail.com">page1travels@gmail.com</a> or through our phone line <a href="tel:+917006680891">+91 7006680891</a> with your registered details. Cancellations are subject to approval by the respective hotel or tour/activity provider.
          <br /><br />
          <strong>2. Cancellation Deadline:</strong><br />
          Customers are required to cancel their hotel reservation, tour package, or activity before the provider's specified deadline to be eligible for a refund as mentioned over ticket. The cancellation deadline is determined by the individual provider and can be found in the reservation confirmation.
          <br /><br />
          <strong>3. Cancellation Fees:</strong><br />
          Cancellation fees, if applicable, will be determined by the hotel or activity provider and are subject to their policies. Customers are responsible for any fees incurred due to cancellations made after the specified deadline.
          <br /><br />
          <strong>4. Refund Eligibility:</strong><br />
          Refund eligibility is contingent upon the policies of the hotel or activity provider. Customers must carefully review the terms and conditions provided by the specific provider to understand refund eligibility criteria.
          <br /><br />

          <strong>Note:</strong><br />
          Our company acts as an intermediary between customers and airlines, facilitating the communication and processing of cancellation. We do not have direct control over the approval or denial of such requests, as this is solely at the discretion of the respective airline. Customers are encouraged to familiarise themselves with the terms and conditions of the specific airline providing the service.
        </Typography>
      </Container>
    </>
  );
};

export default CancellationPolicy;
