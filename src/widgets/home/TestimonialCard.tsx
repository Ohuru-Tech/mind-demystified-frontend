import { Testimonial } from "@/models/testimonial";
import { Box, Stack, Typography } from "@mui/material";

export const TestimonialCard = ({
  testimonial,
}: {
  testimonial: Testimonial;
}) => {
  return (
    <Stack
      height={"427px"}
      width={"316px"}
      direction={"column"}
      spacing={"10px"}
      justifyContent={"flex-end"}
      sx={{
        borderRadius: "20px",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          cursor: "pointer",
          "& .background-image": {
            filter: "blur(40px)",
          },
          "& .preview-text": {
            display: "none",
          },
          "& .full-text": {
            display: "block",
          },
        },
      }}
    >
      <Box
        className="background-image"
        sx={{
          position: "absolute",
          borderRadius: "20px",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${testimonial.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "all 0.3s ease-in-out",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
            zIndex: 1,
            borderRadius: "20px",
          },
        }}
      />
      <Stack
        direction={"column"}
        spacing={"10px"}
        fontSize={"18px"}
        sx={{
          position: "relative",
          zIndex: 2,
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <Typography variant={"h5"} color={"primary.contrastText"}>
          {testimonial.name}
        </Typography>
        <Typography
          className="preview-text"
          variant={"body2"}
          color={"primary.contrastText"}
        >
          {testimonial.highlight &&
            testimonial.highlight.split(" ").slice(0, 6).join(" ") +
              (testimonial.highlight.split(" ").length > 6 ? "..." : "")}
        </Typography>
        <Stack direction={"column"} spacing={"20px"}>
          <Typography
            className="full-text"
            variant={"body2"}
            fontWeight={"bold"}
            color={"primary.contrastText"}
            sx={{ display: "none" }}
          >
            {testimonial.designation}
          </Typography>
          <Typography
            className="full-text"
            variant={"body2"}
            color={"primary.contrastText"}
            sx={{ display: "none" }}
          >
            &quot;{testimonial.text}&quot;
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
