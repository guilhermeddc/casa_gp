"use client";

import { WhatsApp } from "@mui/icons-material";
import { Fab, useTheme, Zoom } from "@mui/material";
import React from "react";

export const FloatButton: React.FC = () => {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Zoom in timeout={transitionDuration} unmountOnExit>
      <Fab
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        aria-label="WhatsApp"
        color="secondary"
        href="https://wa.me/559999999999"
        target="_blank"
      >
        <WhatsApp fontSize="large" />
      </Fab>
    </Zoom>
  );
};
