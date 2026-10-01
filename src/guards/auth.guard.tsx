"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";
import { useCurrentUser } from "@/hooks";
import { Loader2 } from "lucide-react";

export interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user, setUser, logout } = useAuthStore();
  const router = useRouter();
  const {
    data: serverUser,
    isError,
    isLoading: isUserFetching,
  } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Sync fresh server user data to auth store
  useEffect(() => {
    if (serverUser) {
      setUser(serverUser);
    }
  }, [serverUser, setUser]);

  // Handle server-side session expiry or invalidation
  useEffect(() => {
    if (isError && !isLoading && !user) {
      logout();
    }
  }, [isError, isLoading, user, logout]);

  // Show loading spinner ONLY if initializing or user is not cached yet while fetching
  if (isLoading || (!user && isUserFetching)) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
        <p className="text-xs tracking-wider uppercase font-mono text-muted-foreground">
          Authenticating session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated && !user) {
    return null;
  }

  return <>{children}</>;
};
