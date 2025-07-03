"use client";

import { CourseAccessDetail } from "@/models/course";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  Fab,
} from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";

export const drawerWidth = 380;

export const CourseAccessDrawer = ({
  course,
}: {
  course: CourseAccessDetail;
}) => {
  const [courseModuleExpanded, setCourseModuleExpanded] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Mobile Floating Action Button */}
      <Box
        sx={{
          display: { xs: "block", lg: "none" },
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1200,
        }}
      >
        <Fab
          color="primary"
          onClick={() => setMobileDrawerOpen(true)}
          sx={{
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <Icon icon="mdi:menu" width={24} height={24} />
        </Fab>
      </Box>

      {/* Mobile Overlay Drawer */}
      <Drawer
        variant="temporary"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: "400px",
            borderRightColor: "divider",
            borderRightWidth: "1px",
            borderRightStyle: "solid",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", padding: "20px" }}>
          <Stack direction={"column"} spacing={"12px"}>
            <Stack
              direction={"row"}
              spacing={"12px"}
              sx={{
                pt: 1,
                pb: 1,
                cursor: "pointer",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
                alignItems: "center",
              }}
              onClick={() => setMobileDrawerOpen(false)}
            >
              <Icon
                icon={"mdi:close"}
                width={18}
                height={18}
                color={"#323232"}
              />
              <Typography variant="body2">Close Menu</Typography>
            </Stack>
            <Box
              sx={{
                width: "100%",
                height: "200px",
                overflow: "hidden",
                borderRadius: "10px",
                borderColor: "divider",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <Image
                src={course.image}
                alt={course.title}
                width={400}
                height={200}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            <Typography variant="drawerHeading">{course.title}</Typography>
          </Stack>
          <List sx={{ mt: "20px" }}>
            <ListItemButton
              onClick={() => setCourseModuleExpanded(!courseModuleExpanded)}
            >
              <ListItemIcon>
                <Icon
                  icon={
                    courseModuleExpanded
                      ? "mingcute:down-fill"
                      : "mingcute:right-fill"
                  }
                  width={24}
                  height={24}
                />
              </ListItemIcon>
              <Typography variant="drawerHeading">Course Material</Typography>
            </ListItemButton>
            <Collapse in={courseModuleExpanded}>
              <List component="div" disablePadding>
                {course.modules.map((module) => (
                  <ListItemButton
                    selected={
                      pathname.split("/")[pathname.split("/").length - 1] ===
                      module.slug
                    }
                    key={module.id}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      router.push(
                        `/course/${course.slug}/access/modules/${module.slug}`
                      );
                      setMobileDrawerOpen(false);
                    }}
                  >
                    <ListItemIcon>
                      <Icon
                        icon={
                          module.completed
                            ? "lets-icons:check-fill"
                            : "material-symbols:circle"
                        }
                        color={module.completed ? "#00BA00" : "#D9D9D9"}
                        width={24}
                        height={24}
                      />
                    </ListItemIcon>
                    <ListItemText primary={`Module ${module.order}`} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>

      {/* Desktop Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            width: "380px",
            overflow: "hidden",
            zIndex: 1000,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", padding: "50px" }}>
          <Stack direction={"column"} spacing={"12px"}>
            <Box
              sx={{
                width: "207px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "10px",
                borderColor: "divider",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <Image
                src={course.image}
                alt={course.title}
                width={207}
                height={200}
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </Box>
            <Typography variant="drawerHeading">{course.title}</Typography>
          </Stack>
          <List sx={{ mt: "20px" }}>
            <ListItemButton
              onClick={() => setCourseModuleExpanded(!courseModuleExpanded)}
            >
              <ListItemIcon>
                <Icon
                  icon={
                    courseModuleExpanded
                      ? "mingcute:down-fill"
                      : "mingcute:right-fill"
                  }
                  width={24}
                  height={24}
                />
              </ListItemIcon>
              <Typography variant="drawerHeading">Course Material</Typography>
            </ListItemButton>
            <Collapse in={courseModuleExpanded}>
              <List component="div" disablePadding>
                {course.modules.map((module) => (
                  <ListItemButton
                    selected={
                      pathname.split("/")[pathname.split("/").length - 1] ===
                      module.slug
                    }
                    key={module.id}
                    sx={{ pl: 4 }}
                    onClick={() =>
                      router.push(
                        `/course/${course.slug}/access/modules/${module.slug}`
                      )
                    }
                  >
                    <ListItemIcon>
                      <Icon
                        icon={
                          module.completed
                            ? "lets-icons:check-fill"
                            : "material-symbols:circle"
                        }
                        color={module.completed ? "#00BA00" : "#D9D9D9"}
                        width={24}
                        height={24}
                      />
                    </ListItemIcon>
                    <ListItemText primary={`Module ${module.order}`} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
            {course.completed && (
              <ListItemButton sx={{ mt: "12px" }}>
                <Typography variant="drawerHeading">Certificate</Typography>
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
