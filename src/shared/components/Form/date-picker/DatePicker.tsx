"use client";

import React, { useCallback } from "react";

import { Skeleton } from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Control, useController } from "react-hook-form";

interface IProps {
  name: string;
  label: string;
  control: Control<any>;
  isLoading?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  helperText?: string;
  onChange?(date: Date | null): void;
  disabled?: boolean;
}

export const DatePicker: React.FC<IProps> = ({
  name,
  label,
  control,
  isLoading,
  skeletonWidth,
  skeletonHeight = 56,
  helperText,
  onChange,
  disabled = false,
}) => {
  const {
    field: { onChange: onFieldChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (date: Date | null) => {
      onFieldChange(date);
      onChange?.(date);
    },
    [onFieldChange, onChange]
  );

  if (isLoading)
    return <Skeleton height={skeletonHeight} width={skeletonWidth ?? "100%"} />;

  return (
    <MuiDatePicker
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
