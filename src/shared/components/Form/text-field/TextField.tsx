"use client";

import React from "react";

import {
  TextField as MuiTextField,
  TextFieldProps,
  Skeleton,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

type TVTextFieldProps = Omit<TextFieldProps, "value"> & {
  name: string;
  control: Control<any>;
  isLoading?: boolean;
  isFetching?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  setAuxValue?: (value: any) => void;
};

export const TextField: React.FC<TVTextFieldProps> = ({
  name,
  control,
  isLoading,
  isFetching,
  skeletonWidth,
  skeletonHeight = 56,
  onChange,
  setAuxValue,
  type = "text",
  ...rest
}) => {
  const {
    field: { onChange: onFieldChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue =
      type === "file"
        ? (event.target as HTMLInputElement).files
        : event.target.value;
    onFieldChange(inputValue);
    onChange?.(event);
    setAuxValue?.(inputValue);
  };

  if (isLoading)
    return <Skeleton height={skeletonHeight} width={skeletonWidth ?? "100%"} />;

  return (
    <MuiTextField
      {...rest}
      inputRef={ref}
      value={type === "file" ? undefined : value || ""}
      fullWidth
      error={!!error}
      helperText={rest.helperText || error?.message}
      data-testid={name}
      variant="outlined"
      onChange={handleChange}
      onBlur={onBlur}
      InputProps={{
        endAdornment: isFetching ? (
          <Stack>
            <CircularProgress size={24} variant="indeterminate" />
          </Stack>
        ) : null,
      }}
      type={type}
    />
  );
};
