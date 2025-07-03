import { Box, Container, Typography, Card } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - Mind Demystified",
  description:
    "Read our terms and conditions for using Mind Demystified's services, courses, and therapy sessions.",
};

export default function TermsConditions() {
  return (
    <Box
      sx={{ py: { xs: 4, md: 8 }, minHeight: "100vh", mt: { xs: 12.5, md: 4 } }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 700 }}>
          Terms & Conditions
        </Typography>

        <Card
          sx={{
            p: { xs: 3, md: 6 },
            mb: 4,
            borderRadius: "20px",
            borderColor: "divider",
            borderWidth: "1px",
            borderStyle: "solid",
            elevation: 0,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Last updated: January 2025
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            These Terms and Conditions govern your use of Mind Demystified's
            website and services. By accessing or using our services, you agree
            to be bound by these terms.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
            Acceptance of Terms
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement. If you do not
            agree to abide by the above, please do not use this service.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
            Use License
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            Permission is granted to temporarily download one copy of the
            materials on Mind Demystified's website for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a
            transfer of title.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
            Course Access
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            Course access is granted for the duration specified at the time of
            purchase. Access may be revoked if these terms are violated. Course
            content is for personal use only and may not be shared or
            distributed.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
            Therapy Sessions
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            Therapy sessions are provided by qualified professionals. While we
            strive to provide quality services, we cannot guarantee specific
            outcomes. Sessions are subject to cancellation policies and
            rescheduling fees.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
            Payment Terms
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            All payments must be made in full at the time of purchase. Prices
            are subject to change without notice. Payment processing is handled
            by secure third-party providers.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
            Intellectual Property
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            All content on this website, including but not limited to text,
            graphics, logos, and course materials, is the property of Mind
            Demystified and is protected by copyright laws.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
            Limitation of Liability
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            Mind Demystified shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your use
            of our services.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>
            Contact Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            If you have any questions about these Terms and Conditions, please
            contact us at legal@minddemystified.com
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}
