"use client";

import React, { useCallback } from "react";

import { Skeleton } from "@mui/material";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";
import { Control, useController } from "react-hook-form";

interface IProps {
  name: string;
  control: Control<any>;
  label: string;
  isLoading?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  helperText?: string;
}

export const TimePicker: React.FC<IProps> = ({
  name,
  control,
  label,
  isLoading,
  skeletonWidth,
  skeletonHeight = 56,
  helperText,
}) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (time: Date | null) => {
      onChange(time);
    },
    [onChange]
  );

  if (isLoading)
    return <Skeleton height={skeletonHeight} width={skeletonWidth ?? "100%"} />;

  return (
    <MuiTimePicker
      label={label}
      value={value}
      onChange={handleChange}
      inputRef={ref}
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
