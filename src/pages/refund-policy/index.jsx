import React from "react";
import InnerBanner from "@/components/innerBanner";
import backgroundImage from "@/banner/privacy-policy.jpg";
import { Container, Typography } from "@mui/material";
import { roboto } from "@/utils/fonts";

const RefundPolicy = () => {
  return (
    <>
      <InnerBanner img={backgroundImage.src} heading="Refund Policy" />
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Typography variant="body1" sx={{ fontFamily: roboto.style }}>
          <strong>FLIGHT REFUND POLICY</strong><br /><br />
          <strong>1. Approval Process:</strong><br />
          Refunds are subject to approval by the airline. Once a cancellation request is submitted, our team will initiate the refund process with the airline on behalf of the customer.
          <br /><br />
          <strong>2. Refund Processing Time:</strong><br />
          The time taken to process a refund is determined by the airline. Customers should refer to the airline's policies for information on the estimated processing time for refunds.
          <br /><br />
          <strong>3. Refund Method:</strong><br />
          Refunds, if approved, will be processed using the same method of payment used for the original booking. Any fees associated with the refund transaction will be the responsibility of the customer.
          <br /><br />
          <strong>4. Non-Refundable Tickets:</strong><br />
          Some tickets may be non-refundable according to the airline's policies. In such cases, customers are advised to review the terms and conditions of their ticket before making a reservation.
          <br /><br />
          <strong>5. Partial Refunds:</strong><br />
          In cases where only a portion of the trip is cancelled, the refund amount will be determined by the airline's policies. Customers should contact the airline directly for clarification on partial refund calculations.
          <br /><br />

          <strong>HOTEL REFUND POLICY</strong><br /><br />
          <strong>1. Approval Process:</strong><br />
          Refunds are subject to approval by the hotel or activity provider. Once a cancellation request is submitted, our team will initiate the refund process with the provider on behalf of the customer.
          <br /><br />
          <strong>2. Refund Processing Time:</strong><br />
          The time taken to process a refund is determined by the hotel or activity provider. Customers should refer to the provider's policies for information on the estimated processing time for refunds.
          <br /><br />
          <strong>3. Refund Method:</strong><br />
          Refunds, if approved, will be processed using the same method of payment used for the original booking. Any fees associated with the refund transaction will be the responsibility of the customer.
          <br /><br />
          <strong>4. Non-Refundable Reservations/Tour Packages/Activities:</strong><br />
          Some reservations, tour packages, or activities may be non-refundable according to the provider's policies. In such cases, customers are advised to review the terms and conditions before confirming.
          <br /><br />

          <strong>HOTEL MODIFICATION POLICY</strong><br /><br />
          <strong>1. Modification Requests:</strong><br />
          Requests for modifications are subject to approval by the hotel or activity provider. Once a modification request is submitted, our team will initiate the process with the provider on behalf of the customer.
          <br /><br />
          <strong>2. Modification Deadline:</strong><br />
          Deadlines for modifications are determined by the hotel or activity provider. Customers should refer to the provider’s policies for applicable timeframes.
          <br /><br />
          <strong>3. Modification Fees:</strong><br />
          Modification requests, if approved, may incur additional charges as determined by the provider. Any fees will be the customer’s responsibility.
          <br /><br />

          <strong>Note:</strong><br />
          Our company acts as an intermediary between customers and providers, facilitating the communication and processing of refund requests. We do not have direct control over the approval or denial of such requests, as this is solely at the discretion of the respective providers. Customers are encouraged to familiarize themselves with the terms and conditions of the specific providers offering the services.
        </Typography>
      </Container>
    </>
  );
};

export default RefundPolicy;
