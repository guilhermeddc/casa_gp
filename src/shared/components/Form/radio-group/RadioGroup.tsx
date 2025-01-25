"use client";

import React, { useCallback } from "react";
import {
  FormControl,
  Skeleton,
  FormControlProps,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

type TVRadioGroupProps<T extends string | number = string | number> = {
  name: string;
  control: Control<any>;
  label?: React.ReactNode;
  row?: boolean;
  isBoolean?: boolean;
  isLoading?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  formControlProps?: FormControlProps;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: T) => void;
  options: {
    value: T;
    label?: string;
    disabled?: boolean;
  }[];
};

export function RadioGroup<T extends string | number = string | number>({
  name,
  control,
  row = false,
  isBoolean = false,
  label,
  options,
  formControlProps,
  isLoading,
  skeletonWidth,
  skeletonHeight = 50,
  onChange,
}: TVRadioGroupProps<T>) {
  const {
    field: { onChange: onFieldChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: T) => {
      const newValue = isBoolean ? String(value) : value;
      onFieldChange(newValue);
      onChange?.(event, value);
    },
    [onFieldChange, isBoolean, onChange]
  );

  return (
    <FormControl
      margin="none"
      {...formControlProps}
      error={!!error}
      sx={
        row
          ? {
              display: "flex",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
            }
          : { p: 2 }
      }
    >
      {label && <FormLabel required>{label}</FormLabel>}

      {isLoading ? (
        <Skeleton
          height={skeletonHeight}
          width={skeletonWidth ?? "100%"}
          sx={{ marginTop: 2 }}
        />
      ) : (
        <MuiRadioGroup
          row={row}
          value={String(value ?? "")}
          data-testid={name}
          onChange={(e) => handleChange(e, e.target.value as T)}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              name={name}
              data-testid={name}
              control={<Radio />}
              value={option.value}
              label={option.label || ""}
              disabled={option.disabled}
            />
          ))}
        </MuiRadioGroup>
      )}

      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
