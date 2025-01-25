"use client";

import React, { useCallback } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";

import {
  TextField as MuiTextField,
  TextFieldProps,
  Skeleton,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

type TVTextFieldProps = Omit<TextFieldProps, "value"> &
  Omit<PatternFormatProps, "format"> & {
    name: string;
    control: Control<any>;
    mask: string;
    isLoading?: boolean;
    isFetching?: boolean;
    skeletonWidth?: number;
    skeletonHeight?: number;
    setAuxValue?: (value: any) => void;
  };

export const TextFieldMask: React.FC<TVTextFieldProps> = ({
  name,
  control,
  mask,
  isLoading,
  isFetching,
  skeletonWidth,
  skeletonHeight = 56,
  onChange,
  setAuxValue,
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
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFieldChange(event);
      onChange?.(event);
      setAuxValue?.(event.target.value);
    },
    [onFieldChange, onChange, setAuxValue]
  );

  if (isLoading)
    return <Skeleton height={skeletonHeight} width={skeletonWidth ?? "100%"} />;

  return (
    <PatternFormat
      {...rest}
      format={mask}
      mask="_"
      value={value || ""}
      allowEmptyFormatting
      error={!!error}
      helperText={rest.helperText || error?.message}
      fullWidth
      color="primary"
      variant="outlined"
      onChange={handleChange}
      customInput={MuiTextField}
      inputRef={ref}
      InputProps={{
        endAdornment: isFetching ? (
          <Stack>
            <CircularProgress size={24} variant="indeterminate" />
          </Stack>
        ) : null,
      }}
    />
  );
};
