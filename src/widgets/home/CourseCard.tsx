import { CourseList } from "@/models/course";
import {
  alpha,
  Avatar,
  Box,
  Card,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const CourseCard = ({ course }: { course: CourseList }) => {
  return (
    <Card
      sx={{
        width: "360px",
        borderRadius: "20px",
        borderColor: alpha("#323232", 0.24),
        borderWidth: "1px",
        borderStyle: "solid",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        },
      }}
      component={Link}
      href={`/courses/${course.slug}`}
      elevation={0}
    >
      <Stack direction={"column"} sx={{ padding: "16px" }} spacing={"16px"}>
        <Box
          sx={{
            width: "328px",
            height: "160px",
            borderRadius: "12px",
            position: "relative",
            borderWidth: "1px",
            borderColor: alpha("#323232", 0.24),
            borderStyle: "solid",
          }}
        >
          <Image
            src={course.image}
            alt={course.title}
            width={328}
            height={160}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "12px",
            }}
          />
          {/* <Stack
            direction={"row"}
            spacing={1}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              width: "86px",
              position: "absolute",
              bottom: "-1px",
              right: "-1px",
              backgroundColor: "#fff",
              borderTopLeftRadius: "12px",
              padding: "6px 6px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: alpha("#323232", 0.24),
              borderBottom: "none",
              borderRight: "none",
            }}
          >
            <Typography variant="body2">
              {`$`} {course.price}
            </Typography>
          </Stack> */}
        </Box>
        <Stack direction={"column"} spacing={"36px"}>
          <Stack direction={"column"} spacing={"5px"}>
            <Typography textAlign={"left"} variant="h6">
              {course.title}
            </Typography>
            <Typography textAlign={"left"} variant="body2">
              {course.byline}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            sx={{
              flexWrap: "wrap",
              rowGap: "10px",
            }}
          >
            {course.tags.map((tag) => {
              return (
                <Chip
                  variant="outlined"
                  sx={{
                    marginLeft: "0px",
                    marginRight: "6px",
                  }}
                  label={tag.name}
                  key={tag.slug}
                />
              );
            })}
          </Stack>
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
                    variant={"body2"}
                    fontSize={14}
                    key={instructor.id}
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
    </Card>
  );
};
