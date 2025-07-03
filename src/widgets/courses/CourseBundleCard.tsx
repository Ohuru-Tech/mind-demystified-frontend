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
        minWidth: "300px",
        maxWidth: "300px",
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
              width: "80px",
              height: "80px",
              objectFit: "cover",
              position: "absolute",
              top: "-40px",
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
              width: "80px",
              height: "80px",
              objectFit: "cover",
              position: "absolute",
              top: "-40px",
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
        <Typography variant="h6" textAlign={"center"} mt={"35px !important"}>
          {course.title}
        </Typography>
        <Stack
          direction={"column"}
          spacing={"20px"}
          justifyContent={"space-between"}
          alignItems={"center"}
          height={"100%"}
        >
          <Typography variant="body2" textAlign={"center"}>
            {course.byline}
          </Typography>
          <Stack direction={"column"} spacing={"8px"}>
            <Stack direction={"row"} spacing={"4px"}>
              <Stack direction={"row"} spacing={"-16px"}>
                {course.instructors.map((instructor) => {
                  return <Avatar src={instructor.image} key={instructor.id} />;
                })}
              </Stack>
              <Stack direction={"row"} spacing={"4px"} alignItems={"center"}>
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
