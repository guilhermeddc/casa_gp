import React from "react";

import {
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
} from "@mui/material";

interface IProps extends ButtonProps {
  label?: string;
  variant?: "contained" | "outlined" | "text";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
  minWidth?: number;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<IProps> = ({
  label,
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  textTransform = "none",
  minWidth = 120,
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      variant={variant}
      disabled={disabled || loading}
      color={color}
      size={size}
      sx={{
        textTransform,
        minWidth: minWidth,
        maxHeight: 52,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        children ?? label
      )}
    </MuiButton>
  );
};
