"use client";

import React, { useCallback } from "react";
import { NumberFormatBase, NumberFormatBaseProps } from "react-number-format";

import {
  TextField,
  TextFieldProps,
  Skeleton,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

type TVTextFieldProps = Omit<NumberFormatBaseProps, "value"> &
  Omit<TextFieldProps, "value"> & {
    name: string;
    control: Control<any>;
    isLoading?: boolean;
    isFetching?: boolean;
    decimalScale?: number;
    decimalSeparator?: string;
    thousandSeparator?: string;
    fixedDecimalScale?: boolean;
    isNumericString?: boolean;
    skeletonWidth?: number;
    skeletonHeight?: number;
    onValueChange?: (value: string) => void;
  };

export const NumberFormat: React.FC<TVTextFieldProps> = ({
  name,
  control,
  isLoading,
  isFetching,
  skeletonWidth,
  skeletonHeight = 56,
  onValueChange,
  ...rest
}) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (values: { value: string }) => {
      onChange(values.value);
      onValueChange?.(values.value);
    },
    [onChange, onValueChange]
  );

  if (isLoading)
    return <Skeleton height={skeletonHeight} width={skeletonWidth ?? "100%"} />;

  return (
    <NumberFormatBase
      {...(rest as any)}
      prefix={rest.prefix ?? "R$ "}
      decimalScale={rest.decimalScale ?? 2}
      isNumericString={rest.isNumericString ?? true}
      decimalSeparator={rest.decimalSeparator ?? ","}
      thousandSeparator={rest.thousandSeparator ?? "."}
      fixedDecimalScale={rest.fixedDecimalScale ?? true}
      data-testid={name}
      customInput={TextField}
      value={value}
      error={!!error}
      helperText={error?.message}
      onValueChange={handleChange}
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
