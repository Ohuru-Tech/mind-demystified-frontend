import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { Icon } from "@iconify/react";
import NewsletterSubscription from "./NewsletterSubscription";

const socialLinks = [
  {
    href: "https://facebook.com/",
    icon: "mdi:facebook",
    label: "Facebook",
  },
  {
    href: "https://instagram.com/",
    icon: "mdi:instagram",
    label: "Instagram",
  },
  {
    href: "https://twitter.com/",
    icon: "mdi:twitter",
    label: "Twitter",
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        backgroundColor: "#323232",
        color: "#FAF9F6",
        pt: { xs: 6, md: 8 },
        pb: 0,
        mt: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, md: 10 } }}>
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          justifyContent="center"
          alignItems="flex-start"
        >
          {/* Logo and tagline */}
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{ textAlign: "center", mb: { xs: 4, md: 0 } }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Image
                src="/logoLight.svg"
                alt="Mind Demystified Logo"
                width={120}
                height={120}
                style={{ marginBottom: 12 }}
              />
              <Typography
                variant="body1"
                sx={{ color: "#FAF9F6", fontWeight: 400, mt: 2, fontSize: 16 }}
              >
                Find Your Inner Balance
              </Typography>
            </Box>
          </Grid>

          {/* Company links */}
          <Grid size={{ xs: 6, md: 2 }} sx={{ mb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 2, color: "#FAF9F6", fontSize: 18 }}
            >
              COMPANY
            </Typography>
            <Stack spacing={1}>
              <Typography
                variant="body2"
                component="a"
                href="/privacy-policy"
                sx={{
                  color: "#FAF9F6",
                  textDecoration: "none",
                  fontSize: 15,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Privacy policy
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href="/terms-conditions"
                sx={{
                  color: "#FAF9F6",
                  textDecoration: "none",
                  fontSize: 15,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Terms & Conditions
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href="/refund-policy"
                sx={{
                  color: "#FAF9F6",
                  textDecoration: "none",
                  fontSize: 15,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Refund policy
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href="/faq"
                sx={{
                  color: "#FAF9F6",
                  textDecoration: "none",
                  fontSize: 15,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                FAQ
              </Typography>
            </Stack>
          </Grid>

          {/* Info links */}
          <Grid size={{ xs: 6, md: 2 }} sx={{ mb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 2, color: "#FAF9F6", fontSize: 18 }}
            >
              INFO
            </Typography>
            <Stack spacing={1}>
              <Typography
                variant="body2"
                component="a"
                href="/"
                sx={{
                  color: "#FAF9F6",
                  textDecoration: "none",
                  fontSize: 15,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Home
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href="/courses"
                sx={{
                  color: "#FAF9F6",
                  textDecoration: "none",
                  fontSize: 15,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Courses
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href="/therapy"
                sx={{
                  color: "#FAF9F6",
                  textDecoration: "none",
                  fontSize: 15,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Therapy sessions
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href="/sessions"
                sx={{
                  color: "#FAF9F6",
                  textDecoration: "none",
                  fontSize: 15,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Book session
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href="/contact"
                sx={{
                  color: "#FAF9F6",
                  textDecoration: "none",
                  fontSize: 15,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Contact
              </Typography>
            </Stack>
          </Grid>

          {/* Connect with us */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 2, color: "#FAF9F6", fontSize: 18 }}
              >
                Connect with us
              </Typography>
              <NewsletterSubscription
                title=""
                description=""
                placeholder="Your email here..."
                buttonText="SUBMIT"
                variant="outlined"
                size="medium"
                fullWidth={false}
                sx={{
                  "& .MuiTextField-root": {
                    background: "#FAF9F6",
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      height: 40,
                    },
                    "& .MuiInputBase-input": {
                      color: "#323232",
                      fontSize: 16,
                      height: 40,
                      padding: "8px 16px",
                    },
                    width: { xs: "100%", sm: 220, md: 280 },
                  },
                  "& .MuiButton-root": {
                    height: 40,
                    color: "#323232",
                    background: "#FAF9F6",
                    border: "none",
                    fontWeight: 600,
                    fontSize: 16,
                    px: 3,
                    minWidth: 100,
                    boxShadow: 1,
                    "&:hover": { background: "#f0ede7" },
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 2, color: "#FAF9F6", fontSize: 18 }}
              >
                Follow us
              </Typography>
              <Box
                display="flex"
                gap={3}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                {socialLinks.map((link) => (
                  <IconButton
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    sx={{ background: "none", p: 0 }}
                  >
                    <Icon
                      icon={link.icon}
                      width={32}
                      height={32}
                      color="#FAF9F6"
                    />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          background: "#FAF9F6",
          color: "#323232",
          textAlign: "center",
          py: { xs: 2, md: 3 },
          mt: 6,
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 400, fontSize: 16 }}>
          Copyright © 2025. Mind Demystified. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
