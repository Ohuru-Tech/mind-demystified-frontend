import { CourseList } from "@/models/course";
import { Avatar, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

type CourseBundleCardProps = {
  course: CourseList;
  selectedPackage: boolean;
};

export const CourseBundleCard = ({
  course,
  selectedPackage,
}: CourseBundleCardProps) => {
  return (
    <Stack
      direction={"column"}
      spacing={"12px"}
      sx={{
        backgroundColor: "white",
        border: selectedPackage ? "1px solid #323232" : "1px solid #E0E0E0",
        pt: 2,
        pb: 2,
        px: 2,
        borderRadius: "12px",
        position: "relative",
        minWidth: { xs: "250px", sm: "280px", md: "300px" },
        maxWidth: { xs: "250px", sm: "280px", md: "300px" },
        flexShrink: 0,
      }}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <Stack
        direction={"column"}
        spacing={"12px"}
        alignItems={"center"}
        sx={{ height: "100%" }}
      >
        {!selectedPackage && (
          <Avatar
            src={course.image}
            sx={{
              width: { xs: "60px", md: "80px" },
              height: { xs: "60px", md: "80px" },
              objectFit: "cover",
              position: "absolute",
              top: { xs: "-30px", md: "-40px" },
              left: "50%",
              transform: "translateX(-50%)",
              objectPosition: "center",
              border: "2px solid #32323240",
            }}
          />
        )}
        {selectedPackage && (
          <Avatar
            sx={{
              width: { xs: "60px", md: "80px" },
              height: { xs: "60px", md: "80px" },
              objectFit: "cover",
              position: "absolute",
              top: { xs: "-30px", md: "-40px" },
              left: "50%",
              transform: "translateX(-50%)",
              objectPosition: "center",
              border: "2px solid #323232",
            }}
          >
            <Icon
              icon="mdi:tick-circle"
              color="#323232"
              height={80}
              width={80}
            />
          </Avatar>
        )}
        <Typography
          variant="h6"
          textAlign={"center"}
          mt={{ xs: "25px !important", md: "35px !important" }}
        >
          {course.title}
        </Typography>
        <Stack
          direction={"column"}
          spacing={{ xs: "16px", md: "20px" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          height={"100%"}
        >
          <Typography variant="body2" textAlign={"center"}>
            {course.byline}
          </Typography>
          <Stack direction={"column"} spacing={"8px"}>
            <Stack
              direction={"row"}
              spacing={"4px"}
              justifyContent="center"
              flexWrap="wrap"
            >
              <Stack direction={"row"} spacing={"-16px"}>
                {course.instructors.map((instructor) => {
                  return (
                    <Avatar
                      src={instructor.image}
                      key={instructor.id}
                      sx={{
                        width: { xs: 20, md: 24 },
                        height: { xs: 20, md: 24 },
                      }}
                    />
                  );
                })}
              </Stack>
              <Stack
                direction={"row"}
                spacing={"4px"}
                alignItems={"center"}
                flexWrap="wrap"
                justifyContent="center"
              >
                {course.instructors.map((instructor, index) => {
                  return (
                    <Typography
                      variant={"subtitle2"}
                      key={instructor.id}
                      textAlign={"center"}
                    >
                      {instructor.name.split(" ")[0]}
                      {index !== course.instructors.length - 1 && ","}
                    </Typography>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
