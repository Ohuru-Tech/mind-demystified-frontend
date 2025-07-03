"use client";

import { getProfile } from "@/app/actions/profile";
import { useState, useEffect } from "react";
import CommunityFeed from "@/widgets/community/CommunityFeed";
import { CommunityFeedLoadingState } from "@/widgets/common/LoadingState";
import { ErrorState, EmptyState } from "@/widgets/common/ErrorState";
import { useSnackbar } from "@/contexts/SnackbarContext";

export default function CommunityPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showError } = useSnackbar();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getProfile();
        if (result.success && result.data) {
          setProfile(result.data);
        } else {
          setError(result.error || "Failed to load profile");
          showError(result.error || "Failed to load profile");
        }
      } catch (error) {
        const errorMessage = "Failed to fetch profile";
        setError(errorMessage);
        showError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <CommunityFeedLoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={() => {
          const fetchProfile = async () => {
            try {
              setLoading(true);
              setError(null);
              const result = await getProfile();
              if (result.success && result.data) {
                setProfile(result.data);
              } else {
                setError(result.error || "Failed to load profile");
                showError(result.error || "Failed to load profile");
              }
            } catch (error) {
              const errorMessage = "Failed to fetch profile";
              setError(errorMessage);
              showError(errorMessage);
            } finally {
              setLoading(false);
            }
          };
          fetchProfile();
        }}
        variant="card"
      />
    );
  }

  if (!profile) {
    return (
      <EmptyState
        title="Profile not found"
        description="Unable to load your profile information"
        variant="card"
      />
    );
  }

  return <CommunityFeed profile={profile} />;
}
