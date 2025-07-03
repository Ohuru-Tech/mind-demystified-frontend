"use client";

import { useState } from "react";
import {
  Button,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { UserProfile } from "@/models/profile";
import {
  sendFollowRequestAction,
  acceptFollowRequestAction,
  rejectFollowRequestAction,
  unfollowUserAction,
  removeFollowerAction,
} from "@/app/actions/community";

interface FollowButtonProps {
  user: UserProfile;
  onFollowStatusChange?: () => void;
  showAcceptReject?: boolean;
  showUnfollow?: boolean;
  showRemoveFollower?: boolean;
  isFollowersList?: boolean; // To distinguish between followers and following lists
}

export const FollowButton = ({
  user,
  onFollowStatusChange,
  showAcceptReject = false,
  showUnfollow = false,
  showRemoveFollower = false,
  isFollowersList = false,
}: FollowButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [followStatus, setFollowStatus] = useState<{
    isFollowing: boolean;
    isRequested: boolean;
    hasRequestFromMe: boolean;
  }>({
    isFollowing: user.is_following || false,
    isRequested: false, // This would need to be fetched from notifications
    hasRequestFromMe: user.is_follow_requested || false, // Use server-side field
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFollow = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await sendFollowRequestAction(user.id);
      if (result.success) {
        setFollowStatus((prev) => ({
          ...prev,
          hasRequestFromMe: true,
        }));
        onFollowStatusChange?.();
      } else {
        console.error("Failed to send follow request:", result.error);
      }
    } catch (error) {
      console.error("Error sending follow request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await acceptFollowRequestAction(user.id);
      if (result.success) {
        setFollowStatus((prev) => ({
          ...prev,
          isFollowing: true,
          isRequested: false,
        }));
        onFollowStatusChange?.();
      } else {
        console.error("Failed to accept follow request:", result.error);
      }
    } catch (error) {
      console.error("Error accepting follow request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await rejectFollowRequestAction(user.id);
      if (result.success) {
        setFollowStatus((prev) => ({
          ...prev,
          isRequested: false,
        }));
        onFollowStatusChange?.();
      } else {
        console.error("Failed to reject follow request:", result.error);
      }
    } catch (error) {
      console.error("Error rejecting follow request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await unfollowUserAction(user.id);
      if (result.success) {
        setFollowStatus((prev) => ({
          ...prev,
          isFollowing: false,
        }));
        onFollowStatusChange?.();
      } else {
        console.error("Failed to unfollow user:", result.error);
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFollower = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await removeFollowerAction(user.id);
      if (result.success) {
        // This will likely remove the user from the list, so call the callback
        onFollowStatusChange?.();
      } else {
        console.error("Failed to remove follower:", result.error);
      }
    } catch (error) {
      console.error("Error removing follower:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Priority 1: Show accept/reject buttons if action is requested (incoming follow request)
  if (user.action_requested === true || showAcceptReject) {
    if (isMobile) {
      return (
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={handleAccept}
            disabled={isLoading}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              "&:disabled": {
                backgroundColor: "grey.300",
                color: "grey.500",
              },
              width: 40,
              height: 40,
            }}
          >
            <Icon icon="mdi:check" width={20} height={20} />
          </IconButton>
          <IconButton
            onClick={handleReject}
            disabled={isLoading}
            sx={{
              borderColor: "error.main",
              color: "error.main",
              border: "1px solid",
              "&:hover": {
                borderColor: "error.dark",
                backgroundColor: "error.light",
                color: "white",
              },
              "&:disabled": {
                borderColor: "grey.300",
                color: "grey.500",
              },
              width: 40,
              height: 40,
            }}
          >
            <Icon icon="mdi:close" width={20} height={20} />
          </IconButton>
        </Stack>
      );
    }

    return (
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          size="small"
          onClick={handleAccept}
          disabled={isLoading}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            "&:disabled": {
              backgroundColor: "grey.300",
              color: "grey.500",
            },
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            px: 2,
            py: 0.5,
          }}
        >
          Accept
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleReject}
          disabled={isLoading}
          sx={{
            borderColor: "error.main",
            color: "error.main",
            "&:hover": {
              borderColor: "error.dark",
              backgroundColor: "error.light",
              color: "white",
            },
            "&:disabled": {
              borderColor: "grey.300",
              color: "grey.500",
            },
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            px: 2,
            py: 0.5,
          }}
        >
          Reject
        </Button>
      </Stack>
    );
  }

  // Priority 2: Show "Following" if already following
  if (followStatus.isFollowing) {
    if (isMobile && showUnfollow) {
      return (
        <IconButton
          onClick={isFollowersList ? handleRemoveFollower : handleUnfollow}
          disabled={isLoading}
          sx={{
            borderColor: "error.main",
            color: "error.main",
            border: "1px solid",
            "&:hover": {
              borderColor: "error.dark",
              backgroundColor: "error.light",
              color: "white",
            },
            "&:disabled": {
              borderColor: "grey.300",
              color: "grey.500",
            },
            width: 40,
            height: 40,
          }}
        >
          <Icon icon="mdi:account-remove" width={20} height={20} />
        </IconButton>
      );
    }

    return (
      <Button
        variant="outlined"
        size="small"
        onClick={
          showUnfollow
            ? isFollowersList
              ? handleRemoveFollower
              : handleUnfollow
            : undefined
        }
        disabled={isLoading || !showUnfollow}
        sx={{
          borderColor: "success.main",
          color: "success.main",
          "&:hover": showUnfollow
            ? {
                borderColor: "error.main",
                backgroundColor: "error.light",
                color: "white",
              }
            : {},
          "&:disabled": {
            borderColor: "grey.300",
            color: "grey.500",
          },
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          px: 2,
          py: 0.5,
        }}
      >
        <Icon
          icon={showUnfollow ? "mdi:account-remove" : "mdi:check"}
          width={16}
          height={16}
          style={{ marginRight: 4 }}
        />
        {showUnfollow ? (isFollowersList ? "Remove" : "Unfollow") : "Following"}
      </Button>
    );
  }

  // Priority 3: Show "Remove Follower" if showRemoveFollower is true and we're not following them
  if (showRemoveFollower && !user.is_following) {
    if (isMobile) {
      return (
        <IconButton
          onClick={handleRemoveFollower}
          disabled={isLoading}
          sx={{
            borderColor: "error.main",
            color: "error.main",
            border: "1px solid",
            "&:hover": {
              borderColor: "error.dark",
              backgroundColor: "error.light",
              color: "white",
            },
            "&:disabled": {
              borderColor: "grey.300",
              color: "grey.500",
            },
            width: 40,
            height: 40,
          }}
        >
          <Icon icon="mdi:account-remove" width={20} height={20} />
        </IconButton>
      );
    }

    return (
      <Button
        variant="outlined"
        size="small"
        onClick={handleRemoveFollower}
        disabled={isLoading}
        sx={{
          borderColor: "error.main",
          color: "error.main",
          "&:hover": {
            borderColor: "error.dark",
            backgroundColor: "error.light",
            color: "white",
          },
          "&:disabled": {
            borderColor: "grey.300",
            color: "grey.500",
          },
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          px: 2,
          py: 0.5,
        }}
      >
        <Icon
          icon="mdi:account-remove"
          width={16}
          height={16}
          style={{ marginRight: 4 }}
        />
        Remove Follower
      </Button>
    );
  }

  // Priority 4: Show "Requested" if we've sent a follow request
  if (user.is_follow_requested || followStatus.hasRequestFromMe) {
    if (isMobile) {
      return (
        <IconButton
          disabled
          sx={{
            borderColor: "warning.main",
            color: "warning.main",
            border: "1px solid",
            width: 40,
            height: 40,
          }}
        >
          <Icon icon="mdi:clock-outline" width={20} height={20} />
        </IconButton>
      );
    }

    return (
      <Button
        variant="outlined"
        size="small"
        disabled
        sx={{
          borderColor: "warning.main",
          color: "warning.main",
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          px: 2,
          py: 0.5,
        }}
      >
        Requested
      </Button>
    );
  }

  // Default: Show "Follow" button
  if (isMobile) {
    return (
      <IconButton
        onClick={handleFollow}
        disabled={isLoading}
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
          "&:disabled": {
            backgroundColor: "grey.300",
            color: "grey.500",
          },
          width: 40,
          height: 40,
        }}
      >
        <Icon icon="mdi:plus" width={20} height={20} />
      </IconButton>
    );
  }

  return (
    <Button
      variant="contained"
      size="small"
      onClick={handleFollow}
      disabled={isLoading}
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        "&:hover": {
          backgroundColor: "primary.dark",
        },
        "&:disabled": {
          backgroundColor: "grey.300",
          color: "grey.500",
        },
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 600,
        px: 2,
        py: 0.5,
      }}
    >
      <Icon icon="mdi:plus" width={16} height={16} style={{ marginRight: 4 }} />
      Follow
    </Button>
  );
};
