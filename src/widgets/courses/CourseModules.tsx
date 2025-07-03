import { Stack, Typography } from "@mui/material";
import { CourseDetail } from "@/models/course";
import { ModuleCard } from "./ModuleCard";

export const CourseModules = ({ course }: { course: CourseDetail }) => {
  return (
    <>
      <Stack
        direction={"column"}
        spacing={"50px"}
        mt={"220px"}
        alignItems={"center"}
      >
        <Typography id="modules" variant="h4" textAlign={"center"}>
          Modules
        </Typography>
        <Stack
          direction={"column"}
          spacing={"24px"}
          sx={{
            backgroundColor: "white",
            borderRadius: "20px",
            width: "100%",
            paddingLeft: { xs: "20px", md: "44px", lg: "44px" },
            paddingRight: { xs: "20px", md: "44px", lg: "44px" },
            paddingTop: { xs: "20px", md: "44px", lg: "44px" },
            paddingBottom: { xs: "20px", md: "44px", lg: "44px" },
          }}
        >
          {course.modules.map((module, index) => {
            return (
              <ModuleCard
                module={module}
                index={index}
                key={module.id}
                isLast={index === course.modules.length - 1}
              />
            );
          })}
        </Stack>
      </Stack>
    </>
  );
};
