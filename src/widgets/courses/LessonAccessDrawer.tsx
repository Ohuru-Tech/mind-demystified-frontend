"use client";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  Fab,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
import { CourseModuleAccess } from "@/models/course";
import { useState } from "react";

export const drawerWidth = 380;

export const LessonAccessDrawer = ({
  module,
  courseSlug,
  expanded = false,
  onExpand,
  onCollapse,
}: {
  module: CourseModuleAccess;
  courseSlug: string;
  expanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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
        <Box
          sx={{
            overflow: "auto",
            padding: "20px",
            height: "100%",
          }}
        >
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
            <Typography variant="drawerHeading">{module.title}</Typography>
          </Stack>
          <List>
            {module.lessons.map((lesson) => (
              <ListItemButton
                selected={pathname.includes(lesson.id)}
                key={lesson.id}
                onClick={() => {
                  router.push(
                    `/course/${courseSlug}/access/${module.slug}/lessons/${lesson.id}`
                  );
                  setMobileDrawerOpen(false);
                }}
              >
                <ListItemIcon>
                  <Icon
                    icon={
                      lesson.completed
                        ? "lets-icons:check-fill"
                        : "material-symbols:circle"
                    }
                    color={lesson.completed ? "#00BA00" : "#D9D9D9"}
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary={lesson.title} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Desktop Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            borderRightColor: "divider",
            borderRightWidth: "1px",
            borderRightStyle: "solid",
            width: expanded ? "380px" : "50px",
            transition: "width 0.3s ease-in-out",
            overflow: "hidden",
            zIndex: 1000,
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
            padding: expanded ? "50px" : "0px",
            ...(!expanded && {
              paddingTop: "50px",
            }),
          }}
        >
          {!expanded && (
            <Stack direction={"column"} spacing={"12px"} alignItems={"center"}>
              <IconButton onClick={() => onExpand?.()}>
                <Icon
                  icon={"mdi:menu"}
                  width={24}
                  height={24}
                  color={"#323232"}
                />
              </IconButton>
            </Stack>
          )}
          {expanded && (
            <>
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
                  onClick={() => {
                    onCollapse?.();
                  }}
                >
                  <Icon
                    icon={"mdi:chevron-left"}
                    width={18}
                    height={18}
                    color={"#323232"}
                  />
                  <Typography variant="body2">Collapse Menu</Typography>
                </Stack>
                <Typography variant="drawerHeading">{module.title}</Typography>
              </Stack>
              <List>
                {module.lessons.map((lesson) => (
                  <ListItemButton
                    selected={pathname.includes(lesson.id)}
                    key={lesson.id}
                    onClick={() =>
                      router.push(
                        `/course/${courseSlug}/access/${module.slug}/lessons/${lesson.id}`
                      )
                    }
                  >
                    <ListItemIcon>
                      <Icon
                        icon={
                          lesson.completed
                            ? "lets-icons:check-fill"
                            : "material-symbols:circle"
                        }
                        color={lesson.completed ? "#00BA00" : "#D9D9D9"}
                        width={24}
                        height={24}
                      />
                    </ListItemIcon>
                    <ListItemText primary={lesson.title} />
                  </ListItemButton>
                ))}
              </List>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};
