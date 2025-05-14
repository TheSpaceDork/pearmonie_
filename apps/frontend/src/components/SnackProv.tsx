"use client";

import { SnackbarProvider, useSnackbar, CustomContentProps } from "notistack";
import React, { forwardRef, useRef } from "react";

export const SnackProv = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      Components={{
        default: SwipeableSnackbarContent, // Add swipe-to-dismiss for the `default` variant
        success: SwipeableSnackbarContent, // Add swipe-to-dismiss for the `success` variant
        error: SwipeableSnackbarContent, // Add swipe-to-dismiss for the `error` variant
        warning: SwipeableSnackbarContent, // Add swipe-to-dismiss for the `warning` variant
        info: SwipeableSnackbarContent, // Add swipe-to-dismiss for the `info` variant
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

// Ref-forwarding component for swipeable snackbars
const SwipeableSnackbarContent = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, message, variant }, ref) => {
    const { closeSnackbar } = useSnackbar();
    const touchStartX = useRef<number>(0);

    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const distance = touchEndX - touchStartX.current;

      if (Math.abs(distance) > 50) {
        closeSnackbar(id); // Close the snackbar on swipe
      }
    };

    return (
      <div
        ref={ref}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          padding: "14px 16px",
          background:
            variant === "success"
              ? "#4caf50"
              : variant === "error"
              ? "#f44336"
              : variant === "warning"
              ? "#ff9800"
              : variant === "info"
              ? "#2196f3"
              : "#1976d2", // Default
          color: "#fff",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        className="!text-xs w-full md:w-[22rem]"
      >
        {message}
      </div>
    );
  }
);

SwipeableSnackbarContent.displayName = "SwipeableSnackbarContent"; // For clarity in dev tools
