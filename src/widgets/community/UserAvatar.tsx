"use client";

import { Avatar } from "@mui/material";

interface UserAvatarProps {
  profileImage?: string;
  name?: string;
  size?: number;
}

export default function UserAvatar({
  profileImage,
  name,
  size = 40,
}: UserAvatarProps) {
  return (
    <Avatar
      src={profileImage}
      sx={{ width: size, height: size, fontSize: size / 2 }}
    >
      {name && name.length > 0 ? name.charAt(0).toUpperCase() : ""}
    </Avatar>
  );
}
