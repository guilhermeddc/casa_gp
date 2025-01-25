"use client";

import React, { useCallback } from "react";

import { Skeleton } from "@mui/material";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Control, useController } from "react-hook-form";

interface IProps {
  name: string;
  label: string;
  control: Control<any>;
  isLoading?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  helperText?: string;
  disabled?: boolean;
}

export const DateTimePicker: React.FC<IProps> = ({
  name,
  label,
  control,
  isLoading,
  skeletonWidth,
  skeletonHeight = 56,
  helperText,
  disabled = false,
}) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (date: Date | null) => {
      onChange(date);
    },
    [onChange]
  );

  if (isLoading)
    return <Skeleton height={skeletonHeight} width={skeletonWidth ?? "100%"} />;

  return (
    <MuiDateTimePicker
      label={label}
      value={value}
      onChange={handleChange}
      inputRef={ref}
      disabled={disabled}
      slotProps={{
        textField: {
          error: !!error,
          helperText: helperText || error?.message,
          fullWidth: true,
          variant: "outlined",
        },
      }}
    />
  );
};
