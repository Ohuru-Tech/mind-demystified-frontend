import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - Mind Demystified",
  description:
    "Learn about our refund policy for courses and therapy sessions at Mind Demystified.",
};

export default function RefundPolicy() {
  return (
    <Box
      sx={{ py: { xs: 4, md: 8 }, minHeight: "100vh", mt: { xs: 12.5, md: 4 } }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 700 }}>
          Refund Policy
        </Typography>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Last updated: January 2025
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          At Mind Demystified, we want you to be completely satisfied with your
          purchase. This refund policy outlines the terms and conditions for
          refunds on our courses and therapy sessions.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          Course Refunds
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          We offer a 30-day money-back guarantee on all course purchases. If
          you're not satisfied with your course within 30 days of purchase, you
          may request a full refund. Refund requests must be submitted through
          our support system.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          Therapy Session Refunds
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Therapy sessions can be cancelled up to 24 hours before the scheduled
          time for a full refund. Cancellations made within 24 hours of the
          session may be subject to a cancellation fee. No-shows are not
          eligible for refunds.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          Refund Process
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Refunds will be processed within 5-10 business days and will be issued
          to the original payment method used for the purchase. You will receive
          an email confirmation once the refund has been processed.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          Non-Refundable Items
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          The following items are non-refundable: completed therapy sessions,
          course materials that have been downloaded or accessed for more than
          30 days, and any promotional or discounted items marked as
          non-refundable.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          How to Request a Refund
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          To request a refund, please contact our support team at
          support@minddemystified.com with your order number and reason for the
          refund request. We will review your request and respond within 2
          business days.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          Exceptions
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          We reserve the right to deny refund requests in cases of abuse, fraud,
          or violation of our terms of service. Each refund request is evaluated
          on a case-by-case basis.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          If you have any questions about our refund policy, please contact us
          at support@minddemystified.com
        </Typography>
      </Container>
    </Box>
  );
}
