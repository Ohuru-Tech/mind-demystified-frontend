import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Mind Demystified",
  description:
    "Learn how we protect your privacy and handle your personal information at Mind Demystified.",
};

export default function PrivacyPolicy() {
  return (
    <Box
      sx={{ py: { xs: 4, md: 8 }, minHeight: "100vh", mt: { xs: 12.5, md: 4 } }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 700 }}>
          Privacy Policy
        </Typography>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Last updated: January 2025
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          At Mind Demystified, we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your
          information when you visit our website or use our services.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          Information We Collect
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          We collect information you provide directly to us, such as when you
          create an account, purchase courses, book therapy sessions, or contact
          us. This may include your name, email address, phone number, payment
          information, and any other information you choose to provide.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          We use the information we collect to provide, maintain, and improve
          our services, process transactions, send you technical notices and
          support messages, and communicate with you about products, services,
          and events.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          Information Sharing
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent, except as described in this
          policy or as required by law.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          Data Security
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          We implement appropriate security measures to protect your personal
          information against unauthorized access, alteration, disclosure, or
          destruction.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          Your Rights
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          You have the right to access, update, or delete your personal
          information. You may also opt out of certain communications from us.
          Contact us to exercise these rights.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          If you have any questions about this Privacy Policy, please contact us
          at privacy@minddemystified.com
        </Typography>
      </Container>
    </Box>
  );
}
