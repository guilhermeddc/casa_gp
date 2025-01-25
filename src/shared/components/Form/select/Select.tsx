"use client";

import React, { useCallback } from "react";

import {
  Select as MuiSelect,
  SelectProps,
  FormHelperText,
  Skeleton,
  FormControl,
  InputLabel,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Control, FieldValues, useController } from "react-hook-form";

type TVSelectProps = Omit<SelectProps, "value"> & {
  name: string;
  control: Control<any>;
  label: string;
  helper?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  setAuxValue?(value: any): void;
};

export const Select: React.FC<TVSelectProps> = ({
  name,
  control,
  label,
  helper,
  isLoading,
  isFetching,
  skeletonWidth,
  skeletonHeight = 56,
  onChange,
  setAuxValue,
  children,
  ...rest
}) => {
  const {
    field: { onChange: onFieldChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (e: any, child: React.ReactNode) => {
      onFieldChange(e);
      setAuxValue?.(e.target.value);
      onChange?.(e, child);
    },
    [onFieldChange, setAuxValue, onChange]
  );

  if (isLoading)
    return (
      <Skeleton
        width={skeletonWidth ?? "100%"}
        sx={{ margin: 0 }}
        height={skeletonHeight}
      />
    );

  return (
    <FormControl variant="outlined" fullWidth error={!!error}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <MuiSelect
        {...rest}
        labelId={`${name}-label`}
        inputRef={ref}
        label={label}
        value={value ?? ""}
        data-testid={name}
        onChange={handleChange}
        endAdornment={
          isFetching ? (
            <Stack>
              <CircularProgress size={24} variant="indeterminate" />
            </Stack>
          ) : null
        }
      >
        {children}
      </MuiSelect>
      {error ? (
        <FormHelperText>{error.message}</FormHelperText>
      ) : (
        helper && <FormHelperText>{helper}</FormHelperText>
      )}
    </FormControl>
  );
};
