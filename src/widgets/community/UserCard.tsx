"use client";

import {
  Avatar,
  Box,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { UserProfile } from "@/models/profile";
import { FollowButton } from "./FollowButton";

interface UserCardProps {
  user: UserProfile;
  onFollowStatusChange?: () => void;
  showFollowButton?: boolean;
  showAcceptReject?: boolean;
  showUnfollow?: boolean;
  showRemoveFollower?: boolean;
  isFollowersList?: boolean;
}

export const UserCard = ({
  user,
  onFollowStatusChange,
  showFollowButton = true,
  showAcceptReject = false,
  showUnfollow = false,
  showRemoveFollower = false,
  isFollowersList = false,
}: UserCardProps) => {
  const profileImage =
    user.profile.image || user.profile.social_image || "/person.png";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "12px",
        border: "1px solid #E0E0E0",
        padding: isMobile ? "12px" : "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 2 : 0,
      }}
    >
      <Stack
        direction="row"
        spacing={isMobile ? 1.5 : 2}
        alignItems="center"
        sx={{
          flex: 1,
          width: isMobile ? "100%" : "auto",
        }}
      >
        <Avatar
          sx={{
            width: isMobile ? 40 : 48,
            height: isMobile ? 40 : 48,
            border: "2px solid #E0E0E0",
          }}
        >
          <Image
            src={profileImage}
            alt={user.name}
            width={isMobile ? 40 : 48}
            height={isMobile ? 40 : 48}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </Avatar>

        <Stack
          direction="column"
          spacing={0.5}
          sx={{
            flex: 1,
            minWidth: 0, // Allow text to shrink
          }}
        >
          <Link
            href={`/community/profile/${user.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant={isMobile ? "body1" : "subtitle1"}
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
                fontSize: isMobile ? "14px" : "inherit",
              }}
            >
              {user.name}
            </Typography>
          </Link>

          {user.profile.bio && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: isMobile ? 1 : 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: isMobile ? "12px" : "inherit",
              }}
            >
              {user.profile.bio}
            </Typography>
          )}

          <Stack direction="row" spacing={isMobile ? 1 : 2}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: isMobile ? "11px" : "inherit" }}
            >
              {user.followers_count} followers
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: isMobile ? "11px" : "inherit" }}
            >
              {user.following_count} following
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {(showFollowButton || showAcceptReject || showRemoveFollower) && (
        <Box
          sx={{
            alignSelf: isMobile ? "flex-end" : "center",
            mt: isMobile ? 0 : 0,
          }}
        >
          <FollowButton
            user={user}
            onFollowStatusChange={onFollowStatusChange}
            showAcceptReject={showAcceptReject}
            showUnfollow={showUnfollow}
            showRemoveFollower={showRemoveFollower}
            isFollowersList={isFollowersList}
          />
        </Box>
      )}
    </Box>
  );
};
