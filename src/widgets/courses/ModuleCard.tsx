"use client";

import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { CourseModule } from "@/models/course";
import { useState } from "react";
import { Icon } from "@iconify/react";

export const ModuleCard = ({
  module,
  index,
  isLast,
}: {
  module: CourseModule;
  index: number;
  isLast: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lessonOpen, setLessonOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Stack direction={"column"} spacing={"21px"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <Stack direction={"row"} spacing={"19px"}>
            <Box
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                height: "88px",
                width: "138px",
              }}
            >
              <Image
                src={module.image}
                alt={module.title}
                width={138}
                height={88}
              />
            </Box>
            <Stack
              direction={"column"}
              spacing={"2px"}
              justifyContent={"center"}
            >
              <Typography variant="subtitle1" textTransform={"uppercase"}>
                Module {index + 1} | {module.lessons.length} lessons
              </Typography>
              <Typography variant="body1" color={"text.secondary"}>
                {module.title}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} spacing={"10px"}>
            <Icon
              icon={isOpen ? "mdi:expand-less" : "mdi:expand-more"}
              color={"#323232"}
              fontSize={"24px"}
            />
          </Stack>
        </Stack>
        {isOpen && (
          <>
            <Stack direction={"column"} spacing={"20px"}>
              <Typography variant="body2">{module.description}</Typography>
              <Button
                variant="text"
                color="primary"
                sx={{ width: "fit-content" }}
                onClick={() => setLessonOpen(!lessonOpen)}
              >
                <Stack direction={"row"} spacing={"10px"}>
                  <Icon
                    icon={lessonOpen ? "mdi:chevron-up" : "mdi:chevron-right"}
                    color={"#323232"}
                    fontSize={"24px"}
                  />
                  {lessonOpen ? "Hide Module Content" : "Show Module Content"}
                </Stack>
              </Button>
              {lessonOpen &&
                module.lessons.map((lesson) => {
                  return (
                    <Stack
                      direction={"row"}
                      spacing={"20px"}
                      alignItems={"center"}
                      key={lesson.id}
                    >
                      <Avatar
                        sx={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "#FAE4DB",
                        }}
                      >
                        <Icon
                          icon={
                            lesson.type === "video"
                              ? "mdi:play"
                              : lesson.type === "assessment"
                              ? "mdi:check"
                              : lesson.type === "hands_on"
                              ? "mdi:hand-coin"
                              : "mdi:file"
                          }
                          color={"#323232"}
                          fontSize={"18px"}
                        />
                      </Avatar>
                      <Stack
                        direction={"column"}
                        spacing={"0.01px"}
                        justifyContent={"center"}
                      >
                        <Typography variant="subtitle1">
                          {lesson.title}
                        </Typography>
                        <Typography variant="subtitle2">
                          {lesson.duration}
                        </Typography>
                      </Stack>
                    </Stack>
                  );
                })}
            </Stack>
          </>
        )}
        {!isLast && <Divider flexItem />}
      </Stack>
    </>
  );
};
