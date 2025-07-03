"use client";

import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Button,
  Divider,
  Container,
  Tabs,
  Tab,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CourseDetail } from "@/models/course";

export const CourseAppBar = ({ course }: { course: CourseDetail }) => {
  const [value, setValue] = useState("1");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const about = document.getElementById("about");
    const modules = document.getElementById("modules");
    const testimonials = document.getElementById("testimonials");
    const community = document.getElementById("community");
    const courseFAQ = document.getElementById("courseFAQ");

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (entry.target.id === "about") {
          setVisible(true);
          setValue("1");
        }
        if (entry.target.id === "modules") {
          setValue("2");
        }
        if (entry.target.id === "testimonials") {
          setValue("3");
        }
        if (entry.target.id === "community") {
          setVisible(true);
          setValue("4");
        }
        if (entry.target.id === "hero") {
          setVisible(false);
        }
        if (entry.target.id === "courseFAQ") {
          setVisible(false);
        }
      }
    });

    if (about) {
      observer.observe(about);
    }
    if (modules) {
      observer.observe(modules);
    }
    if (testimonials) {
      observer.observe(testimonials);
    }
    if (testimonials) {
      observer.observe(testimonials);
    }
    if (community) {
      observer.observe(community);
    }
    if (hero) {
      observer.observe(hero);
    }
    if (courseFAQ) {
      observer.observe(courseFAQ);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <AppBar
        sx={{
          backdropFilter: "blur(200px)",
          backgroundColor: "rgba(250, 249, 246, 0)",
          paddingTop: "10px",
          paddingBottom: "10px",
          visibility: { xs: "hidden", md: visible ? "visible" : "hidden" },
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <Container maxWidth={"lg"}>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
            >
              <Stack direction={"column"} spacing={"16px"} width={"100%"}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography variant={"h4"}>{course.title}</Typography>
                  <Button variant={"contained"}>Enroll Now</Button>
                </Stack>
                <Divider flexItem />
                <Stack direction={"row"} spacing={"10px"}>
                  <Tabs
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                      const idToLook = {
                        "1": "about",
                        "2": "modules",
                        "3": "testimonials",
                        "4": "community",
                      };
                      const element = document.getElementById(
                        idToLook[newValue as keyof typeof idToLook]
                      );
                      if (element) {
                        let offset = 200;

                        if (
                          idToLook[newValue as keyof typeof idToLook] ===
                          "community"
                        ) {
                          offset = 300;
                        }

                        if (
                          idToLook[newValue as keyof typeof idToLook] ===
                          "about"
                        ) {
                          offset = 650;
                        }

                        const elementTop =
                          element.getBoundingClientRect().top + window.scrollY;

                        window.scrollTo({
                          top: elementTop - offset,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    <Tab label="About" value="1" />
                    <Tab label="Modules" value="2" />
                    <Tab label="Testimonials" value="3" />
                    <Tab label="Community" value="4" />
                  </Tabs>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};
